import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContentService, PortfolioData } from '../../services/content.service';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  content!: PortfolioData;
  featuredProjects: any[] = [];

  constructor(
    private contentService: ContentService,
    private statsService: StatsService
  ) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe(data => {
      this.content = data;
      this.featuredProjects = (data.projects || []).slice(0, 3);
    });
    this.statsService.recordVisit();
  }
}
