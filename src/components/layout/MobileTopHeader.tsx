import Image from "next/image";
import Link from "next/link";

export default function MobileTopHeader() {
  return (
    <div className="_header_mobile_menu d-lg-none">
      <div className="container">
        <div className="_header_mobile_menu_top_inner">
          <div className="_header_mobile_menu_logo">
            <Link href="/feed">
              <Image
                src="/assets/images/logo.svg"
                alt="Logo"
                width={100}
                height={30}
              />
            </Link>
          </div>
          <div className="_header_mobile_menu_right">
            <span className="_header_mobile_search cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                fill="none"
                viewBox="0 0 17 17"
              >
                <circle cx="7" cy="7" r="6" stroke="#666" />
                <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
