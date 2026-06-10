import { useCallback, useEffect, useRef, useState } from "react";
import { Upload, Image as ImageIcon, Sparkles, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

type Phase = "idle" | "ready" | "processing" | "done";

type WebhookResponse = {
  success?: boolean;
  imageUrl?: string;
  image_url?: string;
  url?: string;
  result?: string;
  result_url?: string;
  secure_url?: string;
  output?: {
    imageUrl?: string;
    image_url?: string;
    url?: string;
    result?: string;
    result_url?: string;
    secure_url?: string;
  };
  data?: {
    imageUrl?: string;
    image_url?: string;
    url?: string;
    result?: string;
    result_url?: string;
    secure_url?: string;
  };
};

type ImageHistoryRecord = {
  id: string;
  originalName: string;
  resultUrl: string;
  createdAt: number;
};

const HISTORY_KEY = "snapcutUploadHistory";

function createHistoryId() {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createDataUrlFromBlob(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

async function downloadUrlAsFile(url: string, filename: string) {
  const isDataUrl = url.startsWith("data:");
  if (isDataUrl) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }

    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function UploadDemo() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [activeTab, setActiveTab] = useState<"upload" | "history">("upload");
  const [preview, setPreview] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [history, setHistory] = useState<ImageHistoryRecord[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(HISTORY_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as ImageHistoryRecord[];
      if (Array.isArray(parsed)) {
        setHistory(parsed);
      }
    } catch (error) {
      console.error("Unable to load history from localStorage", error);
    }
  }, []);

  const persistHistory = (records: ImageHistoryRecord[]) => {
    try {
      window.localStorage.setItem(HISTORY_KEY, JSON.stringify(records));
    } catch (error) {
      console.error("Unable to persist history to localStorage", error);
    }
  };

  const addHistoryRecord = (record: ImageHistoryRecord) => {
    setHistory((prev) => {
      const next = [record, ...prev].slice(0, 50);
      persistHistory(next);
      return next;
    });
  };

  const handleFile = useCallback((file: File) => {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      toast.error("Unsupported format. Use JPG, PNG or WEBP.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Max file size is 10MB.");
      return;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    setUploadedFile(file);
    setPhase("ready");
  }, []);

  useEffect(() => {
    const onPaste = (event: ClipboardEvent) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      const imageItem = Array.from(items).find((item) => item.type.startsWith("image/"));
      if (!imageItem) return;

      const file = imageItem.getAsFile();
      if (file) {
        event.preventDefault();
        handleFile(file);
      }
    };

    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handleFile]);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const process = async () => {
    if (!uploadedFile) {
      toast.error("No image selected");
      return;
    }

    setPhase("processing");
    setProgress(5);

    let progressInterval: ReturnType<typeof setInterval> | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    const controller = new AbortController();

    try {
      console.log("Uploading file to webhook:", {
        name: uploadedFile.name,
        type: uploadedFile.type,
        size: uploadedFile.size,
      });

      progressInterval = window.setInterval(() => {
        setProgress((p) => Math.min(90, p + Math.random() * 12 + 4));
      }, 400);

      timeoutId = window.setTimeout(() => controller.abort(), 30000);

      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("file", uploadedFile);

      const response = await fetch("https://levi987987.app.n8n.cloud/webhook/remove-background", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      const contentType = response.headers.get("content-type") ?? "";
      console.log("Webhook response status:", response.status, response.statusText);
      console.log("Webhook response content-type:", contentType);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Webhook error ${response.status}: ${response.statusText} - ${text}`);
      }

      let processedImageUrl: string;

      if (contentType.includes("application/json")) {
        const responseText = await response.text();
        console.log("Webhook response body:", responseText);

        let data: WebhookResponse;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          throw new Error(`Invalid JSON response from webhook: ${parseError} - ${responseText}`);
        }

        console.log("Parsed webhook response:", data);

        const imageUrl =
          data.imageUrl ||
          data.image_url ||
          data.url ||
          data.result ||
          data.result_url ||
          data.secure_url ||
          data.output?.imageUrl ||
          data.output?.image_url ||
          data.output?.url ||
          data.output?.result ||
          data.output?.result_url ||
          data.output?.secure_url ||
          data.data?.imageUrl ||
          data.data?.image_url ||
          data.data?.url ||
          data.data?.result ||
          data.data?.result_url ||
          data.data?.secure_url;

        if (data.success === false) {
          throw new Error(`Webhook returned success=false: ${JSON.stringify(data)}`);
        }

        if (!imageUrl) {
          throw new Error(`Webhook response did not include a valid image URL: ${JSON.stringify(data)}`);
        }

        processedImageUrl = imageUrl;
      } else if (contentType.startsWith("image/") || contentType.includes("application/octet-stream")) {
        const blob = await response.blob();
        processedImageUrl = await createDataUrlFromBlob(blob);
      } else {
        const responseText = await response.text();
        throw new Error(`Unexpected webhook content-type: ${contentType} - ${responseText}`);
      }

      setProcessedUrl(processedImageUrl);
      addHistoryRecord({
        id: createHistoryId(),
        originalName: uploadedFile.name,
        resultUrl: processedImageUrl,
        createdAt: Date.now(),
      });
      setProgress(100);
      setPhase("done");
      toast.success("Background removed!");
    } catch (error) {
      console.error("Background removal error:", error);
      toast.error("Failed to process image. Please try again.");
      setPhase("ready");
      setProgress(0);
    } finally {
      if (progressInterval !== undefined) {
        clearInterval(progressInterval);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    }
  };

  const reset = () => {
    setPhase("idle");
    setPreview(null);
    setProcessedUrl(null);
    setProgress(0);
    setUploadedFile(null);
  };

  const downloadImage = async () => {
    if (!processedUrl) return;

    try {
      await downloadUrlAsFile(processedUrl, `snapcut-${uploadedFile?.name ?? "result"}`);
      toast.success("Image downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  const downloadHistoryImage = async (record: ImageHistoryRecord) => {
    try {
      await downloadUrlAsFile(record.resultUrl, `snapcut-${record.originalName}`);
      toast.success("Image downloaded!");
    } catch (error) {
      console.error("Download history image error:", error);
      toast.error("Failed to download image");
    }
  };

  return (
    <div className="glass rounded-2xl p-6 shadow-glow">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          {phase === "idle" && (
            <div
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => inputRef.current?.click()}
              className="group flex min-h-[340px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/80 bg-background/40 p-10 text-center transition-all hover:border-primary/60 hover:bg-primary/5"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-brand shadow-glow transition-transform group-hover:scale-110">
                <Upload className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold">Drop or paste an image to remove the background</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                JPG, PNG or WEBP &middot; up to 10MB &middot; max 5000&times;5000
              </p>
              <Button variant="hero" className="mt-6">
                <ImageIcon /> Choose file
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </div>
          )}

          {phase !== "idle" && preview && (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-xl border border-border bg-[conic-gradient(at_50%_50%,#1a2440_25%,#0f1a30_25%_50%,#1a2440_50%_75%,#0f1a30_75%)] bg-[length:24px_24px]">
                <img
                  src={phase === "done" && processedUrl ? processedUrl : preview}
                  alt={phase === "done" ? "Processed Result" : "Preview"}
                  className="mx-auto max-h-[420px] w-auto"
                />
                {phase === "processing" && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/70 backdrop-blur-sm">
                    <Loader2 className="mb-3 h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Removing background &middot; {Math.round(progress)}%</p>
                    <div className="mt-3 h-1.5 w-56 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-gradient-brand transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted-foreground">
                  {phase === "done" ? "✓ Background removed successfully" : "Demo preview • Processing..."}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={reset}>New image</Button>
                  {phase === "ready" && (
                    <Button variant="hero" size="sm" onClick={process}>
                      <Sparkles /> Remove background
                    </Button>
                  )}
                  {phase === "done" && (
                    <Button variant="hero" size="sm" onClick={downloadImage}>
                      <Download /> Download PNG
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="rounded-xl border border-border/80 bg-background/50 p-10 text-center text-sm text-muted-foreground">
                No history yet. Remove a background to save the processed image locally.
              </div>
            ) : (
              <div className="grid gap-4">
                {history.map((record) => (
                  <div key={record.id} className="grid gap-4 rounded-3xl border border-border p-4 sm:grid-cols-[auto_1fr]">
                    <img
                      src={record.resultUrl}
                      alt={record.originalName}
                      className="h-24 w-24 rounded-2xl object-cover"
                    />
                    <div className="flex flex-col justify-between gap-4">
                      <div>
                        <p className="font-medium text-foreground">{record.originalName}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {new Date(record.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => downloadHistoryImage(record)}>
                          Download
                        </Button>
                        <Button size="sm" variant="hero" onClick={() => window.open(record.resultUrl, "_blank")}>Open</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
