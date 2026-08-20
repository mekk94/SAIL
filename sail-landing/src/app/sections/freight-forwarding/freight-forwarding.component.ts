import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-freight-forwarding',
  standalone: true,
  imports: [SectionLabelComponent, SectionRevealDirective],
  templateUrl: './freight-forwarding.component.html',
  styleUrl: './freight-forwarding.component.scss',
})
export class FreightForwardingComponent {
  readonly i18n = inject(TranslationService);
  readonly activeIndex = signal(0);

  readonly services = () => this.i18n.tArray('freightForwarding.services') as any[];

  padIndex(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
