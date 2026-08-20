import { Component, inject, signal } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { ImagePlaceholderComponent } from '../../shared/components/image-placeholder/image-placeholder.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  selector: 'app-bus-rental',
  standalone: true,
  imports: [SectionLabelComponent, ImagePlaceholderComponent, SectionRevealDirective],
  template: `
    <section id="bus-rental" class="bus section">
      <div class="bus__container">
        <div class="bus__header" appSectionReveal>
          <app-section-label
            [label]="i18n.t('busRental.label')"
            [number]="i18n.t('busRental.number')"
          />
          <h2 class="bus__title">{{ i18n.t('busRental.title') }}</h2>
          <p class="bus__subtitle">{{ i18n.t('busRental.subtitle') }}</p>
        </div>

        <div class="bus__layout">
          <div class="bus__image" appSectionReveal [revealDelay]="150" revealClass="sail-reveal-start">
            <app-image-placeholder
              label="IMAGE WILL BE HERE"
              aspectRatio="4 / 3"
              section="bus-rental"
            />
          </div>

          <div class="bus__fleet" appSectionReveal [revealDelay]="300" revealClass="sail-stagger">
            @for (vehicle of fleet(); track vehicle.name; let i = $index) {
              <button
                class="bus__vehicle"
                [class.bus__vehicle--active]="activeFleet() === i"
                (click)="activeFleet.set(i)"
                (mouseenter)="activeFleet.set(i)"
              >
                <div class="bus__vehicle-header">
                  <h3 class="bus__vehicle-name">{{ vehicle.name }}</h3>
                  <span class="bus__vehicle-capacity">{{ vehicle.capacity }}</span>
                </div>
                @if (activeFleet() === i) {
                  <p class="bus__vehicle-desc">{{ vehicle.description }}</p>
                }
                <div class="bus__vehicle-line" aria-hidden="true"></div>
              </button>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @use 'mixins' as *;

    .bus {
      position: relative;
    }

    .bus__container {
      @include container;
    }

    .bus__header {
      max-width: 640px;
      margin-block-end: var(--space-2xl);
    }

    .bus__title {
      @include heading-md;
      margin-block-end: var(--space-sm);
    }

    .bus__subtitle {
      @include body-lg;
    }

    .bus__layout {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);

      @include laptop {
        grid-template-columns: 1fr 1fr;
        gap: var(--space-2xl);
        align-items: start;
      }
    }

    .bus__image {
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .bus__fleet {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .bus__vehicle {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      padding: var(--space-lg) var(--space-md);
      background: var(--sail-white);
      border: 1px solid var(--sail-border);
      border-radius: var(--radius-md);
      text-align: start;
      cursor: pointer;
      overflow: hidden;
      transition: border-color var(--duration-base) var(--ease-out),
                  box-shadow var(--duration-base) var(--ease-out);

      &:hover, &--active {
        border-color: rgba(196, 137, 47, 0.3);
        box-shadow: var(--shadow-sm);
      }

      &:focus-visible {
        outline: 2px solid var(--sail-gold);
        outline-offset: 2px;
      }
    }

    .bus__vehicle-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-md);
    }

    .bus__vehicle-name {
      font-size: var(--text-base);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-ink);
    }

    .bus__vehicle-capacity {
      font-size: var(--text-xs);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-gold);
      padding: 4px 12px;
      background: var(--sail-gold-subtle);
      border-radius: var(--radius-full);
      white-space: nowrap;
    }

    .bus__vehicle-desc {
      font-size: var(--text-sm);
      color: var(--sail-ink-soft);
      line-height: 1.5;
      animation: fadeIn var(--duration-base) var(--ease-out);
    }

    .bus__vehicle-line {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: var(--sail-gold);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform var(--duration-base) var(--ease-out);

      [dir="rtl"] & {
        transform-origin: right;
      }
    }

    .bus__vehicle:hover .bus__vehicle-line,
    .bus__vehicle--active .bus__vehicle-line {
      transform: scaleX(1);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      .bus__vehicle { transition: none; }
      .bus__vehicle-line { transition: none; }
      .bus__vehicle-desc { animation: none; }
    }
  `]
})
export class BusRentalComponent {
  readonly i18n = inject(TranslationService);
  readonly activeFleet = signal(0);

  readonly fleet = () => this.i18n.tArray('busRental.fleet') as any[];
}
