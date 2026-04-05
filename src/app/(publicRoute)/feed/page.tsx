import LeftSidebar from "@/components/layout/sidebar/LeftSidebar";
import RightSidebar from "@/components/layout/sidebar/RightSideBar";
import PostFeed from "@/components/modules/post/PostFeed";

export default function FeedPage() {
  return (
    <div className="container _custom_container">
      <div className="_layout_inner_wrap">
        <div className="row">
          {/* Left Sidebar */}
          <LeftSidebar />
          {/* Left Sidebar */}

          {/* Layout Middle */}
          <PostFeed />
          {/* Layout Middle */}

          {/* Right Sidebar */}
          <RightSidebar />
          {/* Right Sidebar */}
        </div>
      </div>
    </div>
  );
}
