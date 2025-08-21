import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle.interface';
import { FinanceCalculatorComponent } from '../finance-calculator/finance-calculator.component';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [CommonModule, FinanceCalculatorComponent],
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {
  vehicle: Vehicle | null = null;
  loading: boolean = false;
  error: string | null = null;
  vehicleId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.vehicleId = params.get('id');
      if (this.vehicleId) {
        this.loadVehicle(this.vehicleId);
      } else {
        this.error = 'Vehicle ID not found';
      }
    });
  }

  loadVehicle(id: string): void {
    this.loading = true;
    this.error = null;

    this.vehicleService.getVehicleById(id).subscribe({
      next: (vehicle) => {
        if (vehicle) {
          this.vehicle = vehicle;
        } else {
          this.error = 'Vehicle not found';
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  }

  formatMileage(mileage: number): string {
    return new Intl.NumberFormat('en-US').format(mileage);
  }
}