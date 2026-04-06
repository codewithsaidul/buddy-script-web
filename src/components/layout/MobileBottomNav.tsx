import ChatIconSvg from "@/svgIcon/ChatIconSvg";
import NotificationIconSvg from "@/svgIcon/NotificationIconSvg";
import UserIconSvg from "@/svgIcon/UserIconSvg";
import Link from "next/link";

interface MobileFeedNavigationProps {
  isActive: (path: string) => boolean;
}

export default function MobileBottomNav({
  isActive,
}: MobileFeedNavigationProps) {
  return (
    <div className="_mobile_navigation_bottom_wrapper d-lg-none shadow">
      <div className="container">
        <ul className="_mobile_navigation_bottom_list list-unstyled d-flex justify-content-around mb-0 py-2">
          <li className="_mobile_navigation_bottom_item">
            <Link
              href="/feed"
              className={`_mobile_navigation_bottom_link ${isActive("/feed") ? "_mobile_navigation_bottom_link_active" : ""}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="27"
                fill="none"
                viewBox="0 0 24 27"
              >
                <path
                  className="_mobile_svg"
                  fill="#000"
                  fillOpacity=".6"
                  stroke="#666666"
                  strokeWidth="1.5"
                  d="M1 13.042c0-2.094 0-3.141.431-4.061.432-.92 1.242-1.602 2.862-2.965l1.571-1.321C8.792 2.232 10.256 1 12 1c1.744 0 3.208 1.232 6.136 3.695l1.572 1.321c1.62 1.363 2.43 2.044 2.86 2.965.432.92.432 1.967.432 4.06v6.54c0 2.908 0 4.362-.92 5.265-.921.904-2.403.904-5.366.904H7.286c-2.963 0-4.445 0-5.365-.904C1 23.944 1 22.49 1 19.581v-6.54z"
                />
                <path
                  fill="#fff"
                  stroke="#fff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.07 18.497h5.857v7.253H9.07v-7.253z"
                />
              </svg>
            </Link>
          </li>
          {/* Repeat for other mobile icons like Friend Request, Notification, etc. */}
          <li className="_mobile_navigation_bottom_item">
            <Link
              href="/friend-request"
              className="_mobile_navigation_bottom_link"
            >
              <UserIconSvg />
            </Link>
          </li>
          
          <li className="_mobile_navigation_bottom_item position-relative">
            <Link
              href="/notifications"
              className="_mobile_navigation_bottom_link"
            >
              <NotificationIconSvg /> <span className="_counting">6</span>
            </Link>
          </li>

          <li className="_mobile_navigation_bottom_item">
            <Link href="/chat" className="_mobile_navigation_bottom_link">
              <ChatIconSvg /> <span className="_counting">2</span>
            </Link>
          </li>

          <li className="_mobile_navigation_bottom_item">
            <button className="_header_mobile_btn_link border-0 bg-transparent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="14"
                fill="none"
                viewBox="0 0 18 14"
              >
                <path
                  stroke="#666"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M1 1h16M1 7h16M1 13h16"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
