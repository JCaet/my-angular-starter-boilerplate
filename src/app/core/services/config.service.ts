import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppConfig } from '../models/app-config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private http = inject(HttpClient);
  private config: AppConfig | null = null;

  async loadConfig(): Promise<void> {
    try {
      this.config = await firstValueFrom(this.http.get<AppConfig>('/config.json'));
    } catch (error) {
      console.error('Could not load application configuration:', error);
      // Default fallback in case the file is missing
      this.config = { apiUrl: 'http://localhost:3000/api' };
    }
  }

  get apiUrl(): string {
    return this.config?.apiUrl ?? '';
  }
}
