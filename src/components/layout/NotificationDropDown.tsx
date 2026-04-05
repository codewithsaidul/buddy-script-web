import { notificationsData } from "@/data/notifications.data";
import Image from "next/image";

export default function NotificationDropdown  ()  {
  return (
    <div id="_notify_drop" className="_notification_dropdown d-block">
      <div className="_notifications_content">
        <h4 className="_notifications_content_title">Notifications</h4>
        <div className="_notification_box_right">
          <button type="button" className="_notification_box_right_link">
            <svg xmlns="http://www.w3.org/2000/svg" width="4" height="17" fill="none" viewBox="0 0 4 17">
              <circle cx="2" cy="2" r="2" fill="#C4C4C4"></circle>
              <circle cx="2" cy="8" r="2" fill="#C4C4C4"></circle>
              <circle cx="2" cy="15" r="2" fill="#C4C4C4"></circle>
            </svg>
          </button>
          <div className="_notifications_drop_right">
            <ul className="_notification_list">
              <li className="_notification_item">
                <span className="_notification_link">Mark as all read</span>
              </li>
              <li className="_notification_item">
                <span className="_notification_link">Notifivations seetings</span>
              </li>
              <li className="_notification_item">
                <span className="_notification_link">Open Notifications</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="_notifications_drop_box">
        <div className="_notifications_drop_btn_grp">
          <button className="_notifications_btn_link">All</button>
          <button className="_notifications_btn_link1">Unread</button>
        </div>
        <div className="_notifications_all">
          {notificationsData.map((item) => (
            <div className="_notification_box" key={item.id}>
              <div className="_notification_image">
                <Image 
                  src={item.image} 
                  alt="Image" 
                  className="_notify_img" 
                  width={40} 
                  height={40} 
                />
              </div>
              <div className="_notification_txt">
                <p className="_notification_para">
                  {item.type === "user_post" ? (
                    <>
                      <span className="_notify_txt_link">{item.name}</span> {item.message}
                    </>
                  ) : (
                    <>
                      {item.messageBefore}{" "}
                      <span className="_notify_txt_link">{item.groupName}</span>{" "}
                      {item.messageBetween}{" "}
                      <span className="_notify_txt_link">{item.newGroupName}</span>
                    </>
                  )}
                </p>
                <div className="_nitification_time">
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

