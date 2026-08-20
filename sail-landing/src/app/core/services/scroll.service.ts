import { Injectable, signal, computed, inject, PLATFORM_ID, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface SectionEntry {
  id: string;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);

  readonly scrollY = signal(0);
  readonly scrollProgress = signal(0);
  readonly activeSection = signal('hero');
  readonly isScrolled = computed(() => this.scrollY() > 60);

  private ticking = false;
  private observer: IntersectionObserver | null = null;

  init(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.setupSectionObserver();
    });
  }

  destroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('scroll', this.onScroll);
    this.observer?.disconnect();
  }

  private onScroll = (): void => {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        this.scrollY.set(y);
        this.scrollProgress.set(maxScroll > 0 ? y / maxScroll : 0);
        this.ticking = false;
      });
      this.ticking = true;
    }
  };

  private setupSectionObserver(): void {
    const sectionIds = [
      'hero', 'overview', 'vision-mission', 'freight-forwarding',
      'transportation', 'bus-rental', 'customs', 'warehousing',
      'industries', 'why-choose-us', 'contact'
    ];

    this.observer = new IntersectionObserver(
      (entries) => {
        let mostVisible: { id: string; ratio: number } | null = null;
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!mostVisible || entry.intersectionRatio > mostVisible.ratio) {
              mostVisible = { id: entry.target.id, ratio: entry.intersectionRatio };
            }
          }
        });
        if (mostVisible) {
          this.ngZone.run(() => {
            this.activeSection.set(mostVisible!.id);
          });
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0, 0.1, 0.25, 0.5]
      }
    );

    // Observe with a slight delay to let DOM render
    requestAnimationFrame(() => {
      sectionIds.forEach(id => {
        const el = document.getElementById(id);
        if (el) this.observer!.observe(el);
      });
    });
  }

  scrollTo(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
