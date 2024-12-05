"use client";

import { authFetch } from "@/lib/authHttpClient";

export default function Page() {
  return (
    <div>
      <h1>Page</h1>
      <button
        onClick={() => {
          //   fetch("http://localhost:5005/tables");
          authFetch("http://localhost:5005/tables");
        }}
      >
        press me
      </button>
    </div>
  );
}
