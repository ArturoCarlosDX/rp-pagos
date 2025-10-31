import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

export default function CosmosParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // particles (velocidades más pequeñas por defecto)
    const particleCount = 80;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      // velocidades pequeñas y suaves para evitar salir del canvas inmediatamente
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      connections: [],
    }));

    // Mouse movimiento
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Ajuste para pantallas de alta densidad (retina)
    const dpr = window.devicePixelRatio || 1;
    // set canvas pixel size and CSS size
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(dpr, dpr);

    // Animacion
    let rafId = 0;
    const animate = () => {
      ctx.save();
      ctx.fillStyle = "hsla(240, 25%, 2%, 1.00)";
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // dpdate particles
      particles.forEach((particle, i) => {
        // Mouse attraction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 0.0001;

        if (distance < 200) {
          const force = (200 - distance) / 200;
          // proteger contra división por cero
          particle.vx += (dx / distance) * force * 15;
          particle.vy += (dy / distance) * force * 15;
        }

        // position
        particle.x += particle.vx;
        particle.y += particle.vy;

        particle.vx *= 0.99;
        particle.vy *= 0.99;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));

        //connections particle
        particles.forEach((otherParticle, j) => {
          if (i === j) return;

          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.3;
            ctx.beginPath();
            ctx.strokeStyle = `hsla(195, 100%, 60%, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });

        //particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "hsl(195, 100%, 70%)";
        ctx.fill();

        //  effecto
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          10
        );
        gradient.addColorStop(0, "hsla(195, 100%, 70%, 0.3)");
        gradient.addColorStop(1, "hsla(195, 100%, 70%, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 10, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="neural-canvas"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}
