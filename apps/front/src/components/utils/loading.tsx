export function Loading({ className = "" }: { className?: string }) {
  return (
    <span className={`loading loading-spinner loading-sm ${className}`}></span>
  );
}
