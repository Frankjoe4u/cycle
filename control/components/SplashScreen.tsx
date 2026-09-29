"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";

/**
 * Eve-Circle launch animation.
 *
 * Concept: one 28-day cycle, drawn once. A comet travels the ring and lights
 * each day in its phase colour (period, follicular, fertile, ovulation, luteal).
 * When the circle closes, the moon rises and the flower blooms inside it,
 * then the name and motto settle in.
 *
 * Plays once per session, tap to skip, and calms down for reduced-motion users.
 */

const DAYS = 28;
const RADIUS = 118;
const CENTRE = 150;
const START = 0.35; // seconds before the comet leaves
const STEP = 0.045; // seconds per day -> full lap in 1.26s

const NAME = "Eve-Circle";
const MOTTO = "Your gentle cycle companion";

function dayColour(i: number): string {
  if (i < 5) return "#fb7185"; // period
  if (i === 13) return "#ffd36e"; // ovulation
  if (i >= 10 && i <= 14) return "#e879f9"; // fertile window
  if (i < 10) return "#c084fc"; // follicular
  return "#818cf8"; // luteal
}

const dots = Array.from({ length: DAYS }, (_, i) => {
  const a = ((-90 + (i * 360) / DAYS) * Math.PI) / 180;
  return {
    i,
    x: +(CENTRE + RADIUS * Math.cos(a)).toFixed(2),
    y: +(CENTRE + RADIUS * Math.sin(a)).toFixed(2),
    colour: dayColour(i),
    delay: +(START + i * STEP).toFixed(3),
  };
});

const vars = (v: Record<string, string>) => v as CSSProperties;

export default function SplashScreen() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">("show");

  const leave = useCallback(() => {
    try {
      sessionStorage.setItem("ec-splash", "1");
    } catch {}
    setPhase((p) => (p === "show" ? "leave" : p));
  }, []);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("ec-splash") === "1";
    } catch {}
    if (seen) {
      setPhase("gone");
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(leave, reduced ? 1300 : 3900);
    return () => clearTimeout(t);
  }, [leave]);

  useEffect(() => {
    if (phase !== "leave") return;
    const t = setTimeout(() => setPhase("gone"), 700);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "gone") return null;

  return (
    <div
      className={"ec-splash" + (phase === "leave" ? " ec-leave" : "")}
      onClick={leave}
      role="img"
      aria-label={`${NAME}. ${MOTTO}`}
    >
      <div className="ec-glow" aria-hidden="true" />

      <div className="ec-stage" aria-hidden="true">
        <svg viewBox="0 0 300 300" className="ec-svg">
          <defs>
            <linearGradient id="ec-moon-fill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f3e8ff" />
              <stop offset="1" stopColor="#a78bfa" />
            </linearGradient>
            <radialGradient id="ec-halo">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="1" stopColor="#c084fc" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* the 28 days */}
          <g>
            {dots.map((d) => (
              <circle
                key={d.i}
                className="ec-dot"
                cx={d.x}
                cy={d.y}
                r={d.i === 13 ? 5.2 : 3.3}
                style={vars({ "--c": d.colour, "--d": `${d.delay}s` })}
              />
            ))}
          </g>

          {/* ovulation ping */}
          <circle
            className="ec-ping"
            cx={dots[13].x}
            cy={dots[13].y}
            r="5.2"
            fill="none"
            stroke="#ffd36e"
            strokeWidth="1.5"
            style={vars({ "--d": `${dots[13].delay + 0.05}s` })}
          />

          {/* comet */}
          <g className="ec-comet">
            {[6, 12, 18, 24, 30].map((deg, k) => (
              <circle
                key={deg}
                cx={CENTRE}
                cy={CENTRE - RADIUS}
                r={3.6 - k * 0.5}
                fill="#e9d5ff"
                opacity={0.55 - k * 0.1}
                transform={`rotate(${-deg} ${CENTRE} ${CENTRE})`}
              />
            ))}
            <circle cx={CENTRE} cy={CENTRE - RADIUS} r="11" fill="url(#ec-halo)" />
            <circle cx={CENTRE} cy={CENTRE - RADIUS} r="4.2" fill="#ffffff" />
          </g>

          {/* the cycle closes */}
          <circle
            className="ec-ripple"
            cx={CENTRE}
            cy={CENTRE}
            r={RADIUS}
            fill="none"
            stroke="#e879f9"
            strokeWidth="1.5"
          />

          {/* moon + flower, centred in the ring */}
          <g transform="translate(150 150) scale(0.88) translate(-97 -100)">
            <g className="ec-moon">
              <path
                d="M110.52 30.79 A70 70 0 1 0 164.96 126.07 A56 56 0 1 1 110.52 30.79 Z"
                fill="url(#ec-moon-fill)"
              />
            </g>
            <path
              className="ec-stem"
              d="M130 90 C128 108 120 122 104 130"
              pathLength={1}
              fill="none"
              stroke="#e9d5ff"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              className="ec-leaf"
              d="M121 112 C111 112 105 105 105 97 C114 98 120 104 121 112Z"
              fill="#e9d5ff"
              style={vars({ "--d": "2.2s" })}
            />
            <path
              className="ec-leaf"
              d="M119 121 C110 124 103 121 100 114 C108 112 116 114 119 121Z"
              fill="#e9d5ff"
              style={vars({ "--d": "2.3s" })}
            />
            <g className="ec-flower">
              {(
                [
                  [130, 66],
                  [142, 78],
                  [130, 90],
                  [118, 78],
                ] as const
              ).map(([x, y], k) => (
                <circle
                  key={k}
                  className="ec-petal"
                  cx={x}
                  cy={y}
                  r="11.5"
                  fill="#ff8fc8"
                  style={vars({ "--d": `${1.9 + k * 0.09}s` })}
                />
              ))}
              <circle
                className="ec-core"
                cx="130"
                cy="78"
                r="6.4"
                fill="#ffd36e"
                style={vars({ "--d": "2.25s" })}
              />
            </g>
          </g>
        </svg>
      </div>

      <div className="ec-copy" aria-hidden="true">
        <div className="ec-word">
          {NAME.split("").map((ch, i) => (
            <span
              key={i}
              className="ec-letter"
              style={vars({ "--d": `${2.05 + i * 0.055}s` })}
            >
              {ch}
            </span>
          ))}
        </div>
        <p className="ec-motto">{MOTTO}</p>
      </div>
    </div>
  );
}
