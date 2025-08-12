import ProfileContent from "@/components/custom/profile/contents/ProfileContent";
import ProfileHeader from "@/components/custom/profile/header/ProfileHeader";

const page = () => {
  return (
    <div className="min-w-sm xl:max-w-4xl flex flex-col justify-center items-center ">
      <ProfileHeader />
      <ProfileContent />
    </div>
  );
};

export default page;
