import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-vision-mission',
  standalone: true,
  imports: [SectionRevealDirective],
  templateUrl: './vision-mission.component.html',
  styleUrl: './vision-mission.component.scss',
})
export class VisionMissionComponent {
  readonly i18n = inject(TranslationService);
}
