import Image from "next/image";
import NavProfileDropDown from "./NavProfileDropDown";
import { useState } from "react";

export default function UserProfile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  return (
    <div className="_header_nav_profile position-relative">
      <div className="_header_nav_profile_image">
        <Image
          src="/assets/images/profile.png"
          alt="Profile"
          width={35}
          height={35}
          className="_nav_profile_img"
        />
      </div>
      <div
        className="_header_nav_dropdown"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        <p className="_header_nav_para">Dylan Field</p>
        <button className="_header_nav_dropdown_btn" type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="6"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              fill="#112032"
              d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z"
            />
          </svg>
        </button>
      </div>

      {isProfileOpen && <NavProfileDropDown />}
    </div>
  );
}
