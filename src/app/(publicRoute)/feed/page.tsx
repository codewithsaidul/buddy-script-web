import LeftSidebar from "@/components/layout/sidebar/LeftSidebar";
import RightSidebar from "@/components/layout/sidebar/RightSideBar";
import PostFeed from "@/components/modules/post/PostFeed";
import { getUserInfo } from "@/service/auth/getUserInfo";
import { getPosts } from "@/service/post/post.service";
import { IPost } from "@/types/post.types";
import { queryStringFormatter } from "@/utils/formatter";

export default async function FeedPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const allPosts = await getPosts(queryString)

  const userInfo = await getUserInfo();
  const currentUserId = userInfo?.userId;

  const posts: IPost[] = allPosts?.data?.map((post: IPost) => ({
    ...post,
    isLiked: post.likes.some((like) => 
      (typeof like === "string" ? like : like._id.toString()) === currentUserId
    ),
  })) || [];

  const inititalData = {
    ...allPosts,
    data: posts
  }

  return (
    <div className="container _custom_container">
      <div className="_layout_inner_wrap">
        <div className="row">
          {/* Left Sidebar */}
          <LeftSidebar />
          {/* Left Sidebar */}

          {/* Layout Middle */}
          <PostFeed initialData={inititalData} initialQueryString={queryString} />
          {/* Layout Middle */}

          {/* Right Sidebar */}
          <RightSidebar />
          {/* Right Sidebar */}
        </div>
      </div>
    </div>
  );
}
