import ProfileContent from "@/components/custom/profile/contents/ProfileContent";
import ProfileHeader from "@/components/custom/profile/header/ProfileHeader";
import { auth } from "@/lib/auth";

const page = async () => {
  const userAuth = await auth();
  return (
    <div className="min-w-sm xl:min-w-4xl flex flex-col justify-center items-center ">
      <ProfileHeader uid={userAuth?.user?.id ?? ""} />
      <ProfileContent uid={userAuth?.user?.id ?? ""} />
    </div>
  );
};

export default page;
