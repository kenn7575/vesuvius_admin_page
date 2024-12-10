"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { config } from "@/app/config";

type LoginCredentials = {
  email: string;
  password: string;
};

export async function login(
  credentials: LoginCredentials
): Promise<{ error?: string }> {
  try {
    const res = await fetch(`${config.backendUrl}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    console.log("🚀 ~ login ~ res:", res);

    const data = await res.json();
    console.log("🚀 ~ data:", data);
    if (!res.ok) {
      return { error: data.message };
    }
    console.log("setting cookies");
    // Set the access token as an HTTP-only cookie
    (await cookies()).set("accessToken", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    // Set the refresh token as an HTTP-only cookie
    (await cookies()).set("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    console.log("🚀 ~ login ~ data.accessToken:", data.accessToken);

    // Redirect to a protected route after successful login
  } catch (error) {
    return { error: "An unexpected error occurred" };
  }
  redirect("/dashboard");
}
