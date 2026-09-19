import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, PortfolioData } from '../../services/content.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  content!: PortfolioData;

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe(data => {
      this.content = data;
    });
  }

  isPortfolioProject(project: any): boolean {
    if (!project) return false;
    const title = (project.title || '').toLowerCase();
    const url = project.liveUrl || project.live || '';
    return (title.includes('portfolio') || project.id === 4) && url !== '#' && url.length > 0;
  }
}
