import { ChangeDetectionStrategy, Component, input, model, output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  // Generic input used across the application to keep
  // form controls consistent and reusable.

  readonly id = input('');
  readonly label = input('');
  readonly placeholder = input('');
  readonly type = input<'text' | 'email' | 'password' | 'search'>('text');
  readonly disabled = input(false);
  readonly required = input(false);
  readonly autocomplete = input('off');
  readonly error = input('');
  readonly value = model('');
  valueChanged = output<string>();

  onInput(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.valueChanged.emit(element.value);
    this.value.set(element.value);
  }
}
