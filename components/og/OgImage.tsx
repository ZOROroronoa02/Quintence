/**
 * @file components/og/OgImage.tsx
 * @description OG image artwork (1200×630). Dark instrument-panel card: mono
 * kicker, display title, accent baseline in logo steel-blue (#6CB2E6).
 * Rendered by app/og/route.tsx via next/og ~ flex layout and system fonts
 * only (satori constraints).
 */

export function OgImage({ title, kicker }: { title: string; kicker: string }) {
  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0A0E14",
        border: "1px solid rgba(148,163,184,0.2)",
        padding: "72px 80px",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontFamily: "ui-monospace, monospace",
          fontSize: "28px",
          letterSpacing: "6px",
          color: "#6CB2E6",
        }}
      >
        [ {kicker} ]
      </div>
      <div
        style={{
          display: "flex",
          fontSize: "84px",
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: "-2px",
          color: "#F1F5F9",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            fontFamily: "ui-monospace, monospace",
            fontSize: "26px",
            letterSpacing: "4px",
            color: "#8B98AB",
          }}
        >
          QUINTENCE ~ FROM PIPELINE TO LAUNCH
        </div>
        <div
          style={{
            marginLeft: "24px",
            width: "120px",
            height: "4px",
            backgroundColor: "#6CB2E6",
          }}
        />
      </div>
    </div>
  );
}
