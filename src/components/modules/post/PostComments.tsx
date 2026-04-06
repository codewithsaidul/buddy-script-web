"use client";

import { createComment, getCommentsByPosts } from "@/service/comments/comment.service";
import { IComment } from "@/types/comments.types";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function PostComments({ 
  postId, 
  initialComments, 
  totalCount 
}: { 
  postId: string; 
  initialComments: IComment[]; 
  totalCount: number; 
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [displayCount, setDisplayCount] = useState(initialComments.length);
  const [loadingMore, setLoadingMore] = useState(false);

  const [state, formAction, isPending] = useActionState(createComment, null);

  // Sync state with props
  useEffect(() => {
    setComments(initialComments);
    setDisplayCount(initialComments.length);
  }, [initialComments]);

  // Handle new comment success
  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
      toast.success("Comment added");
      // Note: Ideal hole ekhane optimistic update ba re-fetch kora dorkar.
    } else if (state?.success === false) {
      toast.error(state.message);
    }
  }, [state]);

  const handleLoadMore = async () => {
    setLoadingMore(true);
    try {
      // Fetching without limit to get all or a larger batch
      const response = await getCommentsByPosts(postId); 
      if (response?.success) {
        setComments(response.data);
        setDisplayCount(totalCount);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="_feed_inner_timeline_cooment_area">
      {/* Comment Input Box */}
      <div className="_feed_inner_comment_box">
        <form
          ref={formRef}
          action={formAction}
          className="_feed_inner_comment_box_form"
        >
          <input type="hidden" name="postId" value={postId} />
          <div className="_feed_inner_comment_box_content">
            <div className="_feed_inner_comment_box_content_image">
              <Image
                src="/assets/images/comment_img.png"
                alt="User"
                width={32}
                height={32}
                className="_comment_img"
              />
            </div>
            <div className="_feed_inner_comment_box_content_txt">
              <textarea
                className="form-control _comment_textarea"
                placeholder="Write a comment"
                name="text"
                id="floatingTextarea1"
                disabled={isPending}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    formRef.current?.requestSubmit();
                  }
                }}
              ></textarea>
            </div>
          </div>
          <div className="_feed_inner_comment_box_icon">
            <button
              disabled={isPending}
              type="submit"
              className="_feed_inner_comment_box_icon_btn"
            >
              {isPending ? "..." : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <path fill="#000" fillOpacity=".46" fillRule="evenodd" d="M13.167 6.534a.5.5 0 01.5.5c0 3.061-2.35 5.582-5.333 5.837V14.5a.5.5 0 01-1 0v-1.629C4.35 12.616 2 10.096 2 7.034a.5.5 0 011 0c0 2.679 2.168 4.859 4.833 4.859 2.666 0 4.834-2.18 4.834-4.86a.5.5 0 01.5-.5zM7.833.667a3.218 3.218 0 013.208 3.22v3.126c0 1.775-1.439 3.22-3.208 3.22a3.218 3.218 0 01-3.208-3.22V3.887c0-1.776 1.44-3.22 3.208-3.22zm0 1a2.217 2.217 0 00-2.208 2.22v3.126c0 1.223.991 2.22 2.208 2.22a2.217 2.217 0 002.208-2.22V3.887c0-1.224-.99-2.22-2.208-2.22z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="_timline_comment_main">
        {/* View Previous Comments Button */}
        {totalCount > displayCount && (
          <div className="_previous_comment">
            <button 
              type="button" 
              className="_previous_comment_txt"
              onClick={handleLoadMore}
              disabled={loadingMore}
            >
              {loadingMore ? "Loading..." : `View ${totalCount - displayCount} previous comments`}
            </button>
          </div>
        )}

        {/* Comments List Mapping */}
        {comments.map((comment) => (
          <div key={comment._id} className="_comment_main">
            <div className="_comment_image">
              <Link href={`/profile/${comment.user._id}`} className="_comment_image_link">
                <Image
                  src={comment.user.profileImg || "/assets/images/txt_img.png"}
                  alt=""
                  width={32}
                  height={32}
                  className="_comment_img1"
                />
              </Link>
            </div>
            <div className="_comment_area">
              <div className="_comment_details">
                <div className="_comment_details_top">
                  <div className="_comment_name">
                    <Link href={`/profile/${comment.user._id}`}>
                      <h4 className="_comment_name_title">
                        {comment.user.firstName} {comment.user.lastName}
                      </h4>
                    </Link>
                  </div>
                </div>
                <div className="_comment_status">
                  <p className="_comment_status_text">
                    <span>{comment.text}</span>
                  </p>
                </div>

                {/* Dynamic Reaction Section */}
                <div className="_total_reactions">
                  <div className="_total_react">
                    <span className="_reaction_like">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up">
                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                      </svg>
                    </span>
                    <span className="_reaction_heart">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                      </svg>
                    </span>
                  </div>
                  <span className="_total">{comment.likes?.length || 0}</span>
                </div>

                {/* Reply and Time Section */}
                <div className="_comment_reply">
                  <div className="_comment_reply_num">
                    <ul className="_comment_reply_list">
                      <li className="cursor-pointer">
                        <span style={{ color: comment.isLiked ? '#007bff' : 'inherit' }}>
                          {comment.isLiked ? 'Liked' : 'Like'}.
                        </span>
                      </li>
                      <li className="cursor-pointer"><span>Reply.</span></li>
                      <li className="cursor-pointer"><span>Share</span></li>
                      <li>
                        <span className="_time_link">
                          .{comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: false }).replace('about ', '').replace(' minutes', 'm').replace(' minute', 'm').replace(' hours', 'h').replace(' hour', 'h').replace(' days', 'd') : "now"}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}