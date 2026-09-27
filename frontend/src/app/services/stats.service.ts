import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface StatsResponse {
  views: number;
  downloads: number;
  database: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'https://amitmaurya.runasp.net/api/stats';

  constructor(private http: HttpClient) {}

  public async getStats(): Promise<StatsResponse> {
    const localViews = parseInt(localStorage.getItem('profile_views') || '0', 10);
    const localDownloads = parseInt(localStorage.getItem('resume_downloads') || '0', 10);

    try {
      const data = await firstValueFrom(this.http.get<StatsResponse>(this.apiUrl));
      return {
        views: Math.max(localViews, data.views || 0),
        downloads: Math.max(localDownloads, data.downloads || 0),
        database: data.database || 'SQL Server PortfolioDb'
      };
    } catch (e) {
      return {
        views: localViews,
        downloads: localDownloads,
        database: 'LocalStorage Mode'
      };
    }
  }

  public async recordVisit(): Promise<number> {
    let localViews = parseInt(localStorage.getItem('profile_views') || '0', 10) + 1;
    localStorage.setItem('profile_views', localViews.toString());

    try {
      const data = await firstValueFrom(this.http.post<{ views: number }>(`${this.apiUrl}/visit`, {}));
      if (data && data.views !== undefined) {
        localStorage.setItem('profile_views', data.views.toString());
        return data.views;
      }
    } catch (e) {}

    return localViews;
  }

  public async recordDownload(): Promise<number> {
    let localDownloads = parseInt(localStorage.getItem('resume_downloads') || '0', 10) + 1;
    localStorage.setItem('resume_downloads', localDownloads.toString());

    try {
      const data = await firstValueFrom(this.http.post<{ downloads: number }>(`${this.apiUrl}/download`, {}));
      if (data && data.downloads !== undefined) {
        localStorage.setItem('resume_downloads', data.downloads.toString());
        return data.downloads;
      }
    } catch (e) {}

    return localDownloads;
  }
}
