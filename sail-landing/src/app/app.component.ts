import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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

@Component({
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
    ContactComponent
  ],
  template: `
    <app-page-shell>
      <app-hero />
      <app-overview />
      <app-vision-mission />
      <app-freight-forwarding />
      <app-transportation />
      <app-bus-rental />
      <app-customs />
      <app-warehousing />
      <app-industries />
      <app-why-choose-us />
      <app-contact />
    </app-page-shell>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly scrollService = inject(ScrollService);

  ngOnInit(): void {
    this.scrollService.init();
  }

  ngOnDestroy(): void {
    this.scrollService.destroy();
  }
}
