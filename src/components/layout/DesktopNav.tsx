"use client";
import ChatIconSvg from "@/svgIcon/ChatIconSvg";
import HomeSvg from "@/svgIcon/HomeSvg";
import UserIconSvg from "@/svgIcon/UserIconSvg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import NotificationBtn from "../shared/btn/NotificationBtn";
import NotificationDropDown from "./NotificationDropDown";
import UserProfile from "./UserProfile";

interface DesktopNabProps {
  isActive: (path: string) => boolean;
}

export default function DesktopNav({ isActive }: DesktopNabProps) {
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
      <div className="container _custom_container">
        <div className="_logo_wrap">
          <Link className="navbar-brand" href="/feed">
            <Image
              src="/assets/images/logo.svg"
              alt="Buddy Script"
              width={120}
              height={40}
              className="_nav_logo"
              priority
            />
          </Link>
        </div>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="_header_form ms-auto">
            <form className="_header_form_grp">
              <svg
                className="_header_form_svg"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="none"
                viewBox="0 0 17 17"
              >
                <circle cx="7" cy="7" r="6" stroke="#666" />
                <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
              </svg>
              <input
                className="form-control me-2 _inpt1"
                type="search"
                placeholder="input search text"
              />
            </form>
          </div>

          <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
            {/* Home Icon */}
            <li className="nav-item _header_nav_item">
              <Link
                className={`nav-link ${isActive("/feed") ? "_header_nav_link_active" : ""} _header_nav_link`}
                href="/feed"
              >
                <HomeSvg isActive={isActive} />
              </Link>
            </li>

            {/* Friends Icon */}
            <li className="nav-item _header_nav_item">
              <Link
                className={`nav-link ${isActive("/friend-request") ? "_header_nav_link_active" : ""} _header_nav_link`}
                href="/friend-request"
              >
                {/* SVG content remains same as your HTML */}
                <UserIconSvg />
              </Link>
            </li>

            {/* Notification Dropdown */}
            <li className="nav-item _header_nav_item position-relative">
              <NotificationBtn
                isNotifyOpen={isNotifyOpen}
                setIsNotifyOpen={setIsNotifyOpen}
              />
              {isNotifyOpen && <NotificationDropDown />}
            </li>

            {/* Chat Icon */}
            <li className="nav-item _header_nav_item">
              <Link className="nav-link _header_nav_link" href="/chat">
                <ChatIconSvg />
                <span className="_counting">2</span>
              </Link>
            </li>
          </ul>

          {/* Profile Dropdown */}
          <UserProfile />
        </div>
      </div>
    </nav>
  );
}
