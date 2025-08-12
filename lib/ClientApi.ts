/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReelsUserI } from "@/types/ReelsUser";
import { UserPublic } from "@/types/UserPublic";
import { UserInterface } from "@/types/UTypes";
import { VideoInterface } from "@/types/VTypes";

type VideoFormData = Omit<VideoInterface, "_id">;
type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};

class ApiClient {
  private async myFetch<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { method = "GET", body, headers = {} } = options;

    const defaultHeaders = {
      "Content-Type": "application/json",
      ...headers,
    };

    const response = await fetch(`/api${endpoint}`, {
      method,
      headers: defaultHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }
  async GetAUser(
    uid: string,
    post: boolean = false,
    publicPost: boolean = false
  ) {
    if (post) {
      return this.myFetch<ReelsUserI>(`/auth/user?uid=${uid}&post=${post}`);
    }
    if (publicPost) {
      return this.myFetch<UserPublic>(`/auth/user?uid=${uid}&public=true`);
    }
    return this.myFetch<UserInterface>(`/auth/user?uid=${uid}`);
  }
  async GetVideos(limit: number) {
    return this.myFetch<VideoInterface[]>(`/videos?limit=${limit}`);
  }
  async GetAVideo(id: string) {
    return this.myFetch<VideoInterface>(`/videos/${id}`);
  }
  async CreateAVideo(videoData: VideoFormData) {
    return this.myFetch("/videos", {
      method: "POST",
      body: videoData,
    });
  }
  async UpdateAVideo(id: string, videoData: VideoFormData) {
    return this.myFetch(`/api/videos/${id}`, {
      method: "PUT",
      body: videoData,
    });
  }
  async DeleteAVideo(id: string) {
    return this.myFetch(`/videos/${id}`, {
      method: "DELETE",
    });
  }
  async GetPosts() {
    return this.myFetch("/posts");
  }
  async GetAPost(id: string) {
    return this.myFetch(`/posts/${id}`);
  }
}
export const apiClient = new ApiClient();
