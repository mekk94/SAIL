import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslationService } from '../../core/i18n/translation.service';
import { SectionLabelComponent } from '../../shared/components/section-label/section-label.component';
import { PrimaryButtonComponent } from '../../shared/components/primary-button/primary-button.component';
import { SectionRevealDirective } from '../../shared/directives/section-reveal.directive';
import { environment } from '../../../environments/environment';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SectionLabelComponent, PrimaryButtonComponent, SectionRevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
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
