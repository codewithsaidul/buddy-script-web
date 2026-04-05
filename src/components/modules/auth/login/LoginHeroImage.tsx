import Image from "next/image";

export default function LoginHeroImage() {
  return (
    <>
      <div className="_social_login_left">
        <div className="_social_login_left_image">
          <Image
            src="/assets/images/login.png"
            alt="Login Illustration"
            width={600}
            height={500}
            className="_left_img"
            priority
          />
        </div>
      </div>
    </>
  );
}
