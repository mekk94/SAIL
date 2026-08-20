import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/i18n/translation.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
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
