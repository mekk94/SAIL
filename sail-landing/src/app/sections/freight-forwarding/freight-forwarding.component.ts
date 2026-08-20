import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  selector: 'app-freight-forwarding',
  standalone: true,
  imports: [SectionLabelComponent, SectionRevealDirective],
  template: `
    <section id="freight-forwarding" class="ff section">
      <div class="ff__container">
        <div class="ff__header" appSectionReveal>
          <app-section-label
            [label]="i18n.t('freightForwarding.label')"
            [number]="i18n.t('freightForwarding.number')"
          />
          <h2 class="ff__title">{{ i18n.t('freightForwarding.title') }}</h2>
          <p class="ff__subtitle">{{ i18n.t('freightForwarding.subtitle') }}</p>
        </div>

        <div class="ff__grid" appSectionReveal [revealDelay]="200" revealClass="sail-stagger">
          @for (service of services(); track service.title; let i = $index) {
            <div
              class="ff__item"
              [class.ff__item--active]="activeIndex() === i"
              (mouseenter)="activeIndex.set(i)"
              (focus)="activeIndex.set(i)"
              tabindex="0"
              [attr.aria-label]="service.title"
            >
              <div class="ff__item-index" aria-hidden="true">{{ padIndex(i + 1) }}</div>
              <div class="ff__item-content">
                <div class="ff__item-tag">{{ service.tag }}</div>
                <h3 class="ff__item-title">{{ service.title }}</h3>
                <p class="ff__item-desc">{{ service.description }}</p>
              </div>
              <div class="ff__item-accent" aria-hidden="true"></div>
            </div>
          }
        </div>

        <!-- Connecting route line -->
        <div class="ff__route" aria-hidden="true">
          <svg viewBox="0 0 4 400" class="ff__route-svg" preserveAspectRatio="none">
            <line x1="2" y1="0" x2="2" y2="400" stroke="#C4892F" stroke-width="1" opacity="0.12" stroke-dasharray="4 6"/>
          </svg>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @use 'mixins' as *;

    .ff {
      position: relative;
    }

    .ff__container {
      @include container;
      position: relative;
    }

    .ff__header {
      max-width: 600px;
      margin-block-end: var(--space-2xl);
    }

    .ff__title {
      @include heading-md;
      margin-block-end: var(--space-sm);
    }

    .ff__subtitle {
      @include body-lg;
    }

    .ff__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-md);

      @include tablet {
        grid-template-columns: 1fr 1fr;
      }
    }

    .ff__item {
      position: relative;
      display: flex;
      gap: var(--space-md);
      padding: var(--space-xl);
      background: var(--sail-white);
      border: 1px solid var(--sail-border);
      border-radius: var(--radius-lg);
      cursor: default;
      overflow: hidden;
      transition: border-color var(--duration-base) var(--ease-out),
                  box-shadow var(--duration-base) var(--ease-out),
                  transform var(--duration-base) var(--ease-out);

      &:hover, &--active {
        border-color: rgba(196, 137, 47, 0.3);
        box-shadow: var(--shadow-md);
        transform: translateY(-2px);
      }

      &:focus-visible {
        outline: 2px solid var(--sail-gold);
        outline-offset: 2px;
      }
    }

    .ff__item-index {
      font-size: var(--text-3xl);
      font-weight: var(--font-weight-bold);
      color: var(--sail-gold);
      opacity: 0.12;
      line-height: 1;
      flex-shrink: 0;
      min-width: 44px;
    }

    .ff__item-content {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
    }

    .ff__item-tag {
      font-size: var(--text-xs);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-gold);
      letter-spacing: 0.08em;
    }

    .ff__item-title {
      font-size: var(--text-lg);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-ink);
    }

    .ff__item-desc {
      font-size: var(--text-sm);
      color: var(--sail-ink-soft);
      line-height: 1.6;
    }

    .ff__item-accent {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--sail-gold);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform var(--duration-base) var(--ease-out);

      [dir="rtl"] & {
        transform-origin: right;
      }
    }

    .ff__item:hover .ff__item-accent,
    .ff__item--active .ff__item-accent {
      transform: scaleX(1);
    }

    .ff__route {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 4px;
      transform: translateX(-50%);
      pointer-events: none;
      display: none;

      @include tablet {
        display: block;
      }
    }

    .ff__route-svg {
      width: 100%;
      height: 100%;
    }

    @media (prefers-reduced-motion: reduce) {
      .ff__item {
        transition: none;
        &:hover { transform: none; }
      }
      .ff__item-accent { transition: none; }
    }
  `]
})
export class FreightForwardingComponent {
  readonly i18n = inject(TranslationService);
  readonly activeIndex = signal(0);

  readonly services = () => this.i18n.tArray('freightForwarding.services') as any[];

  padIndex(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
