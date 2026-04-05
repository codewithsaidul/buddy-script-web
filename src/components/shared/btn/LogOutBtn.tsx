"use client";

import { logoutUser } from "@/service/auth/logOutUser";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LogOutBtn({ isBootstrap = true }: { isBootstrap?: boolean }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();

      if (res.success) {
        toast.success(res.message);
        router.push("/login?loggedOut=true");
      } else {
        toast.error(res.message || "Logout failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <>
      {isBootstrap ? (
        <button
          type="button"
          onClick={handleLogout}
          className="btn btn-danger cursor-pointer shadow-sm"
        >
          Logout
        </button>
      ) : (
        <button 
          type="button"
          onClick={handleLogout} 
          className="border-0 bg-transparent p-0 cursor-pointer text-danger"
        >
          Logout
        </button>
      )}
    </>
  );
}