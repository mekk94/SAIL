import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { ScrollService } from '../../core/services/scroll.service';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../shared/components/secondary-button/secondary-button.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [PrimaryButtonComponent, SecondaryButtonComponent, SectionRevealDirective],
  template: `
    <section id="hero" class="hero">
      <div class="hero__container">
        <div class="hero__content" appSectionReveal [revealDelay]="200">
          <div class="hero__badge" aria-hidden="true">
            <span class="hero__badge-dot"></span>
            <span class="hero__badge-text">SAIL</span>
          </div>

          <h1 class="hero__headline">{{ i18n.t('hero.headline') }}</h1>

          <p class="hero__subheadline">{{ i18n.t('hero.subheadline') }}</p>

          <div class="hero__actions">
            <app-primary-button
              [label]="i18n.t('hero.ctaPrimary')"
              (clicked)="scrollTo('contact')"
            />
            <app-secondary-button
              [label]="i18n.t('hero.ctaSecondary')"
              (clicked)="scrollTo('freight-forwarding')"
            />
          </div>
        </div>

        <div class="hero__visual" appSectionReveal [revealDelay]="500" revealClass="sail-reveal-scale">
          <div class="hero__route-visual" aria-hidden="true">
            <svg viewBox="0 0 400 400" class="hero__svg">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#C4892F" stop-opacity="0.6"/>
                  <stop offset="100%" stop-color="#C4892F" stop-opacity="0.1"/>
                </linearGradient>
              </defs>
              <!-- Route arcs -->
              <path d="M50,350 Q200,50 350,200" stroke="url(#goldGrad)" stroke-width="1" fill="none" class="hero__route-path"/>
              <path d="M100,300 Q250,100 350,350" stroke="url(#goldGrad)" stroke-width="0.5" fill="none" class="hero__route-path" style="animation-delay: 0.5s"/>
              <path d="M30,200 Q150,150 300,100" stroke="url(#goldGrad)" stroke-width="0.5" fill="none" class="hero__route-path" style="animation-delay: 1s"/>
              <!-- Nodes -->
              <circle cx="50" cy="350" r="4" fill="#C4892F" opacity="0.6" class="hero__node"/>
              <circle cx="200" cy="150" r="3" fill="#C4892F" opacity="0.4" class="hero__node" style="animation-delay: 0.3s"/>
              <circle cx="350" cy="200" r="5" fill="#C4892F" opacity="0.7" class="hero__node" style="animation-delay: 0.6s"/>
              <circle cx="300" cy="100" r="3" fill="#C4892F" opacity="0.5" class="hero__node" style="animation-delay: 0.9s"/>
              <circle cx="150" cy="280" r="3" fill="#C4892F" opacity="0.3" class="hero__node" style="animation-delay: 1.2s"/>
            </svg>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="hero__scroll-indicator" aria-hidden="true">
        <div class="hero__scroll-line"></div>
      </div>
    </section>
  `,
  styles: [`
    @use 'mixins' as *;

    .hero {
      min-height: 100vh;
      display: flex;
      align-items: center;
      position: relative;
      padding-block-start: calc(var(--header-height) + var(--space-xl));
      padding-block-end: var(--space-2xl);
    }

    .hero__container {
      @include container-wide;
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
      align-items: center;

      @include laptop {
        grid-template-columns: 1.1fr 0.9fr;
      }
    }

    .hero__content {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    .hero__badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px 6px 10px;
      background: var(--sail-gold-subtle);
      border: 1px solid rgba(196, 137, 47, 0.15);
      border-radius: var(--radius-full);
      width: fit-content;
    }

    .hero__badge-dot {
      width: 8px;
      height: 8px;
      background: var(--sail-gold);
      border-radius: 50%;
      animation: goldPulse 2s ease-in-out infinite;
    }

    .hero__badge-text {
      font-size: var(--text-xs);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-gold);
      letter-spacing: 0.15em;
    }

    .hero__headline {
      @include heading-xl;
      white-space: pre-line;

      @include mobile-only {
        font-size: var(--text-4xl);
      }
    }

    .hero__subheadline {
      @include body-lg;
      max-width: 520px;
    }

    .hero__actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-md);
      padding-block-start: var(--space-sm);
    }

    // --- Visual ---
    .hero__visual {
      display: none;
      position: relative;
      aspect-ratio: 1;
      max-width: 440px;
      justify-self: center;

      @include laptop {
        display: block;
      }
    }

    .hero__route-visual {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .hero__svg {
      width: 100%;
      height: 100%;
    }

    .hero__route-path {
      stroke-dasharray: 800;
      stroke-dashoffset: 800;
      animation: routeDash 3s var(--ease-out) forwards;
    }

    .hero__node {
      animation: goldPulse 3s ease-in-out infinite;
    }

    @keyframes routeDash {
      to { stroke-dashoffset: 0; }
    }

    @keyframes goldPulse {
      0%, 100% { opacity: 0.3; transform: scale(1); }
      50% { opacity: 0.8; transform: scale(1.3); }
    }

    // --- Scroll Indicator ---
    .hero__scroll-indicator {
      position: absolute;
      bottom: var(--space-xl);
      left: 50%;
      transform: translateX(-50%);
    }

    .hero__scroll-line {
      width: 1px;
      height: 48px;
      background: linear-gradient(to bottom, var(--sail-gold), transparent);
      animation: scrollPulse 2s ease-in-out infinite;
    }

    @keyframes scrollPulse {
      0%, 100% { opacity: 0.3; transform: scaleY(1); }
      50% { opacity: 0.8; transform: scaleY(1.2); }
    }

    @media (prefers-reduced-motion: reduce) {
      .hero__route-path { stroke-dashoffset: 0; animation: none; }
      .hero__node { animation: none; opacity: 0.5; }
      .hero__badge-dot { animation: none; }
      .hero__scroll-line { animation: none; opacity: 0.5; }
    }
  `]
})
export class HeroComponent {
  readonly i18n = inject(TranslationService);
  private readonly scrollService = inject(ScrollService);

  scrollTo(sectionId: string): void {
    this.scrollService.scrollTo(sectionId);
  }
}
