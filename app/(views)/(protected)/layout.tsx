import ThisIsTheNoNoSquare from "@/components/ui/this-is-the-no-no-square";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ThisIsTheNoNoSquare>{children}</ThisIsTheNoNoSquare>;
}
