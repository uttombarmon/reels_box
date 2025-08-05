// import ImageKit from "@imagekit/next";
// import { NextResponse } from "next/server";

// const imagekit = new ImageKit({
//   publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
//   privateKey: process.env.PRIVATE_KEY!,
//   urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
// });

// export async function GET() {
//   try {
//     return NextResponse.json(imagekit.getAuthenticationParameters());
//   } catch (error) {
//     NextResponse.json({ "error: ": error }, { status: 500 });
//   }
// }
// File: app/api/upload-auth/route.ts
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  // Your application logic to authenticate the user
  // For example, you can check if the user is logged in or has the necessary permissions
  // If the user is not authenticated, you can return an error response

  const { token, expire, signature } = getUploadAuthParams({
    privateKey: process.env.PRIVATE_KEY as string, // Never expose this on client side
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,

    // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
    // token: "random-token", // Optional, a unique token for request
  });

  return Response.json({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
}
