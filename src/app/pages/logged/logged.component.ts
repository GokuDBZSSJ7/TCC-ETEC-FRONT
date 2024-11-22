import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidemenuComponent } from '../../shared/sidemenu/sidemenu.component';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { SidemenuService } from '../../services/sidemenu.service';
@Component({
  selector: 'app-logged',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatSidenavModule,
    SidemenuComponent,
    ToolbarComponent,
  ],
  templateUrl: './logged.component.html',
  styleUrl: './logged.component.scss'
})
export class LoggedComponent implements AfterViewInit {
  @ViewChild('drawer') drawer!: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  constructor(
    private breakpointObserver: BreakpointObserver,
    private sidemenuService: SidemenuService,
  ) {
  }

  ngAfterViewInit(): void {
    this.sidemenuService.setSidemenuState(this.drawer.opened);
  }

  getToggleEventToolbar(event: any) {
    event.toggle()
    this.sidemenuService.setSidemenuState(event.opened);
  }
}