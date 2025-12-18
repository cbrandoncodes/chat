type Props = {
  children: React.ReactNode;
};

export default function PageMessage({ children }: Props) {
  return (
    <div className="flex min-h-80 w-full items-center justify-center px-4 py-8">
      <p className="text-center text-base font-medium">{children}</p>
    </div>
  );
}
