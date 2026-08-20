import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  selector: 'app-why-choose-us',
  standalone: true,
  imports: [SectionLabelComponent, SectionRevealDirective],
  template: `
    <section id="why-choose-us" class="why section">
      <div class="why__container">
        <div class="why__header" appSectionReveal>
          <app-section-label
            [label]="i18n.t('whyChooseUs.label')"
            [number]="i18n.t('whyChooseUs.number')"
          />
          <h2 class="why__title">{{ i18n.t('whyChooseUs.title') }}</h2>
        </div>

        <div class="why__timeline" appSectionReveal [revealDelay]="200" revealClass="sail-stagger">
          @for (item of items(); track item.title; let i = $index) {
            <div class="why__item" tabindex="0">
              <div class="why__item-node" aria-hidden="true">
                <span class="why__node-dot"></span>
                @if (i < items().length - 1) {
                  <span class="why__node-line"></span>
                }
              </div>
              <div class="why__item-content">
                <h3 class="why__item-title">{{ item.title }}</h3>
                <p class="why__item-desc">{{ item.description }}</p>
              </div>
            </div>
          }
        </div>

        <!-- Central identity -->
        <div class="why__identity" aria-hidden="true" appSectionReveal [revealDelay]="600" revealClass="sail-reveal-scale">
          <span class="why__identity-mark">SAIL</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @use 'mixins' as *;

    .why {
      position: relative;
    }

    .why__container {
      @include container;
      position: relative;
    }

    .why__header {
      margin-block-end: var(--space-2xl);
    }

    .why__title {
      @include heading-md;
    }

    .why__timeline {
      display: flex;
      flex-direction: column;
      gap: 0;
      max-width: 680px;

      @include laptop {
        margin-inline-start: var(--space-xl);
      }
    }

    .why__item {
      display: flex;
      gap: var(--space-lg);
      position: relative;
      cursor: default;

      &:focus-visible {
        outline: 2px solid var(--sail-gold);
        outline-offset: 4px;
        border-radius: var(--radius-sm);
      }
    }

    .why__item-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex-shrink: 0;
      padding-block-start: 4px;
    }

    .why__node-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 2.5px solid var(--sail-gold);
      background: var(--sail-white);
      flex-shrink: 0;
      transition: background var(--duration-base) var(--ease-out);

      .why__item:hover & {
        background: var(--sail-gold);
      }
    }

    .why__node-line {
      width: 1.5px;
      flex: 1;
      min-height: 24px;
      background: linear-gradient(to bottom, var(--sail-gold), rgba(196, 137, 47, 0.15));
    }

    .why__item-content {
      padding-block: var(--space-xs) var(--space-xl);
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .why__item-title {
      font-size: var(--text-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-ink);
      transition: color var(--duration-fast);

      .why__item:hover & {
        color: var(--sail-gold);
      }
    }

    .why__item-desc {
      font-size: var(--text-sm);
      color: var(--sail-ink-soft);
      line-height: 1.6;
      max-width: 480px;
    }

    .why__identity {
      display: none;
      position: absolute;
      right: var(--container-padding);
      top: 50%;
      transform: translateY(-50%);

      @include laptop {
        display: block;
      }

      [dir="rtl"] & {
        right: auto;
        left: var(--container-padding);
      }
    }

    .why__identity-mark {
      font-size: clamp(4rem, 8vw, 8rem);
      font-weight: var(--font-weight-bold);
      color: var(--sail-gold);
      opacity: 0.06;
      letter-spacing: 0.1em;
      user-select: none;
    }

    @media (prefers-reduced-motion: reduce) {
      .why__node-dot { transition: none; }
      .why__item-title { transition: none; }
    }
  `]
})
export class WhyChooseUsComponent {
  readonly i18n = inject(TranslationService);

  readonly items = () => this.i18n.tArray('whyChooseUs.items') as any[];
}
