import { useEffect, useRef } from "react";

interface AnimatedGradientProps {
  className?: string;
}

export const AnimatedGradient = ({ className = "" }: AnimatedGradientProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const blobs = [
      { x: 0.3, y: 0.25, r: 0.45, color: [253, 200, 210], speedX: 0.15, speedY: 0.1 },
      { x: 0.7, y: 0.7, r: 0.5, color: [200, 215, 245], speedX: -0.12, speedY: 0.18 },
      { x: 0.5, y: 0.5, r: 0.35, color: [240, 195, 220], speedX: 0.1, speedY: -0.14 },
      { x: 0.2, y: 0.8, r: 0.3, color: [195, 220, 250], speedX: 0.18, speedY: -0.08 },
    ];

    const draw = () => {
      time += 0.003;
      const w = canvas.width;
      const h = canvas.height;

      // White base
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);

      for (const blob of blobs) {
        const cx = (blob.x + Math.sin(time * blob.speedX * 4) * 0.12) * w;
        const cy = (blob.y + Math.cos(time * blob.speedY * 4) * 0.1) * h;
        const radius = blob.r * Math.min(w, h);

        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        const [r, g, b] = blob.color;
        gradient.addColorStop(0, `rgba(${r},${g},${b},0.6)`);
        gradient.addColorStop(0.5, `rgba(${r},${g},${b},0.25)`);
        gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};
