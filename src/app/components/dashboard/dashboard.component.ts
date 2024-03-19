import { Component, OnInit } from '@angular/core';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  serviceStatuses: any[] = [];
  filterState: string = '';
  filterDate: Date | null = null;
  mostUnavailableStates: string = ''; 

  constructor(private statusService: StatusService) { }

  ngOnInit(): void {
    this.getStatuses();
    this.getMostUnavailableStates();
  }

  getStatuses(): void {
    this.statusService.getCurrentServiceStatuses().subscribe(data => {
      this.serviceStatuses = data;
    });
  }

  getFilteredStatus(): void {
    if (this.filterState && this.filterDate) {
      this.statusService.getServiceStatusByStateAndDate(this.filterState, this.filterDate).subscribe(data => {
        this.serviceStatuses = data;
      });
    } else if (this.filterState) {
      this.statusService.getServiceStatusByState(this.filterState).subscribe(data => {
        this.serviceStatuses = data;
      });
    } else if (this.filterDate) {
      this.statusService.getServiceStatusByDate(this.filterDate).subscribe(data => {
        this.serviceStatuses = data;
      });
    } else {
      this.getStatuses();
    }
  }

  getFilteredStatusByDate(): void {
    this.getFilteredStatus(); 
  }

  getMostUnavailableStates(): void {
    this.statusService.getMostUnavailableStates().subscribe(
      data => {
        this.mostUnavailableStates = data;
      }, 
      error => {
        console.error('There was an error retrieving the most unavailable states', error);
      }
    );
  }
  
}
