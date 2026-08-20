import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AmbientBackgroundComponent } from '../ambient-background/ambient-background.component';

@Component({
  selector: 'app-page-shell',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, AmbientBackgroundComponent],
  template: `
    <app-ambient-background />
    <a class="skip-link" href="#main-content">Skip to main content</a>
    <app-header />
    <main id="main-content" role="main">
      <ng-content />
    </main>
    <app-footer />
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      min-height: 100vh;
    }

    main {
      position: relative;
      z-index: var(--z-content);
    }
  `]
})
export class PageShellComponent {}
