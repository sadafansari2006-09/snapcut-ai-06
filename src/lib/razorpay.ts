export interface RazorpayCheckoutOptions {
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
let razorpayPromise: Promise<void> | null = null;

declare global {
  interface Window {
    Razorpay?: any;
  }
}

function loadRazorpayScript(): Promise<void> {
  if (window.Razorpay) {
    return Promise.resolve();
  }

  if (razorpayPromise) {
    return razorpayPromise;
  }

  razorpayPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${RAZORPAY_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Razorpay script.")));
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay script."));
    document.head.appendChild(script);
  });

  return razorpayPromise;
}

export async function createOrder(amount: number): Promise<{ orderId: string; amount: number; currency: string }> {
  console.log("[razorpay] === START createOrder ===");
  console.log("[razorpay] Amount being sent to API:", amount);
  console.log("[razorpay] Calling API at: /api/create-order");
  
  const response = await fetch("/api/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });

  console.log("[razorpay] Response received, status:", response.status);
  console.log("[razorpay] Response ok?", response.ok);

  if (!response.ok) {
    let errorMsg = "Failed to create order";
    let rawErrorText = "";
    try {
      rawErrorText = await response.text();
      console.log("[razorpay] Raw error response text:", rawErrorText);
      const data = JSON.parse(rawErrorText);
      errorMsg = data.error || errorMsg;
    } catch (e) {
      console.error("[razorpay] Failed to parse error response:", e);
      errorMsg = `HTTP error! status: ${response.status}, raw: ${rawErrorText}`;
    }
    throw new Error(errorMsg);
  }

  try {
    const rawText = await response.text();
    console.log("[razorpay] Raw order response text:", rawText);
    const data = JSON.parse(rawText);
    console.log("[razorpay] Order created successfully:", data.orderId);
    return { orderId: data.orderId, amount: data.amount, currency: data.currency };
  } catch (e) {
    console.error("[razorpay] Failed to parse order response:", e);
    throw new Error("Invalid response from server when creating order");
  }
}

export async function verifyPayment(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
): Promise<{ success: boolean }> {
  console.log("[razorpay] Verifying payment via API...");
  const response = await fetch("/api/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    }),
  });

  if (!response.ok) {
    let errorMsg = "Failed to verify payment";
    try {
      const data = await response.json();
      errorMsg = data.error || errorMsg;
    } catch (e) {
      console.error("[razorpay] Failed to parse error response:", e);
      errorMsg = `HTTP error! status: ${response.status}`;
    }
    throw new Error(errorMsg);
  }

  try {
    const data = await response.json();
    console.log("[razorpay] Payment verified:", data.success);
    return { success: data.success };
  } catch (e) {
    console.error("[razorpay] Failed to parse verify response:", e);
    throw new Error("Invalid response from server when verifying payment");
  }
}

export async function openRazorpayCheckout(options: RazorpayCheckoutOptions) {
  await loadRazorpayScript();

  if (!window.Razorpay) {
    throw new Error("Razorpay checkout is not available.");
  }

  const checkout = new window.Razorpay({
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: options.amount,
    currency: options.currency,
    name: options.name,
    description: options.description,
    image: options.image,
    order_id: options.order_id,
    prefill: options.prefill,
    notes: options.notes,
    theme: options.theme,
    handler: (response: any) => {
      options.onSuccess?.(response);
    },
    modal: {
      ondismiss: () => {
        options.onError?.({ error: "checkout_dismissed" });
      },
    },
  });

  checkout.open();
}
