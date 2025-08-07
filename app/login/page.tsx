import Form from "@/components/custom/login/Form";
import { auth } from "@/lib/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
async function LogIn() {
  const session = await auth();
  if (session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br p-4">
      <div className="p-8 rounded-2xl w-full flex justify-center flex-wrap">
        <div className=" hidden relative w-full lg:w-1/2 h-64 lg:h-auto lg:min-h-[500px] lg:flex items-center justify-center p-4">
          <Image
            src="https://i.postimg.cc/6qc9kvt0/instagram-web-lox-image.png"
            alt="Reels Box Visual"
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="rounded-lg"
          />
        </div>

        <Form />
      </div>
    </div>
  );
}

export default LogIn;
