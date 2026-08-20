import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import en from './en.json';
import ar from './ar.json';

export type Lang = 'en' | 'ar';

const translations: Record<Lang, Record<string, any>> = { en, ar };

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly platformId = inject(PLATFORM_ID);

  readonly lang = signal<Lang>('en');
  readonly dir = computed(() => this.lang() === 'ar' ? 'rtl' : 'ltr');
  readonly isArabic = computed(() => this.lang() === 'ar');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('sail_lang') as Lang;
      if (savedLang === 'en' || savedLang === 'ar') {
        this.lang.set(savedLang);
      }
    }

    effect(() => {
      const currentLang = this.lang();
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('sail_lang', currentLang);
        const html = this.document.documentElement;
        html.setAttribute('lang', currentLang);
        html.setAttribute('dir', this.dir());
        // Update body font
        if (currentLang === 'ar') {
          this.document.body.style.fontFamily = "var(--font-arabic)";
        } else {
          this.document.body.style.fontFamily = "var(--font-primary)";
        }
      }
      // Update meta
      const metaData = this.data()['meta'] as any;
      if (metaData) {
        this.title.setTitle(metaData['title']);
        this.meta.updateTag({ name: 'description', content: metaData['description'] });
        this.meta.updateTag({ property: 'og:title', content: metaData['title'] });
        this.meta.updateTag({ property: 'og:description', content: metaData['description'] });
      }
    });
  }

  readonly data = computed(() => translations[this.lang()]);

  t(path: string): string {
    const keys = path.split('.');
    let result: any = this.data();
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return path; // fallback to key
      }
    }
    return typeof result === 'string' ? result : path;
  }

  tArray(path: string): any[] {
    const keys = path.split('.');
    let result: any = this.data();
    for (const key of keys) {
      if (result && typeof result === 'object' && key in result) {
        result = result[key];
      } else {
        return [];
      }
    }
    return Array.isArray(result) ? result : [];
  }

  toggleLang(): void {
    this.lang.set(this.lang() === 'en' ? 'ar' : 'en');
  }

  setLang(lang: Lang): void {
    this.lang.set(lang);
  }
}
