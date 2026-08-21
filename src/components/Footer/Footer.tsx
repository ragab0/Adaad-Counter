import { Link } from "react-router-dom";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-slate-200/60 bg-white/60 py-4 text-center text-sm dark:border-slate-800/60 dark:bg-background/90"
    >
      <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center sm:justify-between gap-2">
        <div className="rounded-2xl p-5 border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-background">
          <h3 className="text-md mt-2 text-slate-400 dark:text-slate-500 italic">
            Made with <span aria-hidden="true">❤</span>
            <span className="sr-only">love</span> for Mr Amr Talabat
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs mt-1 text-slate-400 dark:text-slate-500">
            بنعد... والباقي على الله.
          </p>
          <Link
            to="/about"
            className="font-extrabold text-brand-600 hover:underline dark:text-brand-400"
          >
            عداد معامل © {CURRENT_YEAR}
          </Link>
        </div>
      </div>
    </footer>
  );
}
