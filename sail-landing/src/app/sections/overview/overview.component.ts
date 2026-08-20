import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [SectionLabelComponent, SectionRevealDirective],
  template: `
    <section id="overview" class="overview section">
      <div class="overview__container">
        <div class="overview__content" appSectionReveal>
          <app-section-label
            [label]="i18n.t('overview.label')"
            [number]="i18n.t('overview.number')"
          />

          <h2 class="overview__title">{{ i18n.t('overview.title') }}</h2>

          <div class="overview__divider" aria-hidden="true"></div>

          <p class="overview__body">{{ i18n.t('overview.body') }}</p>

          <p class="overview__tagline">{{ i18n.t('overview.tagline') }}</p>
        </div>

        <div class="overview__decoration" aria-hidden="true" appSectionReveal [revealDelay]="300" revealClass="sail-reveal-end">
          <svg viewBox="0 0 200 300" class="overview__svg">
            <path d="M100,10 Q150,80 100,150 Q50,220 100,290" stroke="#C4892F" stroke-width="1" fill="none" opacity="0.2"/>
            <circle cx="100" cy="10" r="4" fill="#C4892F" opacity="0.4"/>
            <circle cx="100" cy="150" r="3" fill="#C4892F" opacity="0.3"/>
            <circle cx="100" cy="290" r="4" fill="#C4892F" opacity="0.4"/>
          </svg>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @use 'mixins' as *;

    .overview {
      position: relative;
    }

    .overview__container {
      @include container;
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-2xl);
      align-items: center;

      @include laptop {
        grid-template-columns: 1.3fr 0.7fr;
      }
    }

    .overview__content {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .overview__title {
      @include heading-lg;
      max-width: 600px;
    }

    .overview__divider {
      width: 64px;
      height: 3px;
      background: var(--sail-gold);
      border-radius: var(--radius-full);
      margin-block: var(--space-sm);
    }

    .overview__body {
      @include body-lg;
      max-width: 600px;
    }

    .overview__tagline {
      font-size: var(--text-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-gold);
      letter-spacing: 0.06em;
      margin-block-start: var(--space-sm);
    }

    .overview__decoration {
      display: none;
      justify-self: center;
      width: 120px;
      opacity: 0.6;

      @include laptop {
        display: block;
      }
    }

    .overview__svg {
      width: 100%;
      height: auto;
    }
  `]
})
export class OverviewComponent {
  readonly i18n = inject(TranslationService);
}
