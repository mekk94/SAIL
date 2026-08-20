import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { ImagePlaceholderComponent } from '../../shared/components/image-placeholder/image-placeholder.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [SectionLabelComponent, ImagePlaceholderComponent, SectionRevealDirective],
  template: `
    <section id="industries" class="ind section">
      <div class="ind__container">
        <div class="ind__header" appSectionReveal>
          <app-section-label
            [label]="i18n.t('industries.label')"
            [number]="i18n.t('industries.number')"
          />
          <h2 class="ind__title">{{ i18n.t('industries.title') }}</h2>
          <p class="ind__subtitle">{{ i18n.t('industries.subtitle') }}</p>
        </div>

        <div class="ind__layout">
          <!-- Industry Selector -->
          <div class="ind__selector" appSectionReveal [revealDelay]="150" revealClass="sail-stagger">
            @for (industry of industries(); track industry.name; let i = $index) {
              <button
                class="ind__item"
                [class.ind__item--active]="activeIndustry() === i"
                (click)="activeIndustry.set(i)"
                (mouseenter)="activeIndustry.set(i)"
              >
                <span class="ind__item-marker" aria-hidden="true"></span>
                <span class="ind__item-name">{{ industry.name }}</span>
              </button>
            }
          </div>

          <!-- Dynamic Image Area -->
          <div class="ind__visual" appSectionReveal [revealDelay]="300" revealClass="sail-reveal-end">
            <div class="ind__image-wrap">
              <app-image-placeholder
                label="IMAGE WILL BE HERE"
                aspectRatio="16 / 10"
                section="industries"
              />
            </div>

            @if (activeIndustryData(); as data) {
              <div class="ind__detail">
                <h3 class="ind__detail-name">{{ data.name }}</h3>
                <p class="ind__detail-desc">{{ data.description }}</p>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @use 'mixins' as *;

    .ind {
      position: relative;
    }

    .ind__container {
      @include container;
    }

    .ind__header {
      max-width: 600px;
      margin-block-end: var(--space-2xl);
    }

    .ind__title {
      @include heading-md;
      margin-block-end: var(--space-sm);
    }

    .ind__subtitle {
      @include body-lg;
    }

    .ind__layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);

      @include laptop {
        grid-template-columns: 0.4fr 0.6fr;
        gap: var(--space-2xl);
        align-items: start;
      }
    }

    .ind__selector {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .ind__item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      padding: var(--space-md) var(--space-lg);
      background: transparent;
      border: none;
      border-radius: var(--radius-md);
      cursor: pointer;
      text-align: start;
      transition: all var(--duration-base) var(--ease-out);

      &:hover {
        background: var(--sail-gold-subtle);
      }

      &--active {
        background: var(--sail-white);
        box-shadow: var(--shadow-sm);
        border: 1px solid rgba(196, 137, 47, 0.2);
      }

      &:focus-visible {
        outline: 2px solid var(--sail-gold);
        outline-offset: 2px;
      }
    }

    .ind__item-marker {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 2px solid var(--sail-border);
      flex-shrink: 0;
      transition: all var(--duration-base) var(--ease-out);

      .ind__item--active & {
        background: var(--sail-gold);
        border-color: var(--sail-gold);
      }
    }

    .ind__item-name {
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      color: var(--sail-ink-soft);
      transition: color var(--duration-fast);

      .ind__item--active & {
        color: var(--sail-ink);
        font-weight: var(--font-weight-semibold);
      }
    }

    .ind__visual {
      display: flex;
      flex-direction: column;
      gap: var(--space-lg);
    }

    .ind__image-wrap {
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .ind__detail {
      padding: var(--space-lg);
      background: var(--sail-white);
      border: 1px solid var(--sail-border);
      border-radius: var(--radius-md);
      animation: fadeInUp var(--duration-base) var(--ease-out);
    }

    .ind__detail-name {
      font-size: var(--text-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-gold);
      margin-block-end: var(--space-xs);
    }

    .ind__detail-desc {
      font-size: var(--text-sm);
      color: var(--sail-ink-soft);
      line-height: 1.6;
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      .ind__item { transition: none; }
      .ind__item-marker { transition: none; }
      .ind__detail { animation: none; }
    }
  `]
})
export class IndustriesComponent {
  readonly i18n = inject(TranslationService);
  readonly activeIndustry = signal(0);

  readonly industries = () => this.i18n.tArray('industries.items') as any[];

  readonly activeIndustryData = () => {
    const items = this.industries();
    const index = this.activeIndustry();
    return items[index] || null;
  };
}
