"use client";

import { getPosts } from "@/service/post/post.service";
import { IApiResponse, IMeta } from "@/types/apiResponse.types";
import { IPost } from "@/types/post.types";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import CreatePostArea from "./CreatePostArea";
import PostCard from "./PostCard";
import Stories from "./Stories";

interface PostFeedProps {
  initialData: IApiResponse<IPost[]>;
  initialQueryString: string;
}

export default function PostFeed({
  initialData,
  initialQueryString,
}: PostFeedProps) {
  const [posts, setPosts] = useState<IPost[]>(initialData?.data || []);
  const [meta, setMeta] = useState<IMeta | undefined>(initialData?.meta);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
  });


  useEffect(() => {
    const isInitial =
      (initialData?.meta?.page as number) <
      (initialData?.meta?.totalPages as number);
    setPosts(initialData?.data || []);
    setMeta(initialData?.meta);
    setHasMore(isInitial);
  }, [initialData]);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const currentPage = meta?.page || 1;
      const totalPage = meta?.totalPages || 1;

      if (currentPage >= totalPage) {
        setHasMore(false);
        return;
      }

      const nextPage = currentPage + 1;
      const params = new URLSearchParams(initialQueryString);
      params.set("page", nextPage.toString());
      params.set("limit", "10");

      const response = await getPosts(params.toString());

      if (response?.success && Array.isArray(response.data)) {
        const newPostsData = response.data;
        setPosts((prev) => [...prev, ...newPostsData]);
        setMeta(response.meta);

        // Check if there's actually more
        if (response.meta.page >= response.meta.totalPage) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Infinity scroll error:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [meta, initialQueryString, loading, hasMore]);

  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMorePosts();
    }
  }, [inView, loading, hasMore, loadMorePosts]);

  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
      <div className="_layout_middle_wrap">
        <div className="_layout_middle_inner">
          <Stories />
          <CreatePostArea />

          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}

          {/* লোডার পয়েন্ট */}
          <div
            ref={ref}
            className="_text_center _padd_t3 minHeight"
          >
            {loading && (
              <div
                className="spinner-border spinner-border-sm text-primary"
                role="status"
              ></div>
            )}
            {!loading && hasMore && posts.length > 0 && (
              <span style={{ opacity: 0 }}>Scroll for more</span>
            )}
          </div>

          {!hasMore && posts.length > 0 && (
            <p className="_text_center text-muted mt-3">
              No more posts to show.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
