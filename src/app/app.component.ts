import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main
      class="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 text-gray-900"
    >
      <h1 class="text-brand-primary mb-4 text-4xl font-bold">Welcome to Angular 21</h1>
      <p class="text-lg">Your high-performance boilerplate is ready.</p>
      <router-outlet></router-outlet>
    </main>
  `,
})
export class AppComponent {
  title = signal('my-angular-starter-boilerplate');
}
