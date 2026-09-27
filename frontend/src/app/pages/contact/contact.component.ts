import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ContentService, PortfolioData } from '../../services/content.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {
  content!: PortfolioData;
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  sending: boolean = false;
  submitted: boolean = false;
  warningMessage: string = '';

  constructor(
    private contentService: ContentService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.contentService.content$.subscribe(data => {
      this.content = data;
    });
  }

  async handleSubmit(): Promise<void> {
    this.warningMessage = '';

    if (!this.formData.name?.trim() || !this.formData.email?.trim() || !this.formData.message?.trim()) {
      this.warningMessage = '⚠️ Please enter all required fields';
      return;
    }

    this.sending = true;
    const msgObj = {
      id: Date.now().toString(),
      name: this.formData.name.trim(),
      email: this.formData.email.trim(),
      subject: this.formData.subject?.trim() || 'Inquiry',
      message: this.formData.message.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      await firstValueFrom(this.http.post('https://amitmaurya.runasp.net/api/messages', msgObj));
    } catch (err) {
      console.warn('API message save fallback to localStorage');
      const stored = JSON.parse(localStorage.getItem('contact_messages') || '[]');
      stored.unshift(msgObj);
      localStorage.setItem('contact_messages', JSON.stringify(stored));
    }

    this.sending = false;
    this.submitted = true;
    this.warningMessage = '';
    this.formData = { name: '', email: '', subject: '', message: '' };

    setTimeout(() => {
      this.submitted = false;
    }, 5000);
  }
}
