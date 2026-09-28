import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  radius: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  opacity: number;
  phase: number;
  phaseSpeed: number;
  wanderRadius: number;
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const dotsRef = useRef<Dot[]>([]);
  const isDarkRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const getIsDark = () =>
      document.documentElement.classList.contains("dark");

    const getDotColor = () =>
      isDarkRef.current ? "rgba(139, 143, 163," : "rgba(120, 113, 108,";

    const createDots = (width: number, height: number): Dot[] => {
      const area = width * height;
      const density = 0.00006;
      const count = Math.min(Math.max(Math.floor(area * density), 40), 110);

      const dots: Dot[] = [];
      for (let i = 0; i < count; i++) {
        const baseX = Math.random() * width;
        const baseY = Math.random() * height;
        dots.push({
          x: baseX,
          y: baseY,
          baseX,
          baseY,
          radius: 0.8 + Math.random() * 2.2,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          opacity: 0.05 + Math.random() * 0.18,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.0008 + Math.random() * 0.0018,
          wanderRadius: 8 + Math.random() * 22,
        });
      }
      return dots;
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dotsRef.current = createDots(width, height);
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      isDarkRef.current = getIsDark();
      const dotColor = getDotColor();

      ctx.clearRect(0, 0, width, height);

      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        dot.phase += dot.phaseSpeed;

        dot.x += dot.vx;
        dot.y += dot.vy;

        const driftX = Math.cos(dot.phase) * dot.wanderRadius * 0.02;
        const driftY = Math.sin(dot.phase * 0.8) * dot.wanderRadius * 0.02;
        dot.x += driftX;
        dot.y += driftY;

        const distFromBaseX = dot.x - dot.baseX;
        const distFromBaseY = dot.y - dot.baseY;
        const distFromBase = Math.sqrt(
          distFromBaseX * distFromBaseX + distFromBaseY * distFromBaseY
        );

        if (distFromBase > dot.wanderRadius) {
          const pullStrength = 0.008;
          dot.x -= distFromBaseX * pullStrength;
          dot.y -= distFromBaseY * pullStrength;
        }

        if (dot.x < -20) dot.x = width + 20;
        if (dot.x > width + 20) dot.x = -20;
        if (dot.y < -20) dot.y = height + 20;
        if (dot.y > height + 20) dot.y = -20;

        const pulseOpacity =
          dot.opacity * (0.75 + 0.25 * Math.sin(dot.phase * 1.6));

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${dotColor}${pulseOpacity.toFixed(3)})`;
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleThemeChange = () => {
      isDarkRef.current = getIsDark();
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    resize();
    isDarkRef.current = getIsDark();
    animate();

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="animated-bg" aria-hidden="true">
      <canvas ref={canvasRef} className="animated-bg-canvas" />
    </div>
  );
}
