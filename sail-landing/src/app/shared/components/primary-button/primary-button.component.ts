import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  standalone: true,
  template: `
    <button
      class="btn-primary"
      [type]="type()"
      [disabled]="disabled()"
      (click)="clicked.emit($event)"
    >
      <span class="btn-text">{{ label() }}</span>
      <span class="btn-shine" aria-hidden="true"></span>
    </button>
  `,
  styles: [`
    .btn-primary {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 32px;
      background: var(--sail-gold);
      color: var(--sail-white);
      font-size: var(--text-base);
      font-weight: var(--font-weight-semibold);
      border-radius: var(--radius-full);
      overflow: hidden;
      cursor: pointer;
      border: none;
      transition: background var(--duration-base) var(--ease-out),
                  transform var(--duration-base) var(--ease-out),
                  box-shadow var(--duration-base) var(--ease-out);

      &:hover:not(:disabled) {
        background: var(--sail-gold-hover);
        transform: translateY(-1px);
        box-shadow: var(--shadow-gold);
      }

      &:active:not(:disabled) {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }

    .btn-text {
      position: relative;
      z-index: 1;
    }

    .btn-shine {
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
      transition: left 0.6s var(--ease-out);
    }

    .btn-primary:hover .btn-shine {
      left: 100%;
    }

    @media (prefers-reduced-motion: reduce) {
      .btn-primary {
        transition: none;
      }
      .btn-shine {
        display: none;
      }
    }
  `]
})
export class PrimaryButtonComponent {
  readonly label = input.required<string>();
  readonly type = input<'button' | 'submit'>('button');
  readonly disabled = input(false);
  readonly clicked = output<Event>();
}
