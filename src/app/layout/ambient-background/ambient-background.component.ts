import { Component, ElementRef, viewChild, OnInit, OnDestroy, inject, PLATFORM_ID, NgZone, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../core/services/scroll.service';

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  isGold: boolean;
  pulsePhase: number;
}

interface RouteLine {
  from: number;
  to: number;
  progress: number;
  speed: number;
}

interface Particle {
  x: number;
  y: number;
  routeIndex: number;
  t: number;
  speed: number;
  size: number;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-ambient-background',
  standalone: true,
  templateUrl: './ambient-background.component.html',
  styleUrl: './ambient-background.component.scss',
})
export class AmbientBackgroundComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private readonly scrollService = inject(ScrollService);

  readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('bgCanvas');

  private ctx: CanvasRenderingContext2D | null = null;
  private animationId = 0;
  private width = 0;
  private height = 0;
  private nodes: Node[] = [];
  private routes: RouteLine[] = [];
  private particles: Particle[] = [];
  private mouseX = -1;
  private mouseY = -1;
  private time = 0;
  private prefersReducedMotion = false;
  private resizeObserver: ResizeObserver | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      requestAnimationFrame(() => this.setup());
    });
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onTouchMove);
    window.removeEventListener('touchstart', this.onTouchMove);
    window.removeEventListener('touchend', this.onTouchEnd);
    this.resizeObserver?.disconnect();
  }

  private setup(): void {
    const canvasEl = this.canvasRef()?.nativeElement;
    if (!canvasEl) return;

    this.ctx = canvasEl.getContext('2d');
    if (!this.ctx) return;

    this.resize(canvasEl);

    this.resizeObserver = new ResizeObserver(() => this.resize(canvasEl));
    this.resizeObserver.observe(document.body);

    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('touchmove', this.onTouchMove, { passive: true });
    window.addEventListener('touchstart', this.onTouchMove, { passive: true });
    window.addEventListener('touchend', this.onTouchEnd, { passive: true });

    this.generateNetwork();
    this.animate();
  }

  private resize(canvas: HTMLCanvasElement): void {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;
    canvas.style.width = `${this.width}px`;
    canvas.style.height = `${this.height}px`;
    this.ctx?.scale(dpr, dpr);
    this.generateNetwork();
  }

  private generateNetwork(): void {
    // Ensure at least 15 nodes on mobile, cap at 40
    const nodeCount = Math.max(15, Math.min(Math.floor((this.width * this.height) / 30000), 40));
    this.nodes = [];
    this.routes = [];
    this.particles = [];

    // Create nodes distributed across the canvas
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height; // just the viewport
      this.nodes.push({
        x, y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.1,
        radius: 1.5 + Math.random() * 2,
        isGold: Math.random() < 0.25,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    const maxDim = Math.max(this.width, this.height);

    // Create route connections (connect nearby nodes)
    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].baseX - this.nodes[j].baseX;
        const dy = this.nodes[i].baseY - this.nodes[j].baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDim * 0.25 && Math.random() < 0.35) {
          this.routes.push({
            from: i,
            to: j,
            progress: 1,
            speed: 0.001 + Math.random() * 0.002
          });
        }
      }
    }

    // Create traveling particles
    const particleCount = Math.min(this.routes.length, 12);
    for (let i = 0; i < particleCount; i++) {
      const routeIndex = Math.floor(Math.random() * this.routes.length);
      this.particles.push({
        x: 0, y: 0,
        routeIndex,
        t: Math.random(),
        speed: 0.0008 + Math.random() * 0.0015,
        size: 1.5 + Math.random() * 1.5
      });
    }
  }

  private onMouseMove = (e: MouseEvent): void => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  private onTouchMove = (e: TouchEvent): void => {
    if (e.touches.length > 0) {
      this.mouseX = e.touches[0].clientX;
      this.mouseY = e.touches[0].clientY;
    }
  };

  private onTouchEnd = (): void => {
    this.mouseX = -1;
    this.mouseY = -1;
  };

  private animate = (): void => {
    this.time += 0.016;
    this.draw();
    this.animationId = requestAnimationFrame(this.animate);
  };

  private draw(): void {
    if (!this.ctx) return;
    const ctx = this.ctx;

    ctx.clearRect(0, 0, this.width, this.height);

    // Draw ambient rotating arcs (radar/compass theme)
    const maxDim = Math.max(this.width, this.height);

    ctx.save();
    ctx.translate(this.width * 0.85, this.height * 0.3);
    ctx.rotate(this.time * 0.05);
    ctx.beginPath();
    ctx.arc(0, 0, maxDim * 0.25, 0, Math.PI * 1.2);
    ctx.strokeStyle = 'rgba(196, 137, 47, 0.08)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.rotate(Math.PI / 4 + this.time * -0.08);
    ctx.beginPath();
    ctx.arc(0, 0, maxDim * 0.22, 0, Math.PI * 0.8);
    ctx.strokeStyle = 'rgba(196, 137, 47, 0.1)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.rotate(Math.PI / 2 + this.time * 0.1);
    ctx.beginPath();
    ctx.arc(0, 0, maxDim * 0.19, 0, Math.PI * 1.5);
    ctx.strokeStyle = 'rgba(196, 137, 47, 0.12)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.translate(this.width * 0.1, this.height * 0.8);
    ctx.rotate(this.time * -0.04);
    ctx.beginPath();
    ctx.arc(0, 0, maxDim * 0.3, 0, Math.PI * 0.7);
    ctx.strokeStyle = 'rgba(196, 137, 47, 0.06)';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();

    // Draw grid
    ctx.strokeStyle = 'rgba(196, 137, 47, 0.06)';
    ctx.lineWidth = 0.5;
    const gridSize = 80;
    for (let x = 0; x < this.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.height);
      ctx.stroke();
    }
    for (let y = 0; y < this.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.width, y);
      ctx.stroke();
    }

    // Update and draw route lines
    for (const route of this.routes) {
      const from = this.nodes[route.from];
      const to = this.nodes[route.to];

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(196, 137, 47, 0.15)';
      ctx.lineWidth = 0.5;

      // Curved route
      const midX = (from.x + to.x) / 2 + Math.sin(this.time * 0.3) * 10;
      const midY = (from.y + to.y) / 2;

      ctx.moveTo(from.x, from.y);
      ctx.quadraticCurveTo(midX, midY, to.x, to.y);
      ctx.stroke();
    }

    // Update and draw nodes
    for (const node of this.nodes) {
      // Subtle drift
      node.x = node.baseX + Math.sin(this.time * 0.5 + node.pulsePhase) * 3;
      const nodeY = node.y + Math.cos(this.time * 0.3 + node.pulsePhase) * 2;

      // Mouse interaction
      let mouseInfluence = 0;
      if (this.mouseX >= 0) {
        const dx = node.x - this.mouseX;
        const dy = nodeY - this.mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          mouseInfluence = 1 - dist / 200;
        }
      }

      const pulse = node.isGold
        ? 0.4 + Math.sin(this.time * 1.2 + node.pulsePhase) * 0.3
        : 0.15;

      const alpha = Math.min(pulse + mouseInfluence * 0.4, 1);

      // Glow for gold nodes
      if (node.isGold) {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(node.x, nodeY, 0, node.x, nodeY, node.radius * 6);
        gradient.addColorStop(0, `rgba(196, 137, 47, ${alpha * 0.15})`);
        gradient.addColorStop(1, 'rgba(196, 137, 47, 0)');
        ctx.fillStyle = gradient;
        ctx.arc(node.x, nodeY, node.radius * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      // Node dot
      ctx.beginPath();
      ctx.arc(node.x, nodeY, node.radius + mouseInfluence * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = node.isGold
        ? `rgba(196, 137, 47, ${alpha})`
        : `rgba(84, 86, 92, ${alpha})`;
      ctx.fill();
    }

    // Update and draw particles
    for (const particle of this.particles) {
      particle.t += particle.speed;
      if (particle.t > 1) particle.t = 0;

      const route = this.routes[particle.routeIndex];
      if (!route) continue;

      const from = this.nodes[route.from];
      const to = this.nodes[route.to];

      // Quadratic bezier interpolation
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      const t = particle.t;
      const u = 1 - t;

      particle.x = u * u * from.x + 2 * u * t * midX + t * t * to.x;
      particle.y = u * u * from.y + 2 * u * t * midY + t * t * to.y;

      if (particle.y < -50 || particle.y > this.height + 50) continue;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(196, 137, 47, ${0.3 + Math.sin(t * Math.PI) * 0.4})`;
      ctx.fill();
    }
  }
}
