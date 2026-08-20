import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { ImagePlaceholderComponent } from '../../shared/components/image-placeholder/image-placeholder.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bus-rental',
  standalone: true,
  imports: [SectionLabelComponent, ImagePlaceholderComponent, SectionRevealDirective],
  templateUrl: './bus-rental.component.html',
  styleUrl: './bus-rental.component.scss',
})
export class BusRentalComponent {
  readonly i18n = inject(TranslationService);
  readonly activeFleet = signal(0);

  readonly fleet = () => this.i18n.tArray('busRental.fleet') as any[];
}
