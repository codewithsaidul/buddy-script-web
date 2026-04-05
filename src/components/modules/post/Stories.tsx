import Image from 'next/image';
import Link from 'next/link';

const Stories = () => {
  // ডিজাইন ঠিক রাখতে এবং ম্যাপ করতে একটি ডেটা অ্যারে
  const publicStories = [
    { id: 2, name: "Ryan Roslansky", mainImg: "/assets/images/card_ppl2.png", miniImg: "/assets/images/mini_pic.png" },
    { id: 3, name: "Ryan Roslansky", mainImg: "/assets/images/card_ppl3.png", miniImg: "/assets/images/mini_pic.png", mobileNone: true },
    { id: 4, name: "Ryan Roslansky", mainImg: "/assets/images/card_ppl4.png", miniImg: "/assets/images/mini_pic.png", desktopNone: true },
  ];

  const mobileStories = [
    { id: 1, name: "Ryan...", img: "/assets/images/mobile_story_img1.png", active: true },
    { id: 2, name: "Ryan...", img: "/assets/images/mobile_story_img2.png", active: false },
    { id: 3, name: "Ryan...", img: "/assets/images/mobile_story_img1.png", active: true },
    { id: 4, name: "Ryan...", img: "/assets/images/mobile_story_img2.png", active: false },
    { id: 5, name: "Ryan...", img: "/assets/images/mobile_story_img1.png", active: true },
    { id: 6, name: "Ryan...", img: "/assets/images/mobile_story_img.png", active: false },
    { id: 7, name: "Ryan...", img: "/assets/images/mobile_story_img1.png", active: true },
  ];

  return (
    <>
      {/* --- For Desktop --- */}
      <div className="_feed_inner_ppl_card _mar_b16">
        <div className="_feed_inner_story_arrow">
          <button type="button" className="_feed_inner_story_arrow_btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="9" height="8" fill="none" viewBox="0 0 9 8">
              <path fill="#fff" d="M8 4l.366-.341.318.341-.318.341L8 4zm-7 .5a.5.5 0 010-1v1zM5.566.659l2.8 3-.732.682-2.8-3L5.566.66zm2.8 3.682l-2.8 3-.732-.682 2.8-3 .732.682zM8 4.5H1v-1h7v1z" />
            </svg>
          </button>
        </div>
        <div className="row">
          {/* Own Story */}
          <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col">
            <div className="_feed_inner_profile_story _b_radious6 ">
              <div className="_feed_inner_profile_story_image">
                <Image 
                  src="/assets/images/card_ppl1.png" 
                  alt="My Story" 
                  width={150} 
                  height={200} 
                  className="_profile_story_img"
                />
                <div className="_feed_inner_story_txt">
                  <div className="_feed_inner_story_btn">
                    <button className="_feed_inner_story_btn_link">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10">
                        <path stroke="#fff" strokeLinecap="round" d="M.5 4.884h9M4.884 9.5v-9" />
                      </svg>
                    </button>
                  </div>
                  <p className="_feed_inner_story_para">Your Story</p>
                </div>
              </div>
            </div>
          </div>

          {/* Public Stories Mapping */}
          {publicStories.map((story) => (
            <div 
              key={story.id} 
              className={`col-xl-3 col-lg-3 col-md-4 col-sm-4 ${story.mobileNone ? '_custom_mobile_none' : ''} ${story.desktopNone ? '_custom_none' : ''} col`}
            >
              <div className="_feed_inner_public_story _b_radious6">
                <div className="_feed_inner_public_story_image">
                  <Image 
                    src={story.mainImg} 
                    alt={story.name} 
                    width={150} 
                    height={200} 
                    className="_public_story_img" 
                  />
                  <div className="_feed_inner_pulic_story_txt">
                    <p className="_feed_inner_pulic_story_para">{story.name}</p>
                  </div>
                  <div className="_feed_inner_public_mini">
                    <Image 
                      src={story.miniImg} 
                      alt="Mini" 
                      width={32} 
                      height={32} 
                      className="_public_mini_img" 
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* --- For Desktop End --- */}

      {/* --- For Mobile --- */}
      <div className="_feed_inner_ppl_card_mobile _mar_b16">
        <div className="_feed_inner_ppl_card_area">
          <ul className="_feed_inner_ppl_card_area_list">
            {/* Mobile Own Story */}
            <li className="_feed_inner_ppl_card_area_item">
              <Link href="#0" className="_feed_inner_ppl_card_area_link">
                <div className="_feed_inner_ppl_card_area_story">
                  <Image src="/assets/images/mobile_story_img.png" alt="Story" width={60} height={60} className="_card_story_img" />
                  <div className="_feed_inner_ppl_btn">
                    <button className="_feed_inner_ppl_btn_link" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
                        <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7"/>
                      </svg>    
                    </button>
                  </div>
                </div>
                <p className="_feed_inner_ppl_card_area_link_txt">Your Story</p>
              </Link>
            </li>

            {/* Mobile Public Stories Mapping */}
            {mobileStories.map((mStory, index) => (
              <li key={index} className="_feed_inner_ppl_card_area_item">
                <Link href="#0" className="_feed_inner_ppl_card_area_link">
                  <div className={mStory.active ? "_feed_inner_ppl_card_area_story_active" : "_feed_inner_ppl_card_area_story_inactive"}>
                    <Image 
                      src={mStory.img} 
                      alt="Ryan" 
                      width={60} 
                      height={60} 
                      className="_card_story_img1" 
                    />
                  </div>
                  <p className="_feed_inner_ppl_card_area_txt">{mStory.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* --- For Mobile End --- */}
    </>
  );
};

export default Stories;