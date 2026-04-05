/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { Fetcher } from "@/utils/fetcher";
import { zodValidator } from "@/utils/zodValidator";
import { createUserZodSchema } from "@/validation/auth.validation";
import { loginUser } from "./logInUser";

export const registerUser = async (
  _currentState: any,
  formData: FormData,
): Promise<any> => {
  try {
    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    const validation = zodValidator(payload, createUserZodSchema);
    if (!validation.success) {
      return validation;
    }

    const validatedPayload = validation.data;

    const registerData = {
      firstName: validatedPayload?.firstName,
      lastName: validatedPayload?.lastName,
      email: validatedPayload?.email,
      password: validatedPayload?.password,
    };

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(registerData));

    const file = formData.get("file");
    if (file && (file as File).size > 0) {
      newFormData.append("file", file as Blob);
    }

    const res = await Fetcher.post("/auth/register", {
      body: newFormData,
    });

    const result = await res.json();

    if (result.success) {
      return await loginUser(_currentState, formData);
    }

    return result;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.error("Registration Error:", error);
    return {
      success: false,
      message: error?.data?.message || "Something went wrong",
    };
  }
};
