import { Component, OnInit, OnDestroy, inject, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { PageShellComponent } from './layout/page-shell/page-shell.component';
import { HeroComponent } from './sections/hero/hero.component';
import { OverviewComponent } from './sections/overview/overview.component';
import { VisionMissionComponent } from './sections/vision-mission/vision-mission.component';
import { FreightForwardingComponent } from './sections/freight-forwarding/freight-forwarding.component';
import { TransportationComponent } from './sections/transportation/transportation.component';
import { BusRentalComponent } from './sections/bus-rental/bus-rental.component';
import { CustomsComponent } from './sections/customs/customs.component';
import { WarehousingComponent } from './sections/warehousing/warehousing.component';
import { IndustriesComponent } from './sections/industries/industries.component';
import { WhyChooseUsComponent } from './sections/why-choose-us/why-choose-us.component';
import { ContactComponent } from './sections/contact/contact.component';
import { ScrollService } from './core/services/scroll.service';
import { AppLoadingComponent } from './shared/components/app-loading/app-loading.component';
import { TranslationService } from './core/i18n/translation.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [
    PageShellComponent,
    HeroComponent,
    OverviewComponent,
    VisionMissionComponent,
    FreightForwardingComponent,
    TransportationComponent,
    BusRentalComponent,
    CustomsComponent,
    WarehousingComponent,
    IndustriesComponent,
    WhyChooseUsComponent,
    ContactComponent,
    AppLoadingComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':leave', [
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly scrollService = inject(ScrollService);
  private readonly translationService = inject(TranslationService);
  
  readonly isLoading = signal(true);
  private initialLoad = true;

  constructor() {
    // Hide loading screen on initial load after a delay
    setTimeout(() => {
      this.isLoading.set(false);
      this.initialLoad = false;
    }, 1500);

    // Listen to language changes
    effect(() => {
      const lang = this.translationService.lang();
      
      // Do not re-trigger loading on the very first effect run (initial load)
      if (!this.initialLoad) {
        this.isLoading.set(true);
        setTimeout(() => this.isLoading.set(false), 800);
      }
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.scrollService.init();
  }

  ngOnDestroy(): void {
    this.scrollService.destroy();
  }
}
