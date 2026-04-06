"use client";
import { formatDistanceToNow } from "date-fns";
import { IPost } from "@/types/post.types";
import Image from "next/image";
import Link from "next/link";
import PostComments from "./PostComments";
import PostDropDown from "./PostDropDown";
import PostReactionAction from "./PostReactionAction";
import { useEffect, useState } from "react";
import { IComment } from "@/types/comments.types";
import { getCommentsByPosts } from "@/service/comments/comment.service";

const PostCard = ({ post }: { post: IPost }) => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [totalComments, setTotalComments] = useState(0);


  useEffect(() => {
    const fetchInitialComments = async () => {
      try {
        const response = await getCommentsByPosts(
          post._id as string,
          "limit=4&sort=-createdAt",
        );
        if (response?.success) {
          setComments(response.data);
          setTotalComments(response.meta?.total || 0);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchInitialComments();
  }, [post._id]);

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <Image
                src={post.author.profileImg || "/assets/images/post_img.png"}
                alt=""
                width={45}
                height={45}
                className="_post_img"
              />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">
                {post.author.firstName} {post.author.lastName}
              </h4>
              <p className="_feed_inner_timeline_post_box_para">
                {post.createdAt
                  ? formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })
                  : "Just now"}
                {" . "} <Link href="#0">Public</Link>
              </p>
            </div>
          </div>

          {/* --- Dropdown Section Start --- */}
          <PostDropDown />
          {/* --- Dropdown Section End --- */}
        </div>

        <h4 className="_feed_inner_timeline_post_title">{post.content}</h4>
        {post.image && (
          <div className="_feed_inner_timeline_image">
            <Image
              src={post.image}
              alt=""
              width={600}
              height={400}
              layout="responsive"
              className="_time_img"
            />
          </div>
        )}
      </div>

      {/* --- Reaction Area --- */}
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div className="_feed_inner_timeline_total_reacts_image">
          {post.likes.slice(0, 5).map((user, idx) => (
            <Image
              key={user._id}
              src={user.profileImg || `/assets/images/react_img${idx + 1}.png`}
              alt=""
              width={20}
              height={20}
              className={
                idx === 0 ? "_react_img1" : "_react_img _rect_img_mbl_none"
              }
            />
          ))}
          {post.likes.length > 5 ? (
            <p className="_feed_inner_timeline_total_reacts_para">
              `${post.likes.length - 5}+`
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1">
            <Link href="#0">
              <span>{totalComments || 0}</span> Comment
            </Link>
          </p>
          <p className="_feed_inner_timeline_total_reacts_para2">
            <span>122</span> Share
          </p>
        </div>
      </div>

      <PostReactionAction
        postId={post._id as string}
        initialLiked={post.isLiked as boolean}
      />

      {/* --- Full Comment Section --- */}
      <PostComments
        postId={post._id as string}
        initialComments={comments}
        totalCount={totalComments}
      />
    </div>
  );
};

export default PostCard;
