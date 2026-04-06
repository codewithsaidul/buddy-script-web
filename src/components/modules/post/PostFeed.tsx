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
  initialData: IApiResponse<IPost[]>; // সাধারণত data অ্যারে হয়
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

  const loadMorePosts = useCallback(async () => {
    setLoading(true);

    try {
      const nextPage = (meta?.page || 1) + 1;
      const params = new URLSearchParams(initialQueryString);
      params.set("page", nextPage.toString());
      params.set("limit", "10");

      const response = await getPosts(params.toString());

      if (response?.success && Array.isArray(response.data)) {
        const newPostsData = response.data;
        setPosts((prev) => [...prev, ...newPostsData]);
        setMeta(response.meta);

        if (newPostsData.length < 10) {
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
  }, [meta, initialQueryString]); 

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
            className="text-center p-3"
            style={{ minHeight: "50px" }}
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
            <p className="text-center text-muted mt-3">
              No more posts to show.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
