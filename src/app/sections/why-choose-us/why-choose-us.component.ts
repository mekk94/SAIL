import { Component, inject, ChangeDetectionStrategy, viewChild, ElementRef, effect, OnDestroy, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [SectionLabelComponent, SectionRevealDirective],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.scss',
})
export class WhyChooseUsComponent implements OnDestroy {
  readonly i18n = inject(TranslationService);
  private readonly platformId = inject(PLATFORM_ID);

  readonly items = () => this.i18n.tArray('whyChooseUs.items') as any[];
  readonly activeIndex = signal(0);
  
  readonly itemImages = [
    '/assets/images/why%20choose%20us/competitive_pricing.webp',
    '/assets/images/why%20choose%20us/strong_global_network.webp',
    '/assets/images/why%20choose%20us/experienced_logistics_team.webp',
    '/assets/images/why%20choose%20us/customer_focused_service.webp',
    '/assets/images/why%20choose%20us/on_time_delivery.webp'
  ];
  
  readonly sectionRef = viewChild<ElementRef>('sectionRef');
  private observer: IntersectionObserver | null = null;

  constructor() {
    effect(() => {
      const ref = this.sectionRef();
      if (isPlatformBrowser(this.platformId) && ref) {
        this.observer?.disconnect();
        
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-active');
            } else {
              entry.target.classList.remove('is-active');
            }
          });
        }, {
          rootMargin: '-45% 0px -45% 0px',
          threshold: 0
        });

        this.observer.observe(ref.nativeElement);
      }
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
