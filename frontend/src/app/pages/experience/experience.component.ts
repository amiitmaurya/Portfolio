import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, PortfolioData } from '../../services/content.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html'
})
export class ExperienceComponent implements OnInit {
  content!: PortfolioData;
  experiences: any[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe(data => {
      this.content = data;
      this.experiences = data.experience || data.experiences || [];
    });
  }

  getBulletsArray(exp: any): string[] {
    if (exp.bullets && Array.isArray(exp.bullets)) return exp.bullets;
    if (exp.bulletsText) return exp.bulletsText.split('\n').filter((b: string) => b.trim().length > 0);
    return [];
  }
}
