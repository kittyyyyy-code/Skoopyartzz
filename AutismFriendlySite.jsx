/*
AutismFriendlySite.jsx
Single-file React component built with Tailwind-style classes (Tailwind must be available in your project).
Drop this file into a Create-React-App / Vite / Next.js page and render <AutismFriendlySite />.
Made for sensory-friendly, autistic-friendly experience with adjustable settings, reduced-motion support,
and playful visuals: sparkles, moon, cats, sharks, ocean.

Features:
- Theme toggle (Calm / Ocean / High-Contrast)
- Font size control
- Reduce motion toggle (respects prefers-reduced-motion)
- Simplified mode (fewer visuals)
- Keyboard accessible controls and ARIA labels
- Decorative SVGs that hide when simplified or reduceMotion is on

Note: This file expects Tailwind to be configured. If you don't use Tailwind, the classes are readable and you can translate them to regular CSS.
*/

import React, { useEffect, useState } from "react";

export default function AutismFriendlySite() {
  const [theme, setTheme] = useState("calm"); // calm | ocean | contrast
  const [fontSize, setFontSize] = useState(16);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [simplified, setSimplified] = useState(false);
  const [sparklesOn, setSparklesOn] = useState(true);

  useEffect(() => {
    // Respect user's system preference for reduced motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) setReduceMotion(true);
  }, []);

  useEffect(() => {
    // Apply theme classes to document root so outer styles can respond
    const root = document.documentElement;
    root.style.setProperty("--site-font-size", `${fontSize}px`);

    if (theme === "calm") {
      root.style.setProperty("--bg", "#fffef6");
      root.style.setProperty("--muted", "#52606d");
      root.style.setProperty("--accent", "#7cc0e8");
    } else if (theme === "ocean") {
      root.style.setProperty("--bg", "#eef9ff");
      root.style.setProperty("--muted", "#0e3b57");
      root.style.setProperty("--accent", "#00a6d6");
    } else if (theme === "contrast") {
      root.style.setProperty("--bg", "#000000");
      root.style.setProperty("--muted", "#ffffff");
      root.style.setProperty("--accent", "#ffd60a");
    }
  }, [theme, fontSize]);

  return (
    <div
      className="min-h-screen p-6"
      style={{ background: "var(--bg)", color: "var(--muted)", fontSize: "var(--site-font-size)" }}
    >
      <header className="max-w-4xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold" style={{ color: "var(--muted)" }}>
            🌙 Calm Cove — A Friendly Space
          </h1>
          <p className="mt-1 text-sm opacity-80">A sensory-considerate small web page made for autistic users — adjustable and playful.</p>
        </div>

        <div className="flex gap-3 items-center">
          <label className="flex items-center gap-2" aria-hidden>
            <input
              type="checkbox"
              checked={simplified}
              onChange={(e) => setSimplified(e.target.checked)}
              aria-label="Simplified mode"
            />
            Simplified
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={reduceMotion}
              onChange={(e) => setReduceMotion(e.target.checked)}
              aria-label="Reduce motion"
            />
            Reduce motion
          </label>

          <button
            onClick={() => setSparklesOn((s) => !s)}
            className="px-3 py-1 rounded-lg shadow-sm"
            aria-pressed={sparklesOn}
          >
            {sparklesOn ? "✨ Sparkles On" : "✨ Sparkles Off"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <section className="col-span-2 bg-white/60 rounded-2xl p-6 backdrop-blur-sm shadow-lg" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
          <h2 className="text-2xl font-semibold">Welcome</h2>
          <p className="mt-3 leading-relaxed">
            This is a calm, accessible area. Use the controls to adjust font size, theme, motion, and simplification. 
            The site intentionally avoids flashing or sudden loud animations — turn off visuals with "Simplified" and enable "Reduce motion" for the calmest experience.
          </p>

          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <h3 className="font-medium">Themes</h3>
              <div className="mt-2 flex gap-2">
                <button className="px-3 py-1 rounded-md" onClick={() => setTheme("calm")}>Calm</button>
                <button className="px-3 py-1 rounded-md" onClick={() => setTheme("ocean")}>Ocean</button>
                <button className="px-3 py-1 rounded-md" onClick={() => setTheme("contrast")}>High contrast</button>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-medium">Font size</h3>
              <input
                aria-label="Font size"
                type="range"
                min={14}
                max={28}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-sm mt-1">{fontSize}px</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium">Calm Activities</h3>
            <ul className="mt-2 list-disc list-inside leading-relaxed">
              <li>Slow breathing with ocean visual aid</li>
              <li>Soft interactive cat tracker (just for fun)</li>
              <li>Moon gazing calming prompt</li>
            </ul>
          </div>
        </section>

        <aside className="bg-white/50 rounded-2xl p-4 shadow-inner flex flex-col gap-4" aria-label="Controls and decorative area">
          <div>
            <h4 className="font-semibold">Quick Controls</h4>
            <div className="mt-2 grid grid-cols-1 gap-2">
              <button onClick={() => { setSimplified(true); setReduceMotion(true); setSparklesOn(false); }} className="w-full py-2 rounded">Quiet Mode</button>
              <button onClick={() => { setSimplified(false); setReduceMotion(false); setSparklesOn(true); }} className="w-full py-2 rounded">Playful Mode</button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Sensory options</h4>
            <label className="flex items-center gap-2 mt-2"><input type="checkbox" checked={true} readOnly/> No flashing content</label>
            <label className="flex items-center gap-2 mt-1"><input type="checkbox" checked={false} readOnly/> Low volume (if audio present)</label>
          </div>

          <div>
            <h4 className="font-semibold">About</h4>
            <p className="text-sm mt-2">Designed with input patterns commonly helpful for autistic users: clear layout, explicit controls, and sensory options. Customize further for your needs.</p>
          </div>
        </aside>

        {/* Decorative area at bottom spanning full width */}
        <div className="col-span-3 mt-4 relative">
          {/* Ocean waves */}
          <div className={`rounded-3xl overflow-hidden p-6 relative`} style={{ background: theme === 'ocean' ? '#dff6ff' : 'transparent' }}>
            <h3 className="text-xl font-semibold mb-2">Ocean & Friends</h3>
            <p className="text-sm mb-4">Interact with calm visuals below. Toggle "Simplified" or "Reduce motion" to remove movement.</p>

            <div className="flex gap-4 items-center">
              <div className="flex-1 min-h-[120px] relative">
                {/* Cat SVG */}
                <DecorativeCat simplified={simplified} reduceMotion={reduceMotion} sparklesOn={sparklesOn} />
              </div>

              <div className="w-40 h-32">
                <DecorativeMoon simplified={simplified} reduceMotion={reduceMotion} />
              </div>

              <div className="flex-1 min-h-[120px] relative">
                <DecorativeShark simplified={simplified} reduceMotion={reduceMotion} sparklesOn={sparklesOn} />
              </div>
            </div>

            {/* subtle waves */}
            <div className="mt-6">
              <OceanWaves simplified={simplified} reduceMotion={reduceMotion} />
            </div>
          </div>
        </div>
      </main>

      <footer className="max-w-4xl mx-auto mt-8 text-center text-sm opacity-80">Made with care • adjust settings to suit you</footer>

      {/* Decorative sparkles floating (full-page) */}
      {!simplified && sparklesOn && <Sparkles reduceMotion={reduceMotion} />}
    </div>
  );
}

function DecorativeCat({ simplified, reduceMotion, sparklesOn }) {
  return (
    <div className="absolute left-0 top-0 w-full h-full flex items-center" aria-hidden>
      <svg viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet" className="w-full h-full">
        <g transform="translate(10,10)">
          <ellipse cx="60" cy="80" rx="40" ry="20" fill="#ffd6e0" />
          <path d="M35 65 q12 -30 50 -10 q-10 10 -30 18 q-20 -2 -20 -8" fill="#fff" stroke="#e76" strokeWidth="1" />
          {/* ear */}
          <path d="M45 48 l6 -12 l10 6" fill="#ffd6e0" stroke="#e76" strokeWidth="1" />

          {/* eyes */}
          <circle cx="55" cy="70" r="3" fill="#222" />
          <circle cx="75" cy="70" r="3" fill="#222" />

          {/* tail */}
          <path d="M95 78 q20 -8 30 -20" stroke="#ffd6e0" strokeWidth="8" fill="none" strokeLinecap="round" />
        </g>

        {/* optional sparkles around cat */}
        {!simplified && sparklesOn && !reduceMotion && (
          <g>
            <circle cx="30" cy="20" r="2" fill="#fff3a1" />
            <rect x="40" y="10" width="3" height="3" rx="0.5" />
            <circle cx="80" cy="15" r="1.8" />
          </g>
        )}
      </svg>
    </div>
  );
}

function DecorativeMoon({ simplified, reduceMotion }) {
  return (
    <div className="w-full h-full flex items-center justify-center" aria-hidden>
      <svg viewBox="0 0 100 100" className="w-28 h-28">
        <circle cx="50" cy="50" r="30" fill="url(#g)" />
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#fff8c4" />
            <stop offset="100%" stopColor="#ffd" />
          </linearGradient>
        </defs>
        {!simplified && (
          <g>
            <circle cx="64" cy="40" r="4" fill="#fff6" />
          </g>
        )}
      </svg>
    </div>
  );
}

function DecorativeShark({ simplified, reduceMotion, sparklesOn }) {
  return (
    <div className="absolute right-0 top-0 w-full h-full flex items-center justify-end" aria-hidden>
      <svg viewBox="0 0 200 120" className="w-full h-full">
        <g transform="translate(10,20)">
          <path d="M20 60 q40 -40 120 -10 q-20 10 -40 18 q-40 -4 -80 -8" fill="#cfefff" stroke="#8fb" strokeWidth="1" />
          <circle cx="90" cy="50" r="3" fill="#123" />
          <path d="M110 55 l18 -10 l6 22" fill="#cfefff" stroke="#8fb" strokeWidth="1" />
        </g>

        {!simplified && sparklesOn && !reduceMotion && (
          <g>
            <circle cx="150" cy="20" r="2" />
            <rect x="140" y="30" width="3" height="3" />
          </g>
        )}
      </svg>
    </div>
  );
}

function OceanWaves({ simplified, reduceMotion }) {
  // Waves are subtle; removed when simplified or reduceMotion
  if (simplified) return <div className="h-10 rounded-md bg-gradient-to-r from-transparent to-transparent" />;

  return (
    <div className="h-20 relative overflow-hidden">
      <svg viewBox="0 0 800 120" preserveAspectRatio="none" className="w-full h-full">
        <path
          d="M0 40 C150 80 350 0 500 40 C650 80 800 20 960 40 L960 120 L0 120 Z"
          fill="#bde7ff"
          style={{ transformOrigin: 'center' }}
        />

        {!reduceMotion && (
          <animate
            xlinkHref="#wave"
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="M0 40 C150 80 350 0 500 40 C650 80 800 20 960 40 L960 120 L0 120 Z;
                    M0 50 C150 20 350 80 500 50 C650 20 800 80 960 50 L960 120 L0 120 Z;
                    M0 40 C150 80 350 0 500 40 C650 80 800 20 960 40 L960 120 L0 120 Z"
          />
        )}
      </svg>
    </div>
  );
}

function Sparkles({ reduceMotion }) {
  // A small set of absolutely positioned sparkles that fade in/out slowly
  const sparkles = [ {left: '10%', top: '10%'}, {left: '30%', top: '25%'}, {left: '70%', top: '15%'}, {left: '85%', top: '60%'} ];

  return (
    <div aria-hidden>
      {sparkles.map((s, i) => (
        <div key={i} style={{ position: 'fixed', left: s.left, top: s.top, pointerEvents: 'none' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2 L13.6 8.4 L20 10 L13.6 11.6 L12 18 L10.4 11.6 L4 10 L10.4 8.4 Z" fill="var(--accent)" />
          </svg>
        </div>
      ))}
      {/* If reduceMotion is false, animate slight float */}
      {!reduceMotion && (
        <style>{`
          @keyframes floaty { 0% { transform: translateY(0px)} 50% { transform: translateY(-6px)} 100% { transform: translateY(0px)} }
          div[aria-hidden] > div > svg { animation: floaty 6s ease-in-out infinite; opacity: 0.9 }
        `}</style>
      )}
    </div>
  );
}
