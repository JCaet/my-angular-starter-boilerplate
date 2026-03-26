import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * ShellComponent is the root layout for authenticated pages.
 * Add HeaderComponent, FooterComponent, SidebarComponent here as the app grows.
 * Wire it up in app.routes.ts as the parent route for feature routes.
 */
@Component({
  selector: 'app-shell',
  imports: [RouterOutlet],
  template: `
    <!-- TODO: add <app-header> here -->
    <main>
      <router-outlet />
    </main>
    <!-- TODO: add <app-footer> here -->
  `,
})
export class ShellComponent {}
