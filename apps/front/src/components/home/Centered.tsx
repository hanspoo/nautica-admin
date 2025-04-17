export function Centered({ children }: React.PropsWithChildren) {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
