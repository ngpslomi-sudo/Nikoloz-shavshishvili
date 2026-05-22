import { useEffect, useRef } from 'react';

interface HeartFallProps {
  themeId: string;
}

export default function HeartFall({ themeId }: HeartFallProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic configuration depending on theme
    const isDark = themeId === 'starry-night';
    const fillColors = isDark 
      ? ['rgba(139, 92, 246, 0.45)', 'rgba(167, 139, 250, 0.45)', 'rgba(236, 72, 153, 0.35)', 'rgba(192, 132, 252, 0.4)'] 
      : ['rgba(244, 63, 94, 0.6)', 'rgba(251, 113, 133, 0.65)', 'rgba(244, 114, 182, 0.55)', 'rgba(253, 164, 175, 0.60)'];

    const shapes = isDark ? ['heart', 'star'] : ['heart'];

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      color: string;
      shape: string;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }

    const particles: Particle[] = [];
    const maxParticles = 35;

    function createParticle(isInitial = false): Particle {
      const size = Math.random() * 12 + 8;
      return {
        x: Math.random() * width,
        y: isInitial ? Math.random() * height : -20,
        size,
        speedY: Math.random() * 1.2 + 0.6,
        speedX: Math.random() * 0.8 - 0.4,
        color: fillColors[Math.floor(Math.random() * fillColors.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: Math.random() * 0.02 - 0.01,
        opacity: Math.random() * 0.4 + 0.3,
      };
    }

    // Populate initial
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    function drawHeart(c: CanvasRenderingContext2D, x: number, y: number, size: number, color: string, rotation: number) {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.beginPath();
      // Draw heart path
      c.moveTo(0, -size / 4);
      c.bezierCurveTo(size / 2, -size, size, -size / 3, size / 10, size / 3);
      c.lineTo(0, size);
      c.lineTo(-size / 10, size / 3);
      c.bezierCurveTo(-size, -size / 3, -size / 2, -size, 0, -size / 4);
      c.fillStyle = color;
      c.fill();
      c.restore();
    }

    function drawStar(c: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string, rotation: number) {
      c.save();
      c.translate(cx, cy);
      c.rotate(rotation);
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      c.beginPath();
      c.moveTo(0, -outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = Math.cos(rot) * outerRadius;
        y = Math.sin(rot) * outerRadius;
        c.lineTo(x, y);
        rot += step;

        x = Math.cos(rot) * innerRadius;
        y = Math.sin(rot) * innerRadius;
        c.lineTo(x, y);
        rot += step;
      }
      c.lineTo(0, -outerRadius);
      c.closePath();
      c.fillStyle = color;
      c.fill();
      c.restore();
    }

    function update() {
      ctx!.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.shape === 'heart') {
          drawHeart(ctx!, p.x, p.y, p.size, p.color, p.rotation);
        } else {
          drawStar(ctx!, p.x, p.y, 5, p.size, p.size / 2, p.color, p.rotation);
        }

        // Loop if offscreen
        if (p.y > height + 20) {
          particles[i] = createParticle(false);
        }
      }

      animationFrameId = requestAnimationFrame(update);
    }

    update();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [themeId]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
}
