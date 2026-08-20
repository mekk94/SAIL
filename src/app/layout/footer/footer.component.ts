import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly i18n = inject(TranslationService);
  private readonly scrollService = inject(ScrollService);

  scrollTo(event: Event, id: string): void {
    event.preventDefault();
    this.scrollService.scrollTo(id);
  }
}
