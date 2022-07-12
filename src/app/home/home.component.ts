import { Component, OnInit } from '@angular/core';
import { HealthCheckService } from './../services/health-check.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private healthCheckService: HealthCheckService) {}

  ngOnInit(): void {
    this.healthCheckService.getHealthStatus().subscribe(
      (result) => console.log('Connection successful', result),
      (error) => console.log('Error connecting server', error)
    );
  }
}
