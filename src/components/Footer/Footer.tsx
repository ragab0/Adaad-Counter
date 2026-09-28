import { Link } from "react-router-dom";

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="border-t border-border-light/60 bg-surface-light/60 py-4 text-center text-sm dark:border-border-dark/60 dark:bg-surface-dark/80"
    >
      <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center sm:justify-between gap-2">
        <div className="rounded-2xl p-5 border border-border-light bg-surface-light shadow-sm dark:border-border-dark dark:bg-surface-dark">
          <h3 className="text-md mt-2 text-text-muted-light italic dark:text-text-muted-dark">
            Made with <span aria-hidden="true">❤</span>
            <span className="sr-only">love</span> for Mr Amr Talabat
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs mt-1 text-text-muted-light dark:text-text-muted-dark">
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

      <div className="sr-only" aria-hidden="true">
        <a href="https://github.com/ragab0/" target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href="https://ragab.vercel.app/" target="_blank" rel="noreferrer">
          Portfolio
        </a>
        <a
          href="http://linkedin.com/in/ragab-eid"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
