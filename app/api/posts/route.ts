import { auth } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import Post from "@/models/Post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await dbConnect;
    const authUser = await auth();
    const userId = req.nextUrl.searchParams.get("userId");
    if (authUser?.user?.id === userId) {
      const posts = await Post.find({ userId: userId });
      if (!posts || posts.length === 0) {
        return NextResponse.json(
          { message: "No posts found" },
          { status: 404 }
        );
      }
      console.log(posts);
      return NextResponse.json(posts, { status: 200 });
    }

    const posts = await Post.find();
    if (!posts || posts.length === 0) {
      return NextResponse.json({ message: "No posts found" }, { status: 404 });
    }
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    const content = await req.json();
    await dbConnect();
    const post = new Post(content);
    await post.save();
    return NextResponse.json(
      { message: "Post created successfully", post },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
