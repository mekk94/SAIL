import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/i18n/translation.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header
      class="header"
      [class.header--scrolled]="scrollService.isScrolled()"
      [class.header--rtl]="i18n.isArabic()"
      role="banner"
    >
      <div class="header__inner">
        <!-- Logo -->
        <a href="#hero" class="header__logo" (click)="scrollToSection($event, 'hero')" aria-label="SAIL — Home">
          <span class="logo-mark">S</span>
          <span class="logo-text">
            <span class="logo-name">SAIL</span>
          </span>
        </a>

        <!-- Desktop Nav -->
        <nav class="header__nav" [attr.aria-label]="i18n.t('nav.menu')">
          @for (item of navItems; track item.id) {
            <a
              [href]="'#' + item.id"
              class="header__link"
              [class.header__link--active]="scrollService.activeSection() === item.id"
              (click)="scrollToSection($event, item.id)"
            >
              {{ i18n.t(item.labelKey) }}
              <span class="header__link-indicator" aria-hidden="true"></span>
            </a>
          }
        </nav>

        <!-- Actions -->
        <div class="header__actions">
          <button
            class="header__lang"
            (click)="i18n.toggleLang()"
            [attr.aria-label]="'Switch to ' + (i18n.isArabic() ? 'English' : 'Arabic')"
          >
            {{ i18n.t('nav.language') }}
          </button>

          <a
            href="#contact"
            class="header__cta"
            (click)="scrollToSection($event, 'contact')"
          >
            {{ i18n.t('nav.getQuote') }}
          </a>

          <!-- Mobile Menu Toggle -->
          <button
            class="header__burger"
            (click)="toggleMobileMenu()"
            [attr.aria-label]="mobileMenuOpen() ? i18n.t('nav.closeMenu') : i18n.t('nav.menu')"
            [attr.aria-expanded]="mobileMenuOpen()"
          >
            <span class="burger-line"></span>
            <span class="burger-line"></span>
            <span class="burger-line"></span>
          </button>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Overlay -->
    @if (mobileMenuOpen()) {
      <div class="mobile-overlay" (click)="closeMobileMenu()" role="presentation"></div>
      <nav
        class="mobile-menu"
        [class.mobile-menu--rtl]="i18n.isArabic()"
        role="navigation"
        [attr.aria-label]="i18n.t('nav.menu')"
      >
        <div class="mobile-menu__header">
          <span class="logo-mark">S</span>
          <button
            class="mobile-menu__close"
            (click)="closeMobileMenu()"
            [attr.aria-label]="i18n.t('nav.closeMenu')"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="mobile-menu__links">
          @for (item of navItems; track item.id) {
            <a
              [href]="'#' + item.id"
              class="mobile-menu__link"
              [class.mobile-menu__link--active]="scrollService.activeSection() === item.id"
              (click)="scrollToSection($event, item.id); closeMobileMenu()"
            >
              {{ i18n.t(item.labelKey) }}
            </a>
          }
        </div>

        <div class="mobile-menu__footer">
          <button class="mobile-menu__lang" (click)="i18n.toggleLang()">
            {{ i18n.t('nav.language') }}
          </button>
          <a
            href="#contact"
            class="mobile-menu__cta"
            (click)="scrollToSection($event, 'contact'); closeMobileMenu()"
          >
            {{ i18n.t('nav.getQuote') }}
          </a>
        </div>
      </nav>
    }
  `,
  styles: [`
    @use 'mixins' as *;

    .header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: var(--z-header);
      transition: all var(--duration-slow) var(--ease-out);

      &__inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: var(--container-wide);
        margin-inline: auto;
        padding: 16px var(--container-padding);
        transition: all var(--duration-slow) var(--ease-out);
      }

      // --- Top state ---
      &:not(.header--scrolled) {
        background: transparent;

        .header__inner {
          padding-block: 20px;
        }
      }

      // --- Scrolled state: floating bar ---
      &.header--scrolled {
        top: 12px;
        left: 50%;
        right: auto;
        transform: translateX(-50%);
        width: calc(100% - 48px);
        max-width: 1200px;
        background: var(--sail-overlay-light);
        border-radius: var(--radius-xl);
        border: 1px solid var(--sail-glass-border);
        box-shadow: var(--shadow-lg);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);

        .header__inner {
          padding: 10px 24px;
        }
      }
    }

    // --- Logo ---
    .header__logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      z-index: 1;
    }

    .logo-mark {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      background: var(--sail-gold);
      color: var(--sail-white);
      font-size: 18px;
      font-weight: var(--font-weight-bold);
      border-radius: var(--radius-sm);
      letter-spacing: 0;
    }

    .logo-name {
      font-size: var(--text-lg);
      font-weight: var(--font-weight-bold);
      color: var(--sail-ink);
      letter-spacing: 0.08em;
    }

    // --- Desktop Nav ---
    .header__nav {
      display: none;
      align-items: center;
      gap: 4px;

      @include laptop {
        display: flex;
      }
    }

    .header__link {
      position: relative;
      padding: 8px 14px;
      font-size: var(--text-sm);
      font-weight: var(--font-weight-medium);
      color: var(--sail-ink-soft);
      text-decoration: none;
      border-radius: var(--radius-sm);
      transition: color var(--duration-fast) var(--ease-out);
      white-space: nowrap;

      &:hover {
        color: var(--sail-ink);
      }

      &--active {
        color: var(--sail-gold);
      }

      &-indicator {
        position: absolute;
        bottom: 2px;
        left: 50%;
        transform: translateX(-50%) scaleX(0);
        width: 20px;
        height: 2px;
        background: var(--sail-gold);
        border-radius: var(--radius-full);
        transition: transform var(--duration-base) var(--ease-out);
      }

      &--active &-indicator {
        transform: translateX(-50%) scaleX(1);
      }
    }

    // --- Actions ---
    .header__actions {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      z-index: 1;
    }

    .header__lang {
      padding: 6px 14px;
      font-size: var(--text-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-ink-soft);
      border-radius: var(--radius-sm);
      transition: color var(--duration-fast) var(--ease-out),
                  background var(--duration-fast) var(--ease-out);

      &:hover {
        color: var(--sail-ink);
        background: var(--sail-gold-subtle);
      }
    }

    .header__cta {
      display: none;
      padding: 9px 22px;
      font-size: var(--text-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-white);
      background: var(--sail-gold);
      border-radius: var(--radius-full);
      text-decoration: none;
      transition: background var(--duration-base) var(--ease-out),
                  transform var(--duration-base) var(--ease-out);
      white-space: nowrap;

      &:hover {
        background: var(--sail-gold-hover);
        transform: translateY(-1px);
      }

      @include laptop {
        display: inline-flex;
      }
    }

    // --- Burger ---
    .header__burger {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 44px;
      height: 44px;
      gap: 5px;
      padding: 0;
      cursor: pointer;

      @include laptop {
        display: none;
      }

      .burger-line {
        display: block;
        width: 22px;
        height: 2px;
        background: var(--sail-ink);
        border-radius: var(--radius-full);
        transition: transform var(--duration-base) var(--ease-out);
      }
    }

    // --- Mobile Overlay ---
    .mobile-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: var(--z-mobile-menu);
      backdrop-filter: blur(4px);
      animation: fadeIn var(--duration-base) var(--ease-out);
    }

    // --- Mobile Menu ---
    .mobile-menu {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(85vw, 380px);
      background: var(--sail-white);
      z-index: calc(var(--z-mobile-menu) + 1);
      display: flex;
      flex-direction: column;
      padding: var(--space-xl);
      animation: slideInEnd var(--duration-slow) var(--ease-out);
      overflow-y: auto;

      &--rtl {
        right: auto;
        left: 0;
        animation: slideInStart var(--duration-slow) var(--ease-out);
      }

      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-block-end: var(--space-2xl);
      }

      &__close {
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--sail-ink);
        border-radius: var(--radius-sm);
        transition: background var(--duration-fast);

        svg {
          width: 24px;
          height: 24px;
        }

        &:hover {
          background: var(--sail-gold-subtle);
        }
      }

      &__links {
        display: flex;
        flex-direction: column;
        gap: 4px;
        flex: 1;
      }

      &__link {
        display: block;
        padding: 14px 16px;
        font-size: var(--text-lg);
        font-weight: var(--font-weight-medium);
        color: var(--sail-ink-soft);
        text-decoration: none;
        border-radius: var(--radius-md);
        transition: all var(--duration-fast) var(--ease-out);

        &:hover, &--active {
          color: var(--sail-gold);
          background: var(--sail-gold-subtle);
        }
      }

      &__footer {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        padding-block-start: var(--space-xl);
        border-top: 1px solid var(--sail-border);
        margin-block-start: var(--space-xl);
      }

      &__lang {
        padding: 12px;
        text-align: center;
        font-weight: var(--font-weight-semibold);
        color: var(--sail-ink-soft);
        border: 1px solid var(--sail-border);
        border-radius: var(--radius-md);
        transition: all var(--duration-fast);

        &:hover {
          border-color: var(--sail-gold);
          color: var(--sail-gold);
        }
      }

      &__cta {
        display: block;
        padding: 14px;
        text-align: center;
        font-weight: var(--font-weight-semibold);
        color: var(--sail-white);
        background: var(--sail-gold);
        border-radius: var(--radius-md);
        text-decoration: none;
        transition: background var(--duration-fast);

        &:hover {
          background: var(--sail-gold-hover);
        }
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideInEnd {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }

    @keyframes slideInStart {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }

    @media (prefers-reduced-motion: reduce) {
      .header { transition: none; }
      .header__inner { transition: none; }
      .mobile-menu, .mobile-overlay { animation: none; }
    }
  `]
})
export class HeaderComponent {
  readonly i18n = inject(TranslationService);
  readonly scrollService = inject(ScrollService);

  readonly mobileMenuOpen = signal(false);

  readonly navItems = [
    { id: 'overview', labelKey: 'nav.overview' },
    { id: 'freight-forwarding', labelKey: 'nav.services' },
    { id: 'transportation', labelKey: 'nav.transportation' },
    { id: 'bus-rental', labelKey: 'nav.busRental' },
    { id: 'customs', labelKey: 'nav.customs' },
    { id: 'warehousing', labelKey: 'nav.warehousing' },
    { id: 'industries', labelKey: 'nav.industries' },
    { id: 'contact', labelKey: 'nav.contact' }
  ];

  scrollToSection(event: Event, id: string): void {
    event.preventDefault();
    this.scrollService.scrollTo(id);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
    document.body.classList.toggle('menu-open', this.mobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    document.body.classList.remove('menu-open');
  }
}
