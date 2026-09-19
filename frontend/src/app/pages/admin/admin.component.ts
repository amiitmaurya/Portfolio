import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ContentService, PortfolioData } from '../../services/content.service';
import { StatsService, StatsResponse } from '../../services/stats.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
  adminUsername: string = 'admin';
  activeTab: string = 'messages';
  editorTab: string = 'personal';

  masterContent!: PortfolioData;
  stats: StatsResponse = { views: 0, downloads: 0, database: 'Loading...' };
  messages: any[] = [];
  loading: boolean = false;
  savingContent: boolean = false;
  toastMsg: string = '';

  msgPage: number = 1;
  MSGS_PER_PAGE: number = 10;

  newAchieveText: string = '';
  editingAchieveIndex: number = -1;
  editingAchieveText: string = '';
  editingExp: any = null;
  editingExpIndex: number = -1;
  editingProj: any = null;
  editingProjIndex: number = -1;

  skillCategoryKeys: string[] = ['languages', 'backend', 'frontend', 'database', 'testing', 'tools', 'concepts'];

  securityData = {
    username: 'admin',
    newPassword: ''
  };
  showNewPassword: boolean = false;

  constructor(
    private router: Router,
    private contentService: ContentService,
    private statsService: StatsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    if (!sessionStorage.getItem('admin_logged_in')) {
      this.router.navigate(['/admin-login']);
      return;
    }
    this.adminUsername = sessionStorage.getItem('admin_username') || 'admin';
    this.securityData.username = sessionStorage.getItem('admin_username') || localStorage.getItem('admin_user_id') || 'admin';

    this.contentService.content$.subscribe(data => {
      this.masterContent = JSON.parse(JSON.stringify(data));
    });

    this.fetchAnalytics();
  }

  handleLogout(): void {
    sessionStorage.removeItem('admin_logged_in');
    sessionStorage.removeItem('admin_username');
    this.router.navigate(['/admin-login']);
  }

  async fetchAnalytics(): Promise<void> {
    this.loading = true;
    this.stats = await this.statsService.getStats();

    try {
      this.messages = await firstValueFrom(this.http.get<any[]>('http://localhost:5000/api/messages'));
    } catch (e) {
      this.messages = JSON.parse(localStorage.getItem('contact_messages') || '[]');
    }

    this.loading = false;
  }

  showToast(msg: string): void {
    this.toastMsg = msg;
    setTimeout(() => {
      this.toastMsg = '';
    }, 3000);
  }

  async handleDeleteMessage(id: string): Promise<void> {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      await firstValueFrom(this.http.delete(`http://localhost:5000/api/messages/${id}`));
    } catch (e) {}

    this.messages = this.messages.filter(m => (m.id || m._id) !== id);
    localStorage.setItem('contact_messages', JSON.stringify(this.messages));
    this.showToast('Message deleted successfully!');
  }

  getPaginatedMessages(): any[] {
    const start = (this.msgPage - 1) * this.MSGS_PER_PAGE;
    return this.messages.slice(start, start + this.MSGS_PER_PAGE);
  }

  getTotalMsgPages(): number {
    return Math.ceil(this.messages.length / this.MSGS_PER_PAGE) || 1;
  }

  getPagesArray(): number[] {
    const total = this.getTotalMsgPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  formatDate(dStr: string): string {
    if (!dStr) return '';
    try {
      return new Date(dStr).toLocaleString();
    } catch (e) {
      return dStr;
    }
  }

  getMin(a: number, b: number): number {
    return Math.min(a, b);
  }

  async saveMasterContent(): Promise<void> {
    this.savingContent = true;
    const ok = await this.contentService.updateContent(this.masterContent);
    this.savingContent = false;
    if (ok) {
      this.showToast('Changes applied successfully');
    } else {
      this.showToast('Saved to local storage backup.');
    }
  }

  addAchievement(): void {
    if (!this.newAchieveText.trim()) return;
    if (!this.masterContent.keyAchievements) this.masterContent.keyAchievements = [];
    this.masterContent.keyAchievements.push(this.newAchieveText.trim());
    this.newAchieveText = '';
    this.saveMasterContent();
  }

  deleteAchievement(i: number): void {
    this.masterContent.keyAchievements.splice(i, 1);
    this.saveMasterContent();
  }

  editAchievement(i: number): void {
    this.editingAchieveIndex = i;
    this.editingAchieveText = this.masterContent.keyAchievements[i];
  }

  saveEditedAchievement(i: number): void {
    if (!this.editingAchieveText.trim()) return;
    this.masterContent.keyAchievements[i] = this.editingAchieveText.trim();
    this.editingAchieveIndex = -1;
    this.editingAchieveText = '';
    this.saveMasterContent();
  }

  cancelEditAchievement(): void {
    this.editingAchieveIndex = -1;
    this.editingAchieveText = '';
  }

  getExperiences(): any[] {
    return this.masterContent.experiences || this.masterContent.experience || [];
  }

  openNewExperience(): void {
    this.editingExpIndex = -1;
    this.editingExp = { role: '', company: '', location: 'India', period: '', bulletsText: '' };
  }

  editExperience(exp: any, index: number): void {
    this.editingExpIndex = index;
    let bText = '';
    if (exp.bullets && Array.isArray(exp.bullets)) bText = exp.bullets.join('\n');
    else if (exp.bulletsText) bText = exp.bulletsText;

    this.editingExp = { ...exp, bulletsText: bText };
  }

  saveExperience(): void {
    if (!this.editingExp || !this.editingExp.role || !this.editingExp.company) return;
    const list = this.getExperiences();

    const bullets = this.editingExp.bulletsText.split('\n').filter((b: string) => b.trim().length > 0);
    const itemToSave = {
      id: this.editingExp.id || Date.now(),
      role: this.editingExp.role,
      company: this.editingExp.company,
      location: this.editingExp.location || 'India',
      period: this.editingExp.period,
      bulletsText: this.editingExp.bulletsText,
      bullets: bullets
    };

    if (this.editingExpIndex >= 0) {
      list[this.editingExpIndex] = itemToSave;
    } else {
      list.push(itemToSave);
    }

    this.masterContent.experiences = list;
    this.masterContent.experience = list;
    this.editingExp = null;
    this.saveMasterContent();
  }

  deleteExperience(i: number): void {
    const list = this.getExperiences();
    list.splice(i, 1);
    this.masterContent.experiences = list;
    this.masterContent.experience = list;
    this.saveMasterContent();
  }

  openNewProject(): void {
    this.editingProjIndex = -1;
    this.editingProj = {
      title: '',
      subtitle: '',
      category: 'Full Stack',
      badge: 'Production',
      description: '',
      featuresText: '',
      techText: 'C# .NET, SQL Server, Angular',
      githubUrl: '#',
      liveUrl: '#'
    };
  }

  editProject(proj: any, index: number): void {
    this.editingProjIndex = index;
    const techText = proj.tech ? proj.tech.join(', ') : '';
    let fText = '';
    if (proj.features && Array.isArray(proj.features)) fText = proj.features.join('\n');
    else if (proj.featuresText) fText = proj.featuresText;

    this.editingProj = { ...proj, techText, featuresText: fText };
  }

  saveProject(): void {
    if (!this.editingProj || !this.editingProj.title) return;
    const techArr = (this.editingProj.techText || '').split(',').map((t: string) => t.trim()).filter((t: string) => t.length > 0);
    const featArr = (this.editingProj.featuresText || '').split('\n').map((f: string) => f.trim()).filter((f: string) => f.length > 0);

    const itemToSave = {
      id: this.editingProj.id || Date.now(),
      title: this.editingProj.title,
      subtitle: this.editingProj.subtitle,
      category: this.editingProj.category,
      badge: this.editingProj.badge,
      description: this.editingProj.description,
      featuresText: this.editingProj.featuresText,
      features: featArr,
      tech: techArr,
      liveUrl: this.editingProj.liveUrl || '#',
      githubUrl: this.editingProj.githubUrl || '#'
    };

    if (this.editingProjIndex >= 0) {
      this.masterContent.projects[this.editingProjIndex] = itemToSave;
    } else {
      this.masterContent.projects.push(itemToSave);
    }

    this.editingProj = null;
    this.saveMasterContent();
  }

  deleteProject(i: number): void {
    this.masterContent.projects.splice(i, 1);
    this.saveMasterContent();
  }

  getSkillsJoined(key: string): string {
    if (!this.masterContent.skills || !this.masterContent.skills[key]) return '';
    return this.masterContent.skills[key].join(', ');
  }

  updateSkillsJoined(key: string, event: any): void {
    const val = event.target.value;
    const arr = val.split(',').map((s: string) => s.trim());
    if (!this.masterContent.skills) this.masterContent.skills = {};
    this.masterContent.skills[key] = arr;
  }

  addEducation(): void {
    if (!this.masterContent.education) this.masterContent.education = [];
    this.masterContent.education.push({
      id: Date.now(),
      degree: 'New Degree / Tech Certification',
      institution: 'University / Institute',
      year: '2024'
    });
    this.saveMasterContent();
  }

  deleteEducation(i: number): void {
    this.masterContent.education.splice(i, 1);
    this.saveMasterContent();
  }

  addCertification(): void {
    if (!this.masterContent.certifications) this.masterContent.certifications = [];
    this.masterContent.certifications.push({
      id: Date.now(),
      title: 'New Industry Certification',
      issuer: 'Microsoft / AWS / Coursera',
      period: '2024'
    });
    this.saveMasterContent();
  }

  deleteCertification(i: number): void {
    this.masterContent.certifications.splice(i, 1);
    this.saveMasterContent();
  }

  async handleSaveSecurity(): Promise<void> {
    if (!this.securityData.newPassword) {
      this.showToast('Please enter New Password');
      return;
    }

    localStorage.setItem('admin_password', this.securityData.newPassword);

    try {
      await firstValueFrom(
        this.http.post('http://localhost:5000/api/admin/change-password', {
          username: this.securityData.username,
          currentPassword: 'admin123',
          newPassword: this.securityData.newPassword
        })
      );
    } catch (e) {}

    this.securityData.newPassword = '';
    this.showToast('Admin Password Updated Successfully!');
  }
}
