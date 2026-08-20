import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-overview',
  standalone: true,
  imports: [SectionLabelComponent, SectionRevealDirective],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  readonly i18n = inject(TranslationService);
}
