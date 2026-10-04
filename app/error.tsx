"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "red" }}>A Server Error Occurred on Vercel!</h1>
      <p>This is a custom error page to help us debug the issue.</p>
      
      <div style={{ background: "#f5f5f5", padding: "1rem", borderRadius: "8px", overflow: "auto" }}>
        <h3>Error Details:</h3>
        <p><strong>Message:</strong> {error.message}</p>
        <p><strong>Digest:</strong> {error.digest}</p>
        <p><strong>Stack:</strong></p>
        <pre style={{ fontSize: "12px", whiteSpace: "pre-wrap" }}>
          {error.stack}
        </pre>
      </div>
      
      <button 
        onClick={() => reset()}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
      >
        Try Again
      </button>
    </div>
  );
}
