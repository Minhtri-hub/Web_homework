import { Component } from '@angular/core';

interface TemplateFormModel {
  fullName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  agree: boolean;
}

@Component({
  selector: 'app-template-driven-form',
  standalone: false,
  templateUrl: './template-driven-form.html',
  styleUrl: './template-driven-form.css',
})
export class TemplateDrivenForm {
  model: TemplateFormModel = {
    fullName: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
    agree: false,
  };

  submittedData?: TemplateFormModel;

  onSubmit(): void {
    this.submittedData = { ...this.model };
  }
}

