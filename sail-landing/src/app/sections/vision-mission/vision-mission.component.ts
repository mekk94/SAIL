import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  selector: 'app-vision-mission',
  standalone: true,
  imports: [SectionRevealDirective],
  template: `
    <section id="vision-mission" class="vm section">
      <div class="vm__container">
        <!-- Vision -->
        <div class="vm__block vm__vision" appSectionReveal>
          <span class="vm__label">{{ i18n.t('visionMission.visionLabel') }}</span>
          <p class="vm__statement">{{ i18n.t('visionMission.vision') }}</p>
        </div>

        <!-- Divider -->
        <div class="vm__divider" aria-hidden="true" appSectionReveal [revealDelay]="200" revealClass="sail-reveal-scale">
          <div class="vm__line"></div>
          <div class="vm__node">
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <circle cx="12" cy="12" r="4" fill="#C4892F" opacity="0.6"/>
              <circle cx="12" cy="12" r="8" fill="none" stroke="#C4892F" stroke-width="1" opacity="0.3"/>
            </svg>
          </div>
          <div class="vm__line"></div>
        </div>

        <!-- Mission -->
        <div class="vm__block vm__mission" appSectionReveal [revealDelay]="300">
          <span class="vm__label">{{ i18n.t('visionMission.missionLabel') }}</span>
          <p class="vm__statement">{{ i18n.t('visionMission.mission') }}</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @use 'mixins' as *;

    .vm {
      position: relative;
    }

    .vm__container {
      @include container;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-xl);

      @include laptop {
        flex-direction: row;
        gap: var(--space-2xl);
      }
    }

    .vm__block {
      flex: 1;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-md);
      max-width: 500px;
    }

    .vm__label {
      font-size: var(--text-xs);
      font-weight: var(--font-weight-semibold);
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--sail-gold);
    }

    .vm__statement {
      font-size: var(--text-2xl);
      font-weight: var(--font-weight-semibold);
      line-height: 1.35;
      color: var(--sail-ink);
      text-wrap: balance;
    }

    .vm__divider {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      flex-direction: column;

      @include laptop {
        flex-direction: column;
        min-height: 120px;
      }
    }

    .vm__line {
      width: 1px;
      height: 40px;
      background: linear-gradient(to bottom, transparent, var(--sail-gold), transparent);
      opacity: 0.4;

      @include laptop {
        width: 1px;
        height: 48px;
      }
    }

    .vm__node {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
  `]
})
export class VisionMissionComponent {
  readonly i18n = inject(TranslationService);
}
