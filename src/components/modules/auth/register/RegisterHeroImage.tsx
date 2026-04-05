import Image from "next/image";

export default function RegisterHeroImage() {
  return (
    <div className="_social_registration_right">
      <div className="_social_registration_right_image">
        <Image 
          src="/assets/images/registration.png" 
          alt="Registration Illustration" 
          width={600} 
          height={500} 
          className="_left_img"
          priority
        />
      </div>
    </div>
  );
}