/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiErrorResponse } from "@/types/apiResponse.types";
import { Fetcher } from "@/utils/fetcher";
import { revalidateTag } from "next/cache";

export async function createComment(_currentState: any, formData: FormData) {
  try {
    const text = formData.get("text");
    const postId = formData.get("postId");

    if (!text) return { success: false, message: "Comment cannot be empty" };

    const payload = {
      text,
    };

    const res = await Fetcher.post(`/posts/${postId}/comments`, {
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (result.success) {
      revalidateTag("feeds-list", { expire: 0 });
      revalidateTag("feeds-page-1", { expire: 0 });
      revalidateTag("feeds-search-all", { expire: 0 });
      revalidateTag("comments-list", { expire: 0 });
      revalidateTag("comments-page-1", { expire: 0 });
      revalidateTag("comments-search-all", { expire: 0 });
      return { success: true, message: "Comment added!" };
    }
    return result;
  } catch (error) {
    console.log("🚀 ~ createComment ~ error:", error);
    const err = error as IApiErrorResponse;
    return {
      success: false,
      message: err?.data?.message || "Failed to create post",
    };
  }
}


export async function getCommentsByPosts(postId: string, queryString?: string) {
  try {
    const searchParams = new URLSearchParams(queryString);
    const page = searchParams.get("page") || "1";
    const searchTerm = searchParams.get("searchTerm") || "all";
    const response = await Fetcher.get(
      `/posts/${postId}/comments${queryString ? `?${queryString}` : ""}`,
      {
        next: {
          tags: [
            "comments-list",
            `comments-page-${page}`,
            `comments-search-${searchTerm}`,
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
