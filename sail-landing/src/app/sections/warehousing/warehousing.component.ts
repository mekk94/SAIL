import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { ImagePlaceholderComponent } from '../../shared/components/image-placeholder/image-placeholder.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  selector: 'app-warehousing',
  standalone: true,
  imports: [SectionLabelComponent, ImagePlaceholderComponent, SectionRevealDirective],
  template: `
    <section id="warehousing" class="wh section">
      <div class="wh__container">
        <div class="wh__header" appSectionReveal>
          <app-section-label
            [label]="i18n.t('warehousing.label')"
            [number]="i18n.t('warehousing.number')"
          />
          <h2 class="wh__title">{{ i18n.t('warehousing.title') }}</h2>
          <p class="wh__subtitle">{{ i18n.t('warehousing.subtitle') }}</p>
        </div>

        <div class="wh__layout">
          <div class="wh__image" appSectionReveal [revealDelay]="100" revealClass="sail-reveal-scale">
            <app-image-placeholder
              label="IMAGE WILL BE HERE"
              aspectRatio="16 / 9"
              section="warehousing"
            />
          </div>

          <div class="wh__services" appSectionReveal [revealDelay]="250" revealClass="sail-stagger">
            @for (service of services(); track service.title; let i = $index) {
              <div class="wh__service-block">
                <div class="wh__service-icon" aria-hidden="true">
                  @switch (i) {
                    @case (0) {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M3 11h18"/><path d="M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"/></svg>
                    }
                    @case (1) {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
                    }
                    @case (2) {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    }
                    @case (3) {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M12 6v14"/></svg>
                    }
                  }
                </div>
                <div class="wh__service-text">
                  <h3 class="wh__service-title">{{ service.title }}</h3>
                  <p class="wh__service-desc">{{ service.description }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @use 'mixins' as *;

    .wh {
      position: relative;
    }

    .wh__container {
      @include container;
    }

    .wh__header {
      max-width: 600px;
      margin-block-end: var(--space-2xl);
    }

    .wh__title {
      @include heading-md;
      margin-block-end: var(--space-sm);
    }

    .wh__subtitle {
      @include body-lg;
    }

    .wh__layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);

      @include laptop {
        grid-template-columns: 1.1fr 0.9fr;
        gap: var(--space-2xl);
        align-items: start;
      }
    }

    .wh__image {
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .wh__services {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-md);

      @include tablet {
        grid-template-columns: 1fr 1fr;
      }

      @include laptop {
        grid-template-columns: 1fr;
      }
    }

    .wh__service-block {
      display: flex;
      gap: var(--space-md);
      padding: var(--space-lg);
      background: var(--sail-white);
      border: 1px solid var(--sail-border);
      border-radius: var(--radius-md);
      transition: border-color var(--duration-base) var(--ease-out),
                  box-shadow var(--duration-base) var(--ease-out);

      &:hover {
        border-color: rgba(196, 137, 47, 0.25);
        box-shadow: var(--shadow-sm);
      }
    }

    .wh__service-icon {
      width: 36px;
      height: 36px;
      flex-shrink: 0;
      color: var(--sail-gold);

      svg {
        width: 100%;
        height: 100%;
      }
    }

    .wh__service-text {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .wh__service-title {
      font-size: var(--text-base);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-ink);
    }

    .wh__service-desc {
      font-size: var(--text-sm);
      color: var(--sail-ink-soft);
      line-height: 1.5;
    }

    @media (prefers-reduced-motion: reduce) {
      .wh__service-block { transition: none; }
    }
  `]
})
export class WarehousingComponent {
  readonly i18n = inject(TranslationService);

  readonly services = () => this.i18n.tArray('warehousing.services') as any[];
}
