import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer" role="contentinfo">
      <div class="footer__inner">
        <div class="footer__brand">
          <a href="#hero" class="footer__logo" (click)="scrollTo($event, 'hero')" aria-label="SAIL — Home">
            <span class="logo-mark">S</span>
            <span class="logo-name">SAIL</span>
          </a>
          <p class="footer__tagline">{{ i18n.t('footer.tagline') }}</p>
        </div>

        <nav class="footer__links" aria-label="Footer navigation">
          <a href="#overview" (click)="scrollTo($event, 'overview')">{{ i18n.t('footer.links.overview') }}</a>
          <a href="#freight-forwarding" (click)="scrollTo($event, 'freight-forwarding')">{{ i18n.t('footer.links.services') }}</a>
          <a href="#contact" (click)="scrollTo($event, 'contact')">{{ i18n.t('footer.links.contact') }}</a>
        </nav>

        <div class="footer__bottom">
          <p class="footer__copyright">{{ i18n.t('footer.copyright') }}</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    @use 'mixins' as *;

    .footer {
      background: var(--sail-ink);
      color: var(--sail-off-white);
      padding: var(--space-xl) 0 var(--space-lg);
    }

    .footer__inner {
      @include container;
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-lg);

      @include tablet {
        grid-template-columns: 1fr auto;
        align-items: start;
      }
    }

    .footer__brand {
      display: flex;
      flex-direction: column;
      gap: var(--space-sm);
    }

    .footer__logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
    }

    .logo-mark {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background: var(--sail-gold);
      color: var(--sail-white);
      font-size: 16px;
      font-weight: var(--font-weight-bold);
      border-radius: var(--radius-sm);
    }

    .logo-name {
      font-size: var(--text-lg);
      font-weight: var(--font-weight-bold);
      color: var(--sail-off-white);
      letter-spacing: 0.08em;
    }

    .footer__tagline {
      font-size: var(--text-sm);
      color: var(--sail-ink-soft);
      opacity: 0.8;
    }

    .footer__links {
      display: flex;
      gap: var(--space-lg);
      flex-wrap: wrap;

      a {
        font-size: var(--text-sm);
        color: var(--sail-ink-soft);
        text-decoration: none;
        transition: color var(--duration-fast) var(--ease-out);
        opacity: 0.8;

        &:hover {
          color: var(--sail-gold);
          opacity: 1;
        }
      }
    }

    .footer__bottom {
      grid-column: 1 / -1;
      padding-block-start: var(--space-md);
      border-top: 1px solid rgba(255, 255, 255, 0.08);
    }

    .footer__copyright {
      font-size: var(--text-xs);
      color: var(--sail-ink-soft);
      opacity: 0.5;
    }
  `]
})
export class FooterComponent {
  readonly i18n = inject(TranslationService);
  private readonly scrollService = inject(ScrollService);

  scrollTo(event: Event, id: string): void {
    event.preventDefault();
    this.scrollService.scrollTo(id);
  }
}
