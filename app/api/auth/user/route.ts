import { auth } from "@/lib/auth";
import { dbConnect } from "@/lib/db";
import User from "@/models/User";
import { UserPublic } from "@/types/UserPublic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("User registration request received");
  try {
    const { name, email, password } = await req.json();
    console.log("Registering user:", { name, email });
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    await dbConnect();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const user = new User({ name, email, password });
    await user.save();
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "User register failed" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  const session = await auth();
  const uid = req.nextUrl.searchParams.get("uid");

  if (!uid) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const post = req.nextUrl.searchParams.get("post");
  const publicparams = req.nextUrl.searchParams.get("public") || undefined;

  // console.log(uid);
  try {
    await dbConnect();
    // console.log(connected);
    if (uid === session?.user?.id) {
      const user = await User.findById(uid);
      // console.log("user:" + user);
      return NextResponse.json(user, { status: 200 });
    }
    if (post === "true") {
      const user = await User.findById(uid).select("name image username bio");
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      return NextResponse.json(user, { status: 200 });
    }
    if (publicparams === "public" && publicparams !== undefined) {
      const user_data = await User.findById(uid).select("-email -password");
      if (!user_data) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
      const user: UserPublic = {
        _id: user_data._id,
        name: user_data.name,
        image:
          user_data.image || "https://placehold.co/40x40/E0E0E0/333333?text=U",
        username: user_data.username,
        bio: user_data.bio,
        followings: user_data.following?.length || 0,
        followers: user_data.follower?.length || 0,
        likes: user_data.like?.length || 0,
      };
      return NextResponse.json(user, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
