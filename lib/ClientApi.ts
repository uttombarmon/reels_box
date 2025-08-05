/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetVideosInterface } from "@/types/GetVideosTypes";
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
  async GetVideos(limit: number) {
    return this.myFetch<GetVideosInterface>(`/videos?limit=${limit}`);
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
