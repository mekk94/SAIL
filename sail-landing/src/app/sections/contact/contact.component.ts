import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';
import { environment } from '../../../environments/environment';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionLabelComponent, PrimaryButtonComponent, SectionRevealDirective],
  template: `
    <section id="contact" class="contact section">
      <div class="contact__container">
        <div class="contact__info" appSectionReveal>
          <app-section-label
            [label]="i18n.t('contact.label')"
            [number]="i18n.t('contact.number')"
          />
          <h2 class="contact__title">{{ i18n.t('contact.title') }}</h2>
          <p class="contact__subtitle">{{ i18n.t('contact.subtitle') }}</p>

          <div class="contact__details">
            <a href="tel:+966532023587" class="contact__detail-item" dir="ltr">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              <span>{{ i18n.t('contact.phone') }}</span>
            </a>
            <a href="mailto:BDM&#64;sail-freight.com" class="contact__detail-item" dir="ltr">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
              <span>{{ i18n.t('contact.email') }}</span>
            </a>
            <a href="https://sail-freight.com" target="_blank" rel="noopener noreferrer" class="contact__detail-item" dir="ltr">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              <span>{{ i18n.t('contact.website') }}</span>
            </a>
            <div class="contact__detail-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>{{ i18n.t('contact.location') }}</span>
            </div>
          </div>
        </div>

        <div class="contact__form-wrap" appSectionReveal [revealDelay]="200" revealClass="sail-reveal-end">
          <div class="contact__form-panel">
            @if (formStatus() === 'success') {
              <div class="contact__success" role="alert">
                <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
                  <circle cx="24" cy="24" r="20" stroke="#C4892F" stroke-width="2"/>
                  <path d="M15 24l6 6 12-12" stroke="#C4892F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p class="contact__success-text">{{ i18n.t('contact.form.success') }}</p>
              </div>
            } @else {
              <form
                [formGroup]="contactForm"
                (ngSubmit)="onSubmit()"
                novalidate
              >
                <!-- Honeypot -->
                <div class="sr-only" aria-hidden="true">
                  <label for="website">Website</label>
                  <input id="website" type="text" formControlName="honeypot" tabindex="-1" autocomplete="off"/>
                </div>

                <div class="form-grid">
                  <div class="form-field">
                    <label for="contact-name">{{ i18n.t('contact.form.name') }} <span class="required" aria-hidden="true">*</span></label>
                    <input
                      id="contact-name"
                      type="text"
                      formControlName="name"
                      [attr.aria-describedby]="showError('name') ? 'name-error' : null"
                      [attr.aria-invalid]="showError('name')"
                    />
                    @if (showError('name')) {
                      <span id="name-error" class="form-error" role="alert">{{ i18n.t('contact.form.required') }}</span>
                    }
                  </div>

                  <div class="form-field">
                    <label for="contact-company">{{ i18n.t('contact.form.company') }}</label>
                    <input
                      id="contact-company"
                      type="text"
                      formControlName="company"
                    />
                  </div>

                  <div class="form-field">
                    <label for="contact-email">{{ i18n.t('contact.form.email') }} <span class="required" aria-hidden="true">*</span></label>
                    <input
                      id="contact-email"
                      type="email"
                      formControlName="email"
                      [attr.aria-describedby]="showError('email') ? 'email-error' : null"
                      [attr.aria-invalid]="showError('email')"
                    />
                    @if (showError('email')) {
                      <span id="email-error" class="form-error" role="alert">
                        {{ contactForm.get('email')?.errors?.['required'] ? i18n.t('contact.form.required') : i18n.t('contact.form.invalidEmail') }}
                      </span>
                    }
                  </div>

                  <div class="form-field">
                    <label for="contact-phone">{{ i18n.t('contact.form.phone') }}</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      formControlName="phone"
                      dir="ltr"
                    />
                  </div>

                  <div class="form-field form-field--full">
                    <label for="contact-service">{{ i18n.t('contact.form.service') }} <span class="required" aria-hidden="true">*</span></label>
                    <select
                      id="contact-service"
                      formControlName="service"
                      [attr.aria-describedby]="showError('service') ? 'service-error' : null"
                      [attr.aria-invalid]="showError('service')"
                    >
                      <option value="" disabled>{{ i18n.t('contact.form.selectService') }}</option>
                      @for (option of serviceOptions(); track option) {
                        <option [value]="option">{{ option }}</option>
                      }
                    </select>
                    @if (showError('service')) {
                      <span id="service-error" class="form-error" role="alert">{{ i18n.t('contact.form.required') }}</span>
                    }
                  </div>

                  <div class="form-field form-field--full">
                    <label for="contact-message">{{ i18n.t('contact.form.message') }} <span class="required" aria-hidden="true">*</span></label>
                    <textarea
                      id="contact-message"
                      formControlName="message"
                      rows="4"
                      [attr.aria-describedby]="showError('message') ? 'message-error' : null"
                      [attr.aria-invalid]="showError('message')"
                    ></textarea>
                    @if (showError('message')) {
                      <span id="message-error" class="form-error" role="alert">{{ i18n.t('contact.form.required') }}</span>
                    }
                  </div>
                </div>

                @if (formStatus() === 'error') {
                  <div class="form-global-error" role="alert">
                    {{ i18n.t('contact.form.error') }}
                  </div>
                }

                <div class="form-actions">
                  <app-primary-button
                    [label]="formStatus() === 'sending' ? i18n.t('contact.form.sending') : i18n.t('contact.form.submit')"
                    type="submit"
                    [disabled]="formStatus() === 'sending'"
                  />
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    @use 'mixins' as *;

    .contact {
      position: relative;
    }

    .contact__container {
      @include container;
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-2xl);

      @include laptop {
        grid-template-columns: 0.45fr 0.55fr;
        gap: var(--space-3xl);
        align-items: start;
      }
    }

    .contact__title {
      @include heading-md;
      margin-block-end: var(--space-sm);
    }

    .contact__subtitle {
      @include body-lg;
      margin-block-end: var(--space-xl);
    }

    .contact__details {
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
    }

    .contact__detail-item {
      display: flex;
      align-items: center;
      gap: var(--space-md);
      font-size: var(--text-base);
      color: var(--sail-ink);
      text-decoration: none;
      transition: color var(--duration-fast) var(--ease-out);

      svg {
        width: 20px;
        height: 20px;
        color: var(--sail-gold);
        flex-shrink: 0;
      }

      &:hover {
        color: var(--sail-gold);
      }
    }

    .contact__form-panel {
      @include floating-panel;
      padding: var(--space-xl);

      @include laptop {
        padding: var(--space-2xl);
      }
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-md);

      @include tablet {
        grid-template-columns: 1fr 1fr;
      }
    }

    .form-field {
      display: flex;
      flex-direction: column;
      gap: 6px;

      &--full {
        @include tablet {
          grid-column: 1 / -1;
        }
      }
    }

    label {
      font-size: var(--text-sm);
      font-weight: var(--font-weight-medium);
      color: var(--sail-ink);
    }

    .required {
      color: var(--sail-gold);
    }

    input, select, textarea {
      padding: 12px 16px;
      border: 1px solid var(--sail-border);
      border-radius: var(--radius-md);
      background: var(--sail-off-white);
      font-size: var(--text-base);
      color: var(--sail-ink);
      transition: border-color var(--duration-fast) var(--ease-out),
                  box-shadow var(--duration-fast) var(--ease-out);

      &:focus {
        outline: none;
        border-color: var(--sail-gold);
        box-shadow: 0 0 0 3px rgba(196, 137, 47, 0.1);
      }

      &[aria-invalid="true"] {
        border-color: #D32F2F;
      }
    }

    textarea {
      resize: vertical;
      min-height: 100px;
    }

    select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%2354565C' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 16px center;
      padding-inline-end: 40px;

      [dir="rtl"] & {
        background-position: left 16px center;
        padding-inline-end: 16px;
        padding-inline-start: 40px;
      }
    }

    .form-error {
      font-size: var(--text-xs);
      color: #D32F2F;
      font-weight: var(--font-weight-medium);
    }

    .form-global-error {
      margin-block-start: var(--space-md);
      padding: var(--space-md);
      background: rgba(211, 47, 47, 0.05);
      border: 1px solid rgba(211, 47, 47, 0.2);
      border-radius: var(--radius-md);
      color: #D32F2F;
      font-size: var(--text-sm);
    }

    .form-actions {
      margin-block-start: var(--space-lg);
    }

    .contact__success {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: var(--space-lg);
      padding: var(--space-2xl);

      svg {
        width: 64px;
        height: 64px;
      }
    }

    .contact__success-text {
      font-size: var(--text-lg);
      font-weight: var(--font-weight-medium);
      color: var(--sail-ink);
      max-width: 360px;
    }
  `]
})
export class ContactComponent {
  readonly i18n = inject(TranslationService);
  private readonly fb = inject(FormBuilder);

  readonly formStatus = signal<FormStatus>('idle');
  private lastSubmitTime = 0;

  readonly contactForm = this.fb.group({
    name: ['', Validators.required],
    company: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    service: ['', Validators.required],
    message: ['', Validators.required],
    honeypot: ['']
  });

  readonly serviceOptions = () => this.i18n.tArray('contact.form.serviceOptions') as string[];

  showError(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control?.invalid && (control?.dirty || control?.touched));
  }

  async onSubmit(): Promise<void> {
    // Spam protection: honeypot
    if (this.contactForm.get('honeypot')?.value) return;

    // Throttle: 5 second minimum between submissions
    const now = Date.now();
    if (now - this.lastSubmitTime < 5000) return;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.formStatus.set('sending');
    this.lastSubmitTime = now;

    try {
      // EmailJS integration
      // In production, replace with actual EmailJS call:
      // await emailjs.send(
      //   environment.emailjs.serviceId,
      //   environment.emailjs.templateId,
      //   this.contactForm.value,
      //   environment.emailjs.publicKey
      // );

      // Simulated send for development
      await new Promise(resolve => setTimeout(resolve, 1500));

      this.formStatus.set('success');
      this.contactForm.reset();
    } catch {
      this.formStatus.set('error');
    }
  }
}
