import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { ImagePlaceholderComponent } from '../../shared/components/image-placeholder/image-placeholder.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  selector: 'app-customs',
  standalone: true,
  imports: [SectionLabelComponent, ImagePlaceholderComponent, SectionRevealDirective],
  template: `
    <section id="customs" class="customs section">
      <div class="customs__container">
        <div class="customs__content" appSectionReveal>
          <div class="customs__panel">
            <app-section-label
              [label]="i18n.t('customs.label')"
              [number]="i18n.t('customs.number')"
            />

            <h2 class="customs__title">{{ i18n.t('customs.title') }}</h2>
            <p class="customs__subtitle">{{ i18n.t('customs.subtitle') }}</p>

            <div class="customs__services">
              @for (service of services(); track service.title; let i = $index) {
                <div class="customs__service">
                  <div class="customs__service-step" aria-hidden="true">
                    <span class="customs__step-number">{{ i + 1 }}</span>
                    @if (i < services().length - 1) {
                      <span class="customs__step-line"></span>
                    }
                  </div>
                  <div class="customs__service-body">
                    <h3 class="customs__service-title">{{ service.title }}</h3>
                    <p class="customs__service-desc">{{ service.description }}</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <div class="customs__image" appSectionReveal [revealDelay]="200" revealClass="sail-reveal-end">
          <app-image-placeholder
            label="IMAGE WILL BE HERE"
            aspectRatio="3 / 4"
            section="customs"
          />
        </div>
      </div>
    </section>
  `,
  styles: [`
    @use 'mixins' as *;

    .customs {
      position: relative;
    }

    .customs__container {
      @include container;
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-xl);

      @include laptop {
        grid-template-columns: 1.1fr 0.9fr;
        gap: var(--space-2xl);
        align-items: center;
      }
    }

    .customs__panel {
      @include floating-panel;
      padding: var(--space-xl);

      @include laptop {
        padding: var(--space-2xl);
        margin-inline-end: calc(var(--space-xl) * -1);
        position: relative;
        z-index: 2;
      }
    }

    .customs__title {
      @include heading-sm;
      margin-block-end: var(--space-xs);
    }

    .customs__subtitle {
      @include body-base;
      margin-block-end: var(--space-lg);
    }

    .customs__services {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .customs__service {
      display: flex;
      gap: var(--space-md);
    }

    .customs__service-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }

    .customs__step-number {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--sail-gold-subtle);
      color: var(--sail-gold);
      font-size: var(--text-xs);
      font-weight: var(--font-weight-bold);
      border: 1px solid rgba(196, 137, 47, 0.2);
    }

    .customs__step-line {
      flex: 1;
      width: 1px;
      min-height: 24px;
      background: linear-gradient(to bottom, var(--sail-gold), transparent);
      opacity: 0.3;
    }

    .customs__service-body {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding-block-end: var(--space-sm);
    }

    .customs__service-title {
      font-size: var(--text-base);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-ink);
    }

    .customs__service-desc {
      font-size: var(--text-sm);
      color: var(--sail-ink-soft);
      line-height: 1.5;
    }

    .customs__image {
      border-radius: var(--radius-lg);
      overflow: hidden;
      order: -1;

      @include laptop {
        order: 0;
      }
    }
  `]
})
export class CustomsComponent {
  readonly i18n = inject(TranslationService);

  readonly services = () => this.i18n.tArray('customs.services') as any[];
}
