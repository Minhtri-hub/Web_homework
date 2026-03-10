import { Component } from '@angular/core';

@Component({
  selector: 'app-ex27-color-picker',
  standalone: false,
  templateUrl: './ex27-color-picker.html',
  styleUrl: './ex27-color-picker.css',
})
export class Ex27ColorPicker {
  bgR = 'FF';
  bgG = 'FF';
  bgB = 'FF';
  textR = '00';
  textG = '00';
  textB = '00';

  previewBg = '#FFFFFF';
  previewText = '#000000';
  error = '';

  hamlet = `Speak the speech, I pray you, as I pronounced it to you, trippingly on the tongue;
but if you mouth it, as many of your players do, I had as lief the town-crier spoke my lines.`;

  applyColor(): void {
    const bg = this.buildColor(this.bgR, this.bgG, this.bgB);
    const txt = this.buildColor(this.textR, this.textG, this.textB);
    if (!bg || !txt) {
      this.error = 'Each color value must be from 00 to FF.';
      return;
    }

    this.previewBg = bg;
    this.previewText = txt;
    this.error = '';
  }

  reload(): void {
    this.bgR = 'FF';
    this.bgG = 'FF';
    this.bgB = 'FF';
    this.textR = '00';
    this.textG = '00';
    this.textB = '00';
    this.previewBg = '#FFFFFF';
    this.previewText = '#000000';
    this.error = '';
  }

  private buildColor(r: string, g: string, b: string): string | null {
    const rr = r.trim().toUpperCase();
    const gg = g.trim().toUpperCase();
    const bb = b.trim().toUpperCase();
    const hexReg = /^[0-9A-F]{2}$/;
    if (!hexReg.test(rr) || !hexReg.test(gg) || !hexReg.test(bb)) {
      return null;
    }
    return `#${rr}${gg}${bb}`;
  }
}

