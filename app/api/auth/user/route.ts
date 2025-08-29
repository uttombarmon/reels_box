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
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    console.log("Fetching user data");
    const userAuth = await auth();
    console.log("Session data:", userAuth);
    const uid = req.nextUrl.searchParams.get("uid");

    if (!uid) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const post = req.nextUrl.searchParams.get("post");

    const publicparams = req.nextUrl.searchParams.get("public") || undefined;

    // console.log(uid);
    await dbConnect();
    if (userAuth && uid === userAuth?.user?.id.toString()) {
      console.log("Fetching authenticated user data2");
      const user = await User.findById(uid).select({
        password: 0,
      });
      return NextResponse.json(user, { status: 200 });
    }
    if (post && post !== null) {
      console.log("Fetching user with posts");
      const user = await User.findById(uid).select({
        password: 0,
        following: 0,
        likes: 0,
      });
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
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } catch (error) {
    console.log("Error fetching user data:", error);
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
