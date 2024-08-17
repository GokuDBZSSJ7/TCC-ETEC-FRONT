import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="loader"></div>
    
  `,
  styles: [
    `
      .loader {
        width: 50px;
        margin: 20px;
        aspect-ratio: 1;
        border-radius: 50%;
        background: radial-gradient(farthest-side, #544e97 94%, #0000) top/8px
            8px no-repeat,
          conic-gradient(#0000 30%, #544e97);
        -webkit-mask: radial-gradient(
          farthest-side,
          #0000 calc(100% - 8px),
          #000 0
        );
        animation: l13 1s infinite linear;
      }
      @keyframes l13 {
        100% {
          transform: rotate(1turn);
        }
      }
    `
  ]
})
export class LoadingSpinnerComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
