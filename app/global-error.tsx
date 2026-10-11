/**
 * @file app/global-error.tsx
 * @description Root-level error boundary (layout failures). Must render its own
 * <html>/<body> ~ no shared layout, no fonts, no components that could throw.
 * Same locked copy as the route boundary.
 */

"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#0A0E14",
          color: "#F1F5F9",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "12px",
              letterSpacing: "2px",
              color: "#F87171",
            }}
          >
            [ ERROR 500 ]
          </p>
          <h1 style={{ fontSize: "40px", fontWeight: 800, textTransform: "uppercase", margin: "16px 0" }}>
            Fault detected.
          </h1>
          <p style={{ color: "#8B98AB", maxWidth: "480px" }}>
            Something broke on our side. Try again ~ if it keeps failing, email
            hello@quintence.io. Error: {error.digest ?? error.message}
          </p>
          <div style={{ marginTop: "24px", display: "flex", gap: "12px", justifyContent: "center" }}>
            <button
              onClick={reset}
              style={{
                backgroundColor: "#6CB2E6",
                color: "#0A1A2B",
                border: "none",
                borderRadius: "6px",
                padding: "12px 24px",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
