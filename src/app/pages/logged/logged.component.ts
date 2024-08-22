import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidemenuComponent } from '../../shared/sidemenu/sidemenu.component';
@Component({
  selector: 'app-logged',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MatSidenavModule, SidemenuComponent],
  templateUrl: './logged.component.html',
  styleUrl: './logged.component.scss'
})
export class LoggedComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver
  ) { }
}