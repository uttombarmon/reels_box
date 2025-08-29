import { Card, CardContent } from "@/components/ui/card";
import { PostInterface } from "@/types/Post";

const PostCard = ({ post }: { post: PostInterface }) => {
  return (
    <Card
      key={post._id.toString()}
      className="relative aspect-square w-full group overflow-hidden"
    >
      <CardContent className="p-0">
        {/* Post image/content preview */}
        <img
          src={post.contentUrl}
          alt={post.caption || "Post content"}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
        {/* Hover overlay for details */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="text-white text-center p-2">
            <p className="text-sm font-semibold truncate">{post.caption}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
