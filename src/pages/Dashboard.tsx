export function Dashboard() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="glass rounded-3xl p-10">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-secondary">Upload Dashboard</p>
          <h1 className="mt-4 text-4xl font-bold">Start removing backgrounds</h1>
          <p className="mt-3 text-muted-foreground">Upload an image, process it instantly, and download a transparent PNG.</p>
        </div>
        <div className="rounded-3xl border border-border/50 bg-background/80 p-8 text-muted-foreground">
          <p>This dashboard is the starting point for your SnapCut AI workflow.</p>
          <p className="mt-4">Add upload controls, history, and processing status here.</p>
        </div>
      </div>
    </main>
  );
}
