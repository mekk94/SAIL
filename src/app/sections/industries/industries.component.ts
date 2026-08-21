import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { ImagePlaceholderComponent } from '../../shared/components/image-placeholder/image-placeholder.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-industries',
  standalone: true,
  imports: [SectionLabelComponent, ImagePlaceholderComponent, SectionRevealDirective],
  templateUrl: './industries.component.html',
  styleUrl: './industries.component.scss',
})
export class IndustriesComponent {
  readonly i18n = inject(TranslationService);
  readonly activeIndustry = signal(0);

  readonly industries = () => this.i18n.tArray('industries.items') as any[];

  readonly activeIndustryData = () => {
    const items = this.industries();
    const index = this.activeIndustry();
    return items[index] || null;
  };

  readonly itemImages = [
    'assets/images/industries/fmcg_retail.webp',
    'assets/images/industries/construction_infrastructure.webp',
    'assets/images/industries/oil_gas.webp',
    'assets/images/industries/manufacturing_industrial.webp',
    'assets/images/industries/automotive_pharmaceuticals.webp'
  ];
}
