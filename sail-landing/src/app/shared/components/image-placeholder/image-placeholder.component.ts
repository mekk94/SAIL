import { Component, input } from '@angular/core';

@Component({
  selector: 'app-image-placeholder',
  standalone: true,
  template: `
    <div class="image-placeholder" [style.aspect-ratio]="aspectRatio()" [attr.data-section]="section()">
      <div class="placeholder-inner">
        <svg class="placeholder-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="16" cy="20" r="4" stroke="currentColor" stroke-width="1.5"/>
          <path d="M4 32L16 24L28 32L36 26L44 32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="placeholder-label">{{ label() }}</span>
      </div>
      <div class="placeholder-grid" aria-hidden="true">
        @for (i of gridLines; track i) {
          <span class="grid-line"></span>
        }
      </div>
    </div>
  `,
  styles: [`
    @use 'mixins' as *;

    .image-placeholder {
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 10;
      background: linear-gradient(135deg, #1e1f23 0%, #2a2b30 50%, #1e1f23 100%);
      border-radius: var(--radius-lg);
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(196, 137, 47, 0.15);
    }

    .placeholder-inner {
      position: relative;
      z-index: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-md);
      text-align: center;
      padding: var(--space-lg);
    }

    .placeholder-icon {
      width: 48px;
      height: 48px;
      color: var(--sail-gold);
      opacity: 0.6;
    }

    .placeholder-label {
      font-size: var(--text-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--sail-gold);
      opacity: 0.8;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .placeholder-grid {
      position: absolute;
      inset: 0;
      z-index: 1;
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      opacity: 0.06;

      .grid-line {
        border-inline-end: 1px solid var(--sail-gold);
        height: 100%;
      }
    }
  `]
})
export class ImagePlaceholderComponent {
  readonly label = input('IMAGE WILL BE HERE');
  readonly aspectRatio = input('16 / 10');
  readonly section = input('');

  readonly gridLines = Array.from({ length: 8 }, (_, i) => i);
}
