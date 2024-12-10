import { cookies } from "next/headers";
import { config } from "@/app/config"; // Adjust the import path as needed
import { redirect } from "next/navigation";
/**
 * A type-safe utility for fetching data in Next.js server components with advanced token management
 * @param endpoint - The API endpoint to fetch from (relative or full URL)
 * @param options - Optional fetch options and type casting
 * @returns Parsed response data or null
 */
export async function fetchWithToken<T = any>(
  endpoint: string,
  options: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
    revalidate?: number | false;
    maxRetries?: number;
  } = {}
): Promise<T | null> {
  try {
    // Retrieve access token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");

    // Prepare full URL (handle both relative and absolute URLs)
    const url = endpoint.startsWith("http")
      ? endpoint
      : `${config.backendUrl}${endpoint}`;

    // Prepare fetch options
    const fetchOptions: RequestInit = {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken?.value}`,
        ...(options.body && { "Content-Type": "application/json" }),
      },
      ...(options.body && { body: JSON.stringify(options.body) }),
      cache: options.cache || "no-store",
      next: options.next,
      ...(options.revalidate !== undefined && {
        next: {
          revalidate: options.revalidate,
        },
      }),
    };

    // Perform fetch
    const response = await fetch(url, fetchOptions);

    // Handle non-OK responses
    if (!response.ok) {
      //   redirect("/test2");
      console.error("Failed to fetch data", response);
      return null;
    }

    // Parse and return JSON
    return (await response.json()) as T;
  } catch (error) {
    // redirect("/test3");
    console.error("Failed to fetch data", error);
    return null;
  }
}
