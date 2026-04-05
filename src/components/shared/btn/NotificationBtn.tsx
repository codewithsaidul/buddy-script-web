import NotificationIconSvg from "@/svgIcon/NotificationIconSvg";
import { Dispatch, SetStateAction } from "react";

interface NotificationBTNProps {
  isNotifyOpen: boolean;
  setIsNotifyOpen: Dispatch<SetStateAction<boolean>>;
}

export default function NotificationBtn({
  isNotifyOpen,
  setIsNotifyOpen,
}: NotificationBTNProps) {
  return (
    <span
      className="nav-link _header_nav_link _header_notify_btn cursor-pointer"
      onClick={() => setIsNotifyOpen(!isNotifyOpen)}
    >
      <NotificationIconSvg />
      <span className="_counting">6</span>
    </span>
  );
}
