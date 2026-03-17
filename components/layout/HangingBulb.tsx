"use client";

import { useState } from "react";

/**
 * HangingBulb
 * A glowing light bulb that hangs from the top border of the footer.
 * It emits layered radial glow and swings like a pendulum on hover.
 */
export default function HangingBulb() {
    const [hovered, setHovered] = useState(false);

    return (
        <>
            {/* Keyframe definitions */}
            <style>{`
        @keyframes bulb-swing {
          0%   { transform: rotate(-10deg); }
          100% { transform: rotate(10deg);  }
        }
        @keyframes bulb-idle {
          0%, 100% { transform: rotate(-1.5deg); }
          50%       { transform: rotate(1.5deg);  }
        }
        @keyframes glow-pulse {
          0%, 100% { opacity: 1;    }
          50%       { opacity: 0.75; }
        }
      `}</style>

            {/* Anchor point — sits exactly on the footer's top border */}
            <div
                className="absolute left-1/2 top-0 -translate-x-1/2 z-20 flex flex-col items-center"
                style={{ transformOrigin: "top center" }}
            >
                {/* Swinging assembly — wire + bulb rotate together from the top */}
                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        transformOrigin: "top center",
                        animation: hovered
                            ? "bulb-swing 0.55s ease-in-out infinite alternate"
                            : "bulb-idle 3s ease-in-out infinite alternate",
                        transition: "animation 0.3s",
                        cursor: "default",
                    }}
                >
                    {/* Wire */}
                    <div
                        style={{
                            width: "1px",
                            height: "56px",
                            background:
                                "linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.1))",
                        }}
                    />

                    {/* Bulb glass body */}
                    <div
                        style={{
                            position: "relative",
                            width: "22px",
                            height: "28px",
                            borderRadius: "50% 50% 35% 35%",
                            background:
                                "radial-gradient(ellipse at 38% 32%, #fffde7 0%, #FFD740 40%, #FF8F00 100%)",
                            animation: "glow-pulse 2.5s ease-in-out infinite",
                            /* Layered glow: tight, mid, wide */
                            boxShadow: hovered
                                ? `0 0 8px  4px  rgba(255, 220, 80, 0.95),
                   0 0 22px 10px rgba(255, 170, 30, 0.75),
                   0 0 55px 28px rgba(255, 120, 0, 0.45),
                   0 0 90px 45px rgba(255, 80,  0, 0.25)`
                                : `0 0 6px  3px  rgba(255, 220, 80, 0.85),
                   0 0 18px 8px  rgba(255, 170, 30, 0.60),
                   0 0 40px 20px rgba(255, 120, 0, 0.35),
                   0 0 70px 35px rgba(255, 80,  0, 0.18)`,
                            transition: "box-shadow 0.4s ease",
                        }}
                    >
                        {/* Specular highlight */}
                        <div
                            style={{
                                position: "absolute",
                                top: "5px",
                                left: "5px",
                                width: "6px",
                                height: "8px",
                                borderRadius: "50%",
                                background:
                                    "radial-gradient(circle, rgba(255,255,255,0.85) 0%, transparent 100%)",
                                transform: "rotate(-20deg)",
                            }}
                        />
                    </div>

                    {/* Screw base / cap */}
                    <div
                        style={{
                            width: "14px",
                            height: "7px",
                            background:
                                "linear-gradient(to bottom, rgba(200,200,200,0.35), rgba(120,120,120,0.2))",
                            borderRadius: "0 0 4px 4px",
                            borderTop: "1px solid rgba(255,255,255,0.15)",
                        }}
                    />
                </div>

                {/* Floor glow cast downward onto footer content */}
                <div
                    style={{
                        position: "absolute",
                        top: "90px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "120px",
                        height: "60px",
                        background:
                            "radial-gradient(ellipse at 50% 0%, rgba(255,180,30,0.12) 0%, transparent 70%)",
                        pointerEvents: "none",
                    }}
                />
            </div>
        </>
    );
}
