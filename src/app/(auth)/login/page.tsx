import LoginForm from "@/components/modules/auth/login/LoginForm";
import LoginHeroImage from "@/components/modules/auth/login/LoginHeroImage";
import LoginBackgroundShapes from "@/components/modules/auth/login/LoginBackgroundShapes";

export default function LoginPage() {
  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      {/* Background Shapes with next/image */}
      <LoginBackgroundShapes />

      <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Image Section */}
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <LoginHeroImage />
            </div>

            {/* Form Section */}
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
