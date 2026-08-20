import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { ImagePlaceholderComponent } from '../../shared/components/image-placeholder/image-placeholder.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  selector: 'app-transportation',
  standalone: true,
  imports: [SectionLabelComponent, ImagePlaceholderComponent, SectionRevealDirective],
  template: `
    <section id="transportation" class="transport section">
      <div class="transport__container">
        <div class="transport__image-wrap" appSectionReveal revealClass="sail-reveal-start">
          <app-image-placeholder
            label="IMAGE WILL BE HERE"
            aspectRatio="16 / 10"
            section="transportation"
          />
        </div>

        <div class="transport__content" appSectionReveal [revealDelay]="200">
          <div class="transport__panel">
            <app-section-label
              [label]="i18n.t('transportation.label')"
              [number]="i18n.t('transportation.number')"
            />

            <h2 class="transport__title">{{ i18n.t('transportation.title') }}</h2>

            <p class="transport__subtitle">{{ i18n.t('transportation.subtitle') }}</p>

            <ul class="transport__list">
              @for (service of services(); track service) {
                <li class="transport__list-item">
                  <span class="transport__list-marker" aria-hidden="true"></span>
                  <span>{{ service }}</span>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @use 'mixins' as *;

    .transport {
      position: relative;
    }

    .transport__container {
      @include container;
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);

      @include laptop {
        grid-template-columns: 1.15fr 0.85fr;
        gap: var(--space-2xl);
        align-items: center;
      }
    }

    .transport__image-wrap {
      position: relative;
      border-radius: var(--radius-lg);
      overflow: hidden;
    }

    .transport__content {
      @include laptop {
        margin-inline-start: calc(var(--space-xl) * -1);
        position: relative;
        z-index: 2;
      }
    }

    .transport__panel {
      @include floating-panel;
      padding: var(--space-xl) var(--space-xl);
      display: flex;
      flex-direction: column;
      gap: var(--space-md);

      @include laptop {
        padding: var(--space-2xl);
      }
    }

    .transport__title {
      @include heading-sm;
    }

    .transport__subtitle {
      @include body-base;
    }

    .transport__list {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
      margin-block-start: var(--space-sm);
    }

    .transport__list-item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      font-size: var(--text-base);
      font-weight: var(--font-weight-medium);
      color: var(--sail-ink);
      padding: var(--space-sm) 0;
    }

    .transport__list-marker {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--sail-gold);
      flex-shrink: 0;
      opacity: 0.7;
    }
  `]
})
export class TransportationComponent {
  readonly i18n = inject(TranslationService);

  readonly services = () => this.i18n.tArray('transportation.services') as string[];
}
