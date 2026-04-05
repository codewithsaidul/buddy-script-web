import { IPost, PostVisibility } from "@/types/post.types";

export const posts: IPost[] = [
    {
      _id: "1",
      author: { _id: "a1", firstName: "Karim", lastName: "Saif", profileImg: "/assets/images/post_img.png", email: "", isDeleted: false },
      content: "-Healthy Tracking App",
      image: "/assets/images/timeline_img.png",
      visibility: PostVisibility.PUBLIC,
      likes: [
        { _id: "u1", firstName: "User", lastName: "One", profileImg: "/assets/images/react_img1.png", email: "", isDeleted: false },
        { _id: "u2", firstName: "User", lastName: "Two", profileImg: "/assets/images/react_img2.png", email: "", isDeleted: false },
      ],
      isDeleted: false,
    },
    {
      _id: "2",
      author: { _id: "a2", firstName: "Saidul", lastName: "Rana", profileImg: "/assets/images/post_img.png", email: "", isDeleted: false },
      content: "Exploring MERN Stack Development!",
      image: "/assets/images/timeline_img.png",
      visibility: PostVisibility.PUBLIC,
      likes: [],
      isDeleted: false,
    }
  ];