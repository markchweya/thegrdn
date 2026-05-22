/**
 * Fixed-position floating gradient blobs that live behind the entire site.
 * Provides the cinematic tropical-night ambient lighting.
 */
export function GradientBlobs() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <div className="gradient-blob absolute top-[-10%] left-[-10%] size-[600px] rounded-full bg-primary/20 blur-[120px]" />
      <div
        className="gradient-blob absolute bottom-[-10%] right-[-10%] size-[500px] rounded-full bg-grdn-cyan/15 blur-[100px]"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="gradient-blob absolute top-[40%] left-[40%] size-[400px] rounded-full bg-grdn-magenta/10 blur-[120px]"
        style={{ animationDelay: "4s" }}
      />
    </div>
  );
}
