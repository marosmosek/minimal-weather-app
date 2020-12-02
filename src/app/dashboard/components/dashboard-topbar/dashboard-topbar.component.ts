import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Libraries
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard-topbar',
  templateUrl: './dashboard-topbar.component.html',
  styleUrls: ['./dashboard-topbar.component.scss'],
})
export class DashboardTopbarComponent implements OnInit {
  @Input() currentLocation: string = 'Košice, Slovakia';
  @Input() currentDateTime: moment.Moment = moment();

  @Output() onToggleSearchingDialog = new EventEmitter();

  constructor() {
    moment.locale('en');
    let timeInterval = setInterval(() => {
      this.currentDateTime = moment();
      if (60 - this.currentDateTime.seconds() <= 0) {
        clearInterval(timeInterval);
      }
    }, 1000);
    setInterval(() => {
      this.currentDateTime = moment();
    }, 60000);
  }

  ngOnInit(): void {}

  public toggleSearchingDialog(): void {
    this.onToggleSearchingDialog.emit();
  }
}
