import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle, FinanceQuote, FinanceCalculatorInput } from '../../models/vehicle.interface';

@Component({
  selector: 'app-finance-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './finance-calculator.component.html',
  styleUrls: ['./finance-calculator.component.css']
})
export class FinanceCalculatorComponent implements OnInit {
  @Input() vehicle!: Vehicle;
  
  financeInput: FinanceCalculatorInput = {
    deposit: 0,
    term: 60
  };
  
  financeQuote: FinanceQuote | null = null;
  loading: boolean = false;
  error: string | null = null;

  termOptions = [12, 24, 36, 48, 60, 72, 84];

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    if (this.vehicle) {
      this.financeInput.deposit = Math.round(this.vehicle.price * 0.1);
      this.calculateFinance();
    }
  }

  onInputChange(): void {
    if (this.financeInput.deposit < 0) {
      this.financeInput.deposit = 0;
    }
    if (this.financeInput.deposit > this.vehicle.price) {
      this.financeInput.deposit = this.vehicle.price;
    }
    this.calculateFinance();
  }

  calculateFinance(): void {
    if (!this.vehicle) return;

    this.loading = true;
    this.error = null;

    this.vehicleService.calculateFinanceQuote(this.vehicle, this.financeInput).subscribe({
      next: (quote) => {
        this.financeQuote = quote;
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message;
        this.loading = false;
      }
    });
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }

  getDepositPercentage(): number {
    if (!this.vehicle || this.vehicle.price === 0) return 0;
    return Math.round((this.financeInput.deposit / this.vehicle.price) * 100);
  }
}