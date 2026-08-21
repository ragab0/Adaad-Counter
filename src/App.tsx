import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { CounterProvider, useCounterContext } from "@/context/CounterContext";
import { CharacterReactionProvider } from "@/context/CharacterReactionContext";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import { About } from "@/pages/About/About";
import { GeneralSettings } from "@/components/GeneralSettings/GeneralSettings";
import { FloatingMode } from "@/components/FloatingMode/FloatingMode";
import { MascotMood } from "@/components/MascotMood/MascotMood";

function AppContent() {
  const { settings } = useCounterContext();
  const [settingsOpen, setSettingsOpen] = useState(false);

  if (settings.floatingMode) {
    return (
      <div className="min-h-screen bg-slate-100/50 dark:bg-[#424250]">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center">
          <p className="text-sm text-slate-400 dark:text-slate-500">
            Floating mode is on — drag the small window.
          </p>
          <button
            onClick={() => setSettingsOpen(true)}
            className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-600 dark:border-slate-700 dark:bg-background dark:text-slate-300"
          >
            Settings
          </button>
        </div>
        <FloatingMode onExit={() => {}} />
        <GeneralSettings
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header onOpenSettings={() => setSettingsOpen(true)} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <MascotMood />
      <Footer />
      <GeneralSettings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <CounterProvider>
      <CharacterReactionProvider>
        <HashRouter>
          <AppContent />
        </HashRouter>
      </CharacterReactionProvider>
    </CounterProvider>
  );
}
