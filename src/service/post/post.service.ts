/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiErrorResponse } from "@/types/apiResponse.types";
import { Fetcher } from "@/utils/fetcher";
import { revalidateTag } from "next/cache";

export async function createPost(
  _currentState: any,
  formData: FormData,
): Promise<any> {
  try {
    const content = formData.get("content");
    const visibility = formData.get("visibility") || "PUBLIC";
    const file = formData.get("file");

    if (!content && (!file || (file as File).size === 0)) {
      return { success: false, message: "Post content or file is required" };
    }

    const postData = {
      content: content,
      visibility: visibility,
    };

    const backendFormData = new FormData();

    backendFormData.append("data", JSON.stringify(postData));

    if (file && (file as File).size > 0) {
      backendFormData.append("file", file as Blob);
    }

    const res = await Fetcher.post("/posts", {
      body: backendFormData,
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("feeds-list", { expire: 0 });
      revalidateTag("feeds-page-1", { expire: 0 });
      revalidateTag("feeds-search-all", { expire: 0 });
      return {
        success: true,
        message: result.message || "Post created successfully",
      };
    }

    return result;
  } catch (error) {
    console.error("Post Creation Error:", error);
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err?.data?.message || "Failed to create post",
    };
  }
}

export async function getPosts(queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await Fetcher.get(
      `/posts${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "posts-list",
            `posts-page-${page}`,
            `posts-search-${searchTerm}`,
          ],
          revalidate: 180,
        },
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err.data.message || "Something went wrong",
    };
  }
}

export async function toggleLike(postId: string): Promise<any> {
  try {
    const res = await Fetcher.patch(`/posts/${postId}/like`);

    const result = await res.json();

    if (result.success) {
      revalidateTag("feeds-list", { expire: 0 });
      revalidateTag("feeds-page-1", { expire: 0 });
      revalidateTag("feeds-search-all", { expire: 0 });
      return result;
    }
    return result;
  } catch (error) {
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err?.data?.message || "Failed to toggle like",
    };
  }
}
