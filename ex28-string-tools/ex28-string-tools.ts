import { Component } from '@angular/core';

@Component({
  selector: 'app-ex28-string-tools',
  standalone: false,
  templateUrl: './ex28-string-tools.html',
  styleUrl: './ex28-string-tools.css',
})
export class Ex28StringTools {
  inputText = '';
  resultText = '';

  nhapDuLieu(): void {
    this.resultText = this.inputText;
  }

  denKyTuHoa(): void {
    this.resultText = this.inputText
      .split('')
      .map((ch) => (/[a-z]/.test(ch) ? ch.toUpperCase() : ch))
      .join('');
  }

  inChuHoa(): void {
    this.resultText = this.inputText.toUpperCase();
  }

  inMoiTuTrenMoiDong(): void {
    this.resultText = this.inputText
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0)
      .join('\n');
  }

  inChuThuong(): void {
    this.resultText = this.inputText.toLowerCase();
  }

  demSoTu(): void {
    const count = this.inputText.trim() ? this.inputText.trim().split(/\s+/).length : 0;
    this.resultText = `Số từ: ${count}`;
  }

  demSoKyTuThuong(): void {
    const count = (this.inputText.match(/[a-z]/g) || []).length;
    this.resultText = `Số ký tự thường: ${count}`;
  }

  inNguyenAmPhuAm(): void {
    const letters = (this.inputText.match(/[a-z]/gi) || []).map((x) => x.toLowerCase());
    const vowels = letters.filter((c) => 'aeiouy'.includes(c));
    const consonants = letters.filter((c) => !'aeiouy'.includes(c));
    this.resultText = `Nguyên âm (${vowels.length}): ${vowels.join(' ')}\nPhụ âm (${consonants.length}): ${consonants.join(' ')}`;
  }

  openW3c(): void {
    window.open('https://www.w3schools.com/js/js_string_methods.asp', '_blank');
  }
}

