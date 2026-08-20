import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { ImagePlaceholderComponent } from '../../shared/components/image-placeholder/image-placeholder.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-warehousing',
  standalone: true,
  imports: [SectionLabelComponent, ImagePlaceholderComponent, SectionRevealDirective],
  templateUrl: './warehousing.component.html',
  styleUrl: './warehousing.component.scss',
})
export class WarehousingComponent {
  readonly i18n = inject(TranslationService);

  readonly services = () => this.i18n.tArray('warehousing.services') as any[];
}
