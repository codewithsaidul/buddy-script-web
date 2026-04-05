import Navbar from "@/components/layout/Navbar";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="_layout _layout_main_wrapper">
      {/* <!--Switching Btn Start--> */}
      <ThemeToggle />
      {/* <!--Switching Btn End--> */}
      <div className="_main_layout">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
