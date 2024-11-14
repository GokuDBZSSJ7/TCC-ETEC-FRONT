import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatIconModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {
  hidden = true;
  @Output() hasChanged: EventEmitter<any> = new EventEmitter();

  ngOnInit() {

  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  drawerChange(event: any) {
    this.hasChanged.emit(event);
  }
}
