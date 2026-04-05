"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { registerUser } from "@/service/auth/registerUser";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="_social_registration_content">
      <div className="_social_registration_right_logo _mar_b28">
        <Image
          src="/assets/images/logo.svg"
          alt="Logo"
          width={150}
          height={50}
          className="_right_logo"
        />
      </div>
      <p className="_social_registration_content_para _mar_b8">
        Get Started Now
      </p>
      <h4 className="_social_registration_content_title _titl4 _mar_b50">
        Registration
      </h4>

      <button
        type="button"
        className="_social_registration_content_btn _mar_b40"
      >
        <Image
          src="/assets/images/google.svg"
          alt="Google"
          width={20}
          height={20}
          className="_google_img"
        />
        <span>Register with google</span>
      </button>

      <div className="_social_registration_content_bottom_txt _mar_b40">
        {" "}
        <span>Or</span>
      </div>

      <form action={formAction} className="_social_registration_form">
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                First Name
              </label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="form-control _social_registration_input"
                placeholder="First Name"
                required
              />
              <InputFieldError field="firstName" state={state} />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                Last Name
              </label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="form-control _social_registration_input"
                placeholder="Last Name"
                required
              />
              <InputFieldError field="lastName" state={state} />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control _social_registration_input"
                placeholder="Email Address"
                required
              />
              <InputFieldError field="email" state={state} />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control _social_registration_input"
                placeholder="Password"
                required
              />
              <InputFieldError field="password" state={state} />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control _social_registration_input"
                placeholder="Repeat Password"
                required
              />
              <InputFieldError field="confirmPassword" state={state} />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
            <div className="form-check _social_registration_form_check">
              <input
                className="form-check-input _social_registration_form_check_input"
                type="checkbox"
                id="terms"
                required
              />
              <label
                className="form-check-label _social_registration_form_check_label"
                htmlFor="terms"
              >
                I agree to terms & conditions
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                disabled={isPending}
                className="_social_registration_form_btn_link _btn1 w-100"
              >
                {isPending ? "Registering..." : "Register Now"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="_social_registration_bottom_txt">
        <p className="_social_registration_bottom_txt_para">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
