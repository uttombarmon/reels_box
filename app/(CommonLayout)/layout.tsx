import NavViewXL from "@/components/custom/navbars/NavViewXL";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      {/* mobile view */}
      {/* <NavViewM /> */}
      {/* desktop view */}
      <NavViewXL />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
