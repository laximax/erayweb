export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="responsive-container mx-auto w-full px-[clamp(1rem,2vw,2.5rem)]"
      style={{ maxWidth: "min(92vw, 1340px)" }}
    >
      {children}
    </div>
  );
}
