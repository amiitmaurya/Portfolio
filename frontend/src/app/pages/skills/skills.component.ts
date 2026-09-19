import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, PortfolioData } from '../../services/content.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html'
})
export class SkillsComponent implements OnInit {
  content!: PortfolioData;

  skillCategories = [
    { title: "Programming Languages", key: "languages", icon: "💻" },
    { title: "Backend Frameworks & APIs", key: "backend", icon: "⚡" },
   

 // { title: "Frontend Development", key: "frontend", icon: "🎨" },
    { title: "Databases & Storage", key: "database", icon: "🗄️" },
    { title: "Software Testing & QA Automation", key: "testing", icon: "🧪" },
    { title: "Developer Tools & Environment", key: "tools", icon: "🛠️" },
    { title: "Architecture & Core Concepts", key: "concepts", icon: "🧠" }
  ];

  constructor(private contentService: ContentService) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe(data => {
      this.content = data;
    });
  }

  getCategorySkills(key: string): string[] {
    if (!this.content || !this.content.skills) return [];
    
    // Support fallbacks for combined key aliases
    if (key === 'testing') {
      const arr = this.content.skills.testing || this.content.skills.testingTools || [];
      if (arr.length > 0) return arr;
    }
    if (key === 'tools' && (!this.content.skills.tools || this.content.skills.tools.length === 0)) {
      return this.content.skills.testingTools || [];
    }

    return this.content.skills[key] || [];
  }
}
