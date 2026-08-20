import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AmbientBackgroundComponent } from '../ambient-background/ambient-background.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-page-shell',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, AmbientBackgroundComponent],
  templateUrl: './page-shell.component.html',
  styleUrl: './page-shell.component.scss',
})
export class PageShellComponent {}
