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
  // Defina mais propriedades conforme necessário

  constructor(private statusService: StatusService) { }

  ngOnInit(): void {
    this.getStatuses();
    // Chame mais métodos conforme necessário
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
    this.getFilteredStatus(); // Reutilize o mesmo método para simplificar
  }

}
