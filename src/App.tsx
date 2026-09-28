import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { CounterProvider } from "@/context/CounterContext";
import { CharacterReactionProvider } from "@/context/CharacterReactionContext";
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import { Dashboard } from "@/pages/Dashboard/Dashboard";
import { About } from "@/pages/About/About";
import { GeneralSettings } from "@/components/GeneralSettings/GeneralSettings";
import { MascotMood } from "@/components/MascotMood/MascotMood";
import { AnimatedBackground } from "@/components/AnimatedBackground/AnimatedBackground";

function AppContent() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <AnimatedBackground />
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
    </>
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
