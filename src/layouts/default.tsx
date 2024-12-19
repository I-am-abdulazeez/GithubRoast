import Footer from "@/components/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <main className="container mx-auto flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
