import { Component, input } from '@angular/core';

/**
 * SpinnerComponent — minimal loading indicator.
 * Usage: <app-spinner size="md" />
 * Copy this folder as a template when creating new shared components.
 */
@Component({
  selector: 'app-spinner',
  template: `
    <div
      role="status"
      aria-label="Loading"
      [class]="sizeClass()"
      class="border-t-brand-primary animate-spin rounded-full border-2 border-gray-300"
    ></div>
  `,
})
export class SpinnerComponent {
  size = input<'sm' | 'md' | 'lg'>('md');

  sizeClass(): string {
    const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };
    return sizes[this.size()];
  }
}
