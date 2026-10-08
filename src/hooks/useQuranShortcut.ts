import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const QURAN_READER_ROUTE = "/quran-reader";
export const QURAN_READER_EXIT_ROUTE = "/";

interface ShortcutKey {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  key: string;
}

const ENTER_SHORTCUT: ShortcutKey = {
  ctrl: true,
  shift: true,
  key: "k",
};

const EXIT_SHORTCUT: ShortcutKey = {
  key: "Escape",
};

function matchesShortcut(e: KeyboardEvent, shortcut: ShortcutKey): boolean {
  const ctrlMatch = shortcut.ctrl ? e.ctrlKey || e.metaKey : !shortcut.meta;
  const shiftMatch = shortcut.shift ? e.shiftKey : true;
  const altMatch = shortcut.alt ? e.altKey : true;
  const metaMatch = shortcut.meta ? e.metaKey : true;
  const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();
  return ctrlMatch && shiftMatch && altMatch && metaMatch && keyMatch;
}

export function useQuranShortcut() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isInReader = location.pathname === QURAN_READER_ROUTE;

      if (!isInReader && matchesShortcut(e, ENTER_SHORTCUT)) {
        e.preventDefault();
        navigate(QURAN_READER_ROUTE);
        return;
      }

      if (isInReader && matchesShortcut(e, EXIT_SHORTCUT)) {
        e.preventDefault();
        navigate(QURAN_READER_EXIT_ROUTE);
        return;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, location.pathname]);
}
