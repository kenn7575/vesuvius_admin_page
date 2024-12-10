// app/login/page.tsx

// app/login/login-form.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { login } from "./actions/loginAction"; // We'll create this server action

const loginSchema = z.object({
  email: z.string().email({
    message: "Skriv venligst en gyldig email.",
  }),
  password: z.string(),
});

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const result = await login(values);
    console.log("🚀 ~ onSubmit ~ result:", result);

    if (result.error) {
      setError(result.error);
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...form.register("email")}
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
            {form.formState.errors.email && (
              <p className="text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input
              {...form.register("password")}
              id="password"
              type="password"
              required
            />
            {form.formState.errors.password && (
              <p className="text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
