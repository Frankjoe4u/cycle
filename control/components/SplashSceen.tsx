"use client";

import { useEffect, useState } from "react";

interface Props {
  onDone: () => void;
}

export default function SplashScreen({ onDone }: Props) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000);
    const doneTimer = setTimeout(() => onDone(), 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div
      className={
        "fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0d1a] transition-opacity duration-700 " +
        (fadeOut ? "opacity-0" : "opacity-100")
      }
    >
      {/* Glow */}
      <div className="absolute w-64 h-64 rounded-full bg-[#c084fc]/20 blur-3xl" />

      {/* Logo */}
      <div
        className={
          "relative w-36 h-36 rounded-full overflow-hidden border-4 border-[#c084fc] shadow-2xl shadow-purple-900/60 transition-all duration-700 " +
          (fadeOut ? "scale-90 opacity-0" : "scale-100 opacity-100")
        }
      >
        <img
          src="/pro.jpg"
          alt="FJ Tracker"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h1
        className={
          "mt-6 text-2xl font-bold tracking-widest uppercase text-[#f0e6ff] transition-all duration-700 delay-200 " +
          (fadeOut ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0")
        }
        style={{ fontFamily: "var(--font-serif)" }}
      >
        FJ Tracker
      </h1>

      {/* Tagline */}
      <p
        className={
          "mt-2 text-sm text-[#c084fc] tracking-wide transition-all duration-700 delay-300 " +
          (fadeOut ? "opacity-0" : "opacity-100")
        }
      >
        Your gentle cycle companion
      </p>

      {/* Bouncing dots */}
      <div className="mt-10 flex gap-2">
        <div
          className="w-2 h-2 rounded-full bg-[#c084fc] animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 rounded-full bg-[#c084fc] animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 rounded-full bg-[#c084fc] animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
