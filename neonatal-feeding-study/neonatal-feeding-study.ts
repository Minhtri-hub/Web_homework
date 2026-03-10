import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

type ApgarKey = 'activity' | 'pulse' | 'grimace' | 'appearance' | 'respiration';

@Component({
  selector: 'app-neonatal-feeding-study',
  standalone: false,
  templateUrl: './neonatal-feeding-study.html',
  styleUrl: './neonatal-feeding-study.css',
})
export class NeonatalFeedingStudy implements AfterViewInit {
  @ViewChild('firstNameInput') firstNameInput?: ElementRef<HTMLInputElement>;

  today = '';
  firstName = '';
  lastName = '';
  medicalRecord = '';
  dateOfBirth = '';
  physician = 'Dr.Warren Albert';
  otherPhysician = '';
  birthWeight: number | null = null;
  parentalConsent = false;

  apgarScores: Record<ApgarKey, number | null> = {
    activity: 0,
    pulse: 0,
    grimace: 0,
    appearance: 0,
    respiration: 0,
  };

  apgarErrors: Record<ApgarKey, string> = {
    activity: '',
    pulse: '',
    grimace: '',
    appearance: '',
    respiration: '',
  };

  totalScore = 0;
  otherPhysicianError = '';

  constructor() {
    this.today = this.formatDateDDMMYYYY(new Date());
    this.calculateTotal();
  }

  ngAfterViewInit(): void {
    this.firstNameInput?.nativeElement.focus();
  }

  validateApgar(field: ApgarKey): void {
    const value = this.apgarScores[field];

    if (value === null || Number.isNaN(value)) {
      this.apgarErrors[field] = '';
      this.calculateTotal();
      return;
    }

    if (value < 0 || value > 2) {
      this.apgarErrors[field] = 'Apgar score must be from 0 to 2.';
      return;
    }

    this.apgarErrors[field] = '';
    this.calculateTotal();
  }

  onPhysicianBlur(): void {
    if (this.physician === 'other' && !this.otherPhysician.trim()) {
      this.otherPhysicianError = 'Please input physician name.';
      alert('Please input physician name.');
      return;
    }

    this.otherPhysicianError = '';
  }

  submitForm(): void {
    this.onPhysicianBlur();
    if (this.otherPhysicianError) {
      return;
    }

    alert('Form submitted.');
  }

  reloadPage(): void {
    window.location.reload();
  }

  private calculateTotal(): void {
    this.totalScore = Object.values(this.apgarScores).reduce<number>((sum, val) => {
      if (val === null || Number.isNaN(val) || val < 0 || val > 2) {
        return sum;
      }
      return sum + val;
    }, 0);
  }

  private formatDateDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
