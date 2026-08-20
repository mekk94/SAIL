import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  template: `
    <h2 class="section-title" [class.section-title--light]="light()">
      {{ title() }}
    </h2>
  `,
  styles: [`
    .section-title {
      font-size: var(--text-3xl);
      font-weight: var(--font-weight-bold);
      line-height: 1.2;
      letter-spacing: -0.01em;
      color: var(--sail-ink);
      margin-block-end: var(--space-md);

      &--light {
        color: var(--sail-white);
      }
    }
  `]
})
export class SectionTitleComponent {
  readonly title = input.required<string>();
  readonly light = input(false);
}
