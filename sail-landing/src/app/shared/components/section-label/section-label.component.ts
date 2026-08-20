import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-label',
  standalone: true,
  template: `
    <div class="section-label">
      @if (number()) {
        <span class="section-number">{{ number() }}</span>
      }
      <span class="section-label-text">{{ label() }}</span>
      <span class="section-label-line" aria-hidden="true"></span>
    </div>
  `,
  styles: [`
    .section-label {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      margin-block-end: var(--space-lg);
    }

    .section-number {
      font-size: var(--text-4xl);
      font-weight: var(--font-weight-bold);
      color: var(--sail-gold);
      opacity: 0.15;
      line-height: 1;
      letter-spacing: -0.02em;
      user-select: none;
    }

    .section-label-text {
      font-size: var(--text-xs);
      font-weight: var(--font-weight-semibold);
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--sail-gold);
    }

    .section-label-line {
      flex: 1;
      max-width: 80px;
      height: 1px;
      background: var(--sail-gold);
      opacity: 0.3;
    }
  `]
})
export class SectionLabelComponent {
  readonly label = input.required<string>();
  readonly number = input<string>('');
}
