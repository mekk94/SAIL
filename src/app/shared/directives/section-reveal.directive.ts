import { Directive, ElementRef, inject, OnInit, OnDestroy, PLATFORM_ID, input, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appSectionReveal]',
  standalone: true
})
export class SectionRevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly ngZone = inject(NgZone);
  private observer: IntersectionObserver | null = null;

  readonly revealClass = input('sail-reveal');
  readonly revealDelay = input(0);
  readonly revealThreshold = input(0.15);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const element = this.el.nativeElement as HTMLElement;
    element.classList.add(this.revealClass());

    this.ngZone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const delay = this.revealDelay();
            if (delay > 0) {
              setTimeout(() => element.classList.add('revealed'), delay);
            } else {
              element.classList.add('revealed');
            }
            this.observer?.unobserve(element);
          }
        },
        {
          threshold: this.revealThreshold(),
          rootMargin: '0px 0px -50px 0px'
        }
      );
      this.observer.observe(element);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
