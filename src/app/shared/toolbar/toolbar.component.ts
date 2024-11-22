import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer } from '@angular/platform-browser';

const FONT_SIZE_RESET_ICON =
  `
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18.647 19H15.6597L14.4722 15.9106H9.03564L7.91309 19H5L10.2974 5.39941H13.2012L18.647 19ZM13.5908 13.6191L11.7168 8.57227L9.87988 13.6191H13.5908Z" fill="currentColor"/>
  </svg>
  `;

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  hidden = true;
  @Output() hasChanged: EventEmitter<any> = new EventEmitter();
  showOptions: boolean = false;

  currentFontSize: string = '16px';  // Tamanho de fonte inicial

  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
  ) {
    iconRegistry.addSvgIconLiteral('fs_reset_icon', sanitizer.bypassSecurityTrustHtml(FONT_SIZE_RESET_ICON));
  }

  ngOnInit() {
    this.applyFontSize();  // Aplica o tamanho de fonte inicial
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  drawerChange(event: any) {
    this.hasChanged.emit(event);
  }

  // Função para aplicar o tamanho de fonte ao corpo da página
  applyFontSize() {
    document.body.style.fontSize = this.currentFontSize;
  }

  // Aumentar tamanho da fonte
  increaseFontSize() {
    let currentSize = parseFloat(this.currentFontSize);
    if (currentSize < 18) {
      currentSize += 2;
      this.currentFontSize = `${currentSize}px`;
      this.applyFontSize();
    }
  }

  // Diminuir tamanho da fonte
  decreaseFontSize() {
    let currentSize = parseFloat(this.currentFontSize);
    if (currentSize > 12) {
      currentSize -= 2;
      this.currentFontSize = `${currentSize}px`;
      this.applyFontSize();
    }
  }

  // Redefinir para o tamanho de fonte padrão (16px)
  resetFontSize() {
    this.currentFontSize = '16px';
    this.applyFontSize();
  }
}
