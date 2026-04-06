/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiErrorResponse } from "@/types/apiResponse.types";
import { Fetcher } from "@/utils/fetcher";
import { revalidateTag } from "next/cache";

export async function createComment(_currentState: any, formData: FormData) {
  try {
    const content = formData.get("content");
    const postId = formData.get("postId");

    if (!content) return { success: false, message: "Comment cannot be empty" };

    const payload = {
      content,
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
