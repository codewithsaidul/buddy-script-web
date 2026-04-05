import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import RegisterHeroImage from "@/components/modules/auth/register/RegisterHeroImage";
import RegisterBackgroundShapes from "@/components/modules/auth/register/RegisterBackgroundShapes";

export default function RegisterPage() {
  return (
    <section className="_social_registration_wrapper _layout_main_wrapper">
      <RegisterBackgroundShapes />
      <div className="_social_registration_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <RegisterHeroImage />
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <RegisterForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}