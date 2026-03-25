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
      { x: 0.15, y: 0.5, r: 0.45, color: [240, 120, 150], speedX: 0.12, speedY: 0.08 },
      { x: 0.8, y: 0.9, r: 0.5, color: [80, 140, 235], speedX: -0.1, speedY: 0.15 },
      { x: 0.25, y: 0.8, r: 0.3, color: [245, 150, 170], speedX: 0.08, speedY: -0.12 },
      { x: 0.75, y: 0.55, r: 0.35, color: [90, 155, 240], speedX: -0.14, speedY: -0.06 },
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
