import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle, SortField, SortOptions } from '../../models/vehicle.interface';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = [];
  searchTerm: string = '';
  sortOptions: SortOptions = { field: 'price', direction: 'asc' };
  loading: boolean = false;
  error: string | null = null;

  sortFields: { value: SortField; label: string }[] = [
    { value: 'price', label: 'Price' },
    { value: 'year', label: 'Year' },
    { value: 'mileage', label: 'Mileage' },
    { value: 'make', label: 'Make' },
    { value: 'model', label: 'Model' }
  ];

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.loading = true;
    this.error = null;
    
    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.applyFiltersAndSort();
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    this.applyFiltersAndSort();
  }

  onSortChange(): void {
    this.applyFiltersAndSort();
  }

  toggleSortDirection(): void {
    this.sortOptions.direction = this.sortOptions.direction === 'asc' ? 'desc' : 'asc';
    this.applyFiltersAndSort();
  }

  private applyFiltersAndSort(): void {
    let filtered = [...this.vehicles];

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(vehicle =>
        vehicle.make.toLowerCase().includes(term) ||
        vehicle.model.toLowerCase().includes(term) ||
        vehicle.colour.toLowerCase().includes(term) ||
        vehicle.year.toString().includes(term)
      );
    }

    filtered.sort((a, b) => {
      const field = this.sortOptions.field;
      let aVal = a[field];
      let bVal = b[field];

      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }

      if (aVal < bVal) {
        return this.sortOptions.direction === 'asc' ? -1 : 1;
      }
      if (aVal > bVal) {
        return this.sortOptions.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    this.filteredVehicles = filtered;
  }

  viewVehicleDetails(vehicleId: string): void {
    this.router.navigate(['/vehicle', vehicleId]);
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