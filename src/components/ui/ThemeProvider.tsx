"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

/* ── Types ──────────────────────────────────────────────────── */
type ThemeMode = "dark" | "light" | "system";
type AccentColor = "amber" | "blue" | "emerald" | "rose" | "violet" | "cyan";

interface ThemeContextValue {
  mode: ThemeMode;
  resolvedMode: "dark" | "light";
  accent: AccentColor;
  setMode: (mode: ThemeMode) => void;
  setAccent: (accent: AccentColor) => void;
}

/* ── Accent Palettes ────────────────────────────────────────── */
const accentPalettes: Record<
  AccentColor,
  { main: string; hover: string; muted: string; glow: string }
> = {
  amber: {
    main: "#F5A623",
    hover: "#FFB84D",
    muted: "rgba(245, 166, 35, 0.15)",
    glow: "rgba(245, 166, 35, 0.25)",
  },
  blue: {
    main: "#3B82F6",
    hover: "#60A5FA",
    muted: "rgba(59, 130, 246, 0.15)",
    glow: "rgba(59, 130, 246, 0.25)",
  },
  emerald: {
    main: "#10B981",
    hover: "#34D399",
    muted: "rgba(16, 185, 129, 0.15)",
    glow: "rgba(16, 185, 129, 0.25)",
  },
  rose: {
    main: "#F43F5E",
    hover: "#FB7185",
    muted: "rgba(244, 63, 94, 0.15)",
    glow: "rgba(244, 63, 94, 0.25)",
  },
  violet: {
    main: "#8B5CF6",
    hover: "#A78BFA",
    muted: "rgba(139, 92, 246, 0.15)",
    glow: "rgba(139, 92, 246, 0.25)",
  },
  cyan: {
    main: "#06B6D4",
    hover: "#22D3EE",
    muted: "rgba(6, 182, 212, 0.15)",
    glow: "rgba(6, 182, 212, 0.25)",
  },
};

/* ── Light / Dark base palettes ─────────────────────────────── */
const baseThemes = {
  dark: {
    "--color-base": "#0A0F1E",
    "--color-surface": "#111827",
    "--color-surface-elevated": "#1A2235",
    "--color-text-primary": "#F1F5F9",
    "--color-text-secondary": "#94A3B8",
    "--color-text-muted": "#64748B",
    "--color-border": "rgba(148, 163, 184, 0.12)",
    "--color-border-hover": "rgba(148, 163, 184, 0.25)",
    "--color-glass": "rgba(17, 24, 39, 0.6)",
    "--color-glass-border": "rgba(148, 163, 184, 0.08)",
  },
  light: {
    "--color-base": "#F8FAFC",
    "--color-surface": "#FFFFFF",
    "--color-surface-elevated": "#F1F5F9",
    "--color-text-primary": "#0F172A",
    "--color-text-secondary": "#475569",
    "--color-text-muted": "#94A3B8",
    "--color-border": "rgba(15, 23, 42, 0.1)",
    "--color-border-hover": "rgba(15, 23, 42, 0.2)",
    "--color-glass": "rgba(255, 255, 255, 0.7)",
    "--color-glass-border": "rgba(15, 23, 42, 0.06)",
  },
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

/* ── Provider ───────────────────────────────────────────────── */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");
  const [accent, setAccentState] = useState<AccentColor>("amber");
  const [resolvedMode, setResolvedMode] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  /* Read persisted prefs on mount */
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as ThemeMode | null;
    const savedAccent = localStorage.getItem("theme-accent") as AccentColor | null;
    if (savedMode) setModeState(savedMode);
    if (savedAccent) setAccentState(savedAccent);
    setMounted(true);
  }, []);

  /* Resolve system preference */
  useEffect(() => {
    const resolveMode = () => {
      if (mode === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setResolvedMode(prefersDark ? "dark" : "light");
      } else {
        setResolvedMode(mode);
      }
    };

    resolveMode();

    if (mode === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => resolveMode();
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }
  }, [mode]);

  /* Apply CSS variables */
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    const basePalette = baseThemes[resolvedMode];
    const accentPalette = accentPalettes[accent];

    // Base theme colors
    for (const [key, value] of Object.entries(basePalette)) {
      root.style.setProperty(key, value);
    }

    // Accent colors
    root.style.setProperty("--color-accent", accentPalette.main);
    root.style.setProperty("--color-accent-hover", accentPalette.hover);
    root.style.setProperty("--color-accent-muted", accentPalette.muted);
    root.style.setProperty("--color-accent-glow", accentPalette.glow);

    // Class for potential CSS selectors
    root.classList.remove("theme-dark", "theme-light");
    root.classList.add(`theme-${resolvedMode}`);
  }, [resolvedMode, accent, mounted]);

  const setMode = useCallback((m: ThemeMode) => {
    setModeState(m);
    localStorage.setItem("theme-mode", m);
  }, []);

  const setAccent = useCallback((a: AccentColor) => {
    setAccentState(a);
    localStorage.setItem("theme-accent", a);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ mode, resolvedMode, accent, setMode, setAccent }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/* ── Theme Toggle Component ─────────────────────────────────── */
export function ThemeToggle() {
  const { mode, setMode, accent, setAccent } = useTheme();
  const [open, setOpen] = useState(false);

  const modes: { value: ThemeMode; label: string; icon: ReactNode }[] = [
    {
      value: "dark",
      label: "Dark",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      ),
    },
    {
      value: "light",
      label: "Light",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      ),
    },
    {
      value: "system",
      label: "System",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <path d="M8 21h8M12 17v4" />
        </svg>
      ),
    },
  ];

  const accents: { value: AccentColor; color: string }[] = [
    { value: "amber", color: "#F5A623" },
    { value: "blue", color: "#3B82F6" },
    { value: "emerald", color: "#10B981" },
    { value: "rose", color: "#F43F5E" },
    { value: "violet", color: "#8B5CF6" },
    { value: "cyan", color: "#06B6D4" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-9 h-9 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all duration-300 cursor-pointer"
        aria-label="Theme settings"
        aria-expanded={open}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-12 z-50 w-56 rounded-xl bg-surface-elevated border border-border shadow-2xl p-3 space-y-3">
            {/* Mode */}
            <div>
              <p className="text-[11px] font-semibold text-text-muted uppercase tracking-widest mb-2 px-1">
                Mode
              </p>
              <div className="flex gap-1">
                {modes.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      mode === m.value
                        ? "bg-accent text-base"
                        : "bg-surface text-text-secondary hover:text-text-primary hover:bg-border"
                    }`}
                  >
                    {m.icon}
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <p className="text-[11px] font-semibold text-text-muted uppercase tracking-widest mb-2 px-1">
                Accent
              </p>
              <div className="flex gap-2 justify-center">
                {accents.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setAccent(a.value)}
                    className={`w-7 h-7 rounded-full transition-all cursor-pointer ring-offset-2 ring-offset-surface-elevated ${
                      accent === a.value ? "ring-2 ring-current scale-110" : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: a.color, color: a.color }}
                    aria-label={`${a.value} accent color`}
                  />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
