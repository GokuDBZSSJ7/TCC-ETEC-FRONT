import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  template: `
    <!-- <div class="loading-container">
      <mat-spinner></mat-spinner>
      <p>{{ data.message }}</p>
    </div> -->
    <div class="loader"></div>
  `,
  styles: [
    `
      // .loading-container {
      //   display: flex;
      //   flex-direction: column;
      //   align-items: center;
      //   justify-content: center;
      //   padding: 24px;

      // }
      // mat-spinner {
      //   margin-bottom: 16px;
      // }

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
    `,
  ],
})
export class LoadingSpinnerComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}