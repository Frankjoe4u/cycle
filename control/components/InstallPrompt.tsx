"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // don't show if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShow(true), 2000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") dismiss();
    setDeferredPrompt(null);
  }

  function dismiss() {
    setFadeOut(true);
    setTimeout(() => setShow(false), 400);
  }

  if (!show || installed) return null;

  return (
    <div
      className={
        "fixed bottom-6 left-4 right-4 z-50 max-w-xl mx-auto transition-all duration-500 " +
        (fadeOut ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0")
      }
    >
      <div
        className="rounded-2xl p-4 shadow-2xl"
        style={{
          background: "linear-gradient(135deg, #1a1030, #0d0d1a)",
          border: "1px solid rgba(192, 132, 252, 0.4)",
        }}
      >
        {/* Top row */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-[#c084fc] flex-shrink-0">
            <img
              src="/logo.png"
              alt="Eve-Circle"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="font-bold text-[#f0e6ff]">Install  Eve-Circle</div>
            <div className="text-xs text-[#c084fc] mt-1">
              Save time and energy
            </div>
          </div>
          <button
            onClick={dismiss}
            className="text-[#c084fc]/40 hover:text-[#c084fc] transition text-xl leading-none flex-shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={dismiss}
            className="flex-1 py-3 rounded-xl text-sm text-[#c084fc] transition hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Not now
          </button>
          <button
            onClick={handleInstall}
            className="flex-1 py-3 rounded-xl text-white text-sm font-bold transition hover:opacity-90"
            style={{
              background: "linear-gradient(to right, #ec4899, #8b5cf6)",
            }}
          >
            Install App 📲
          </button>
        </div>
      </div>
    </div>
  );
}
