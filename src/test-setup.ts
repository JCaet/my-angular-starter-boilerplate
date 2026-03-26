import { TestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Guard against NG0400: Angular's CLI test runner may invoke this setup file
// once per spec file across workers, causing a double-initialization error.
try {
  TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: true },
  });
} catch {
  // Platform already initialized — safe to continue.
}
