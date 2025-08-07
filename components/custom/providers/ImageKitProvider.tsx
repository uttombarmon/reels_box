import { ImageKitProvider } from "@imagekit/next";

export default function FileHandleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const urlEndpoint = process.env.IMAGEKIT_ENDPOINT;
  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      console.log(error);
      throw new Error(`Authentication request failed`);
    }
  };
  return (
    <div className="App">
      <ImageKitProvider urlEndpoint={urlEndpoint}>{children}</ImageKitProvider>
    </div>
  );
}
