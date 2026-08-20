import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-image-placeholder',
  standalone: true,
  templateUrl: './image-placeholder.component.html',
  styleUrl: './image-placeholder.component.scss',
})
export class ImagePlaceholderComponent {
  readonly label = input('IMAGE WILL BE HERE');
  readonly aspectRatio = input('16 / 10');
  readonly section = input('');

  readonly gridLines = Array.from({ length: 8 }, (_, i) => i);
}
