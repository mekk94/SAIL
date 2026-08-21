import { Component, inject, ChangeDetectionStrategy, signal, OnInit, OnDestroy } from '@angular/core';
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
export class OverviewComponent implements OnInit, OnDestroy {
  readonly i18n = inject(TranslationService);
  
  readonly images = [
    'assets/images/who_we_are/who_we_are_1.webp',
    'assets/images/who_we_are/who_we_are_2.webp',
    'assets/images/who_we_are/who_we_are_3.webp'
  ];
  currentImageIndex = signal(0);
  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentImageIndex.update(index => (index + 1) % this.images.length);
    }, 3000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
