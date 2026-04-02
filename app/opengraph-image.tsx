import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt     = "CodeDev — Learn Programming the Right Way";
export const size    = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0D1117",
          width:       "100%",
          height:      "100%",
          display:     "flex",
          flexDirection: "column",
          alignItems:  "center",
          justifyContent: "center",
          fontFamily:  "system-ui, sans-serif",
          position:    "relative",
        }}
      >
        {/* Grid background */}
        <div
          style={{
            position:   "absolute",
            inset:       0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position:   "absolute",
            top:         0,
            left:        "10%",
            right:       "10%",
            height:      "300px",
            background:  "radial-gradient(ellipse at 50% 0%, rgba(123,97,255,0.3), transparent 60%)",
          }}
        />

        {/* Logo mark */}
        <div
          style={{
            display:    "flex",
            alignItems: "center",
            gap:         16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width:          60,
              height:         60,
              borderRadius:   14,
              background:     "rgba(123,97,255,0.2)",
              border:         "1.5px solid rgba(123,97,255,0.5)",
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              fontSize:       24,
              color:          "#7B61FF",
              fontWeight:     800,
            }}
          >
            {"</>"}
          </div>
          <div style={{ display: "flex", fontSize: 48, fontWeight: 700, color: "#F0F6FF", letterSpacing: "-1px" }}>
            Code
            <span style={{ color: "#7B61FF" }}>Dev</span>
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize:    28,
            fontWeight:  500,
            color:       "#F0F6FF",
            textAlign:   "center",
            marginBottom: 16,
            letterSpacing: "-0.5px",
          }}
        >
          Learn Programming the Right Way
        </div>

        <div style={{ fontSize: 18, color: "#8B9BB4", textAlign: "center" }}>
          Python · Rust · Lua · Go · Python for SysAdmins
        </div>

        {/* Track badges */}
        <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
          {[
            { label: "🐍 Python",   color: "#3B82F6" },
            { label: "🦀 Rust",     color: "#F97316" },
            { label: "🌙 Lua",      color: "#8B5CF6" },
            { label: "🐹 Go",       color: "#06B6D4" },
            { label: "⚙️ SysAdmin", color: "#10B981" },
          ].map(({ label, color }) => (
            <div
              key={label}
              style={{
                padding:       "8px 16px",
                borderRadius:  99,
                background:    `${color}20`,
                border:        `1px solid ${color}50`,
                color:          color,
                fontSize:       14,
                fontWeight:     600,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
