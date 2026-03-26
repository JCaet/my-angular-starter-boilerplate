import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpinnerComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SpinnerComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should default to md size', () => {
    const fixture = TestBed.createComponent(SpinnerComponent);
    expect(fixture.componentInstance.size()).toBe('md');
  });
});
