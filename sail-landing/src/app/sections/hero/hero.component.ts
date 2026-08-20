import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { ScrollService } from '../../core/services/scroll.service';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '../../shared/components/secondary-button/secondary-button.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero',
  standalone: true,
  imports: [PrimaryButtonComponent, SecondaryButtonComponent, SectionRevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly i18n = inject(TranslationService);
  private readonly scrollService = inject(ScrollService);

  scrollTo(sectionId: string): void {
    this.scrollService.scrollTo(sectionId);
  }
}
