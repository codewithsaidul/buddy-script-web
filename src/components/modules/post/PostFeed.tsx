import { posts } from "@/data/post.data";
import CreatePostArea from "./CreatePostArea";
import PostCard from "./PostCard";
import Stories from "./Stories";

export default function PostFeed() {
  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
      <div className="_layout_middle_wrap">
        <div className="_layout_middle_inner">
          {/* Stories Section (Desktop) */}
          <Stories />

          {/* Create Post Area */}
          <CreatePostArea />

          {/* Dynamic Post Mapping */}
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
