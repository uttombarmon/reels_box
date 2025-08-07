import NavViewXL from "@/components/custom/navbars/NavViewXL";
import FileHandleProvider from "@/components/custom/providers/ImageKitProvider";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className=" w-screen flex flex-1 shrink">
      {/* mobile view */}
      {/* <NavViewM /> */}
      {/* desktop view */}
      <NavViewXL />
      <main className=" w-full md:w-[calc(100%-16rem) flex justify-center">
        <FileHandleProvider>{children}</FileHandleProvider>
      </main>
    </SidebarProvider>
  );
}
