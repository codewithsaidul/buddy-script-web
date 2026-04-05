"use client";
import InputFieldError from "@/components/shared/InputFieldError";
import { loginUser } from "@/service/auth/logInUser";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm({ redirect }: { redirect?: string }) {
  const [state, formAction, isPending] = useActionState(loginUser, null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);


  return (
    <>
      <div className="_social_login_content">
        <div className="_social_login_left_logo _mar_b28">
          <Image
            src="/assets/images/logo.svg"
            alt="Buddy Script"
            width={150}
            height={50}
            className="_left_logo"
          />
        </div>
        <p className="_social_login_content_para _mar_b8">Welcome back</p>
        <h4 className="_social_login_content_title _titl4 _mar_b50">
          Login to your account
        </h4>

        {/* Google Login Button */}
        <button type="button" className="_social_login_content_btn _mar_b40">
          <Image
            src="/assets/images/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="_google_img"
          />
          <span>Or sign-in with google</span>
        </button>

        <div className="_social_login_content_bottom_txt _mar_b40">
          <span>Or</span>
        </div>

        {/* Main Form */}
        <form action={formAction} className="_social_login_form">
          {redirect && <input type="hidden" name="redirect" value={redirect} />}

          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="_social_login_form_input _mar_b14">
                <label htmlFor="email" className="_social_login_label _mar_b8">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control _social_login_input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // required
                />
                <InputFieldError field="email" state={state} />
              </div>
            </div>

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
              <div className="_social_login_form_input _mar_b14">
                <label
                  htmlFor="password"
                  className="_social_login_label _mar_b8"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control _social_login_input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // required
                />
                <InputFieldError field="password" state={state} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
              <div className="form-check _social_login_form_check">
                <input
                  className="form-check-input _social_login_form_check_input"
                  type="checkbox"
                  name="remember"
                  id="rememberMe"
                  defaultChecked
                />
                <label
                  className="form-check-label _social_login_form_check_label"
                  htmlFor="rememberMe"
                >
                  Remember me
                </label>
              </div>
            </div>
            <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
              <div className="_social_login_form_left">
                <p className="_social_login_form_left_para cursor-pointer">
                  Forgot password?
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
              <div className="_social_login_form_btn _mar_t40 _mar_b60">
                <button
                  type="submit"
                  disabled={isPending}
                  className="_social_login_form_btn_link _btn1 w-100"
                >
                  {isPending ? "Logging in..." : "Login now"}
                </button>

              </div>
            </div>
          </div>
        </form>

        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_bottom_txt">
              <p className="_social_login_bottom_txt_para">
                Dont have an account?{" "}
                <Link href="/register">Create New Account</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
