export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[94%] sm:max-w-6xl md:max-w-7xl lg:max-w-[1400px] xl:max-w-[1300px] px-4 sm:px-8 lg:px-10">
      {children}
    </div>
  );
}
