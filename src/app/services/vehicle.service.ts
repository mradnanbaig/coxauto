import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { Vehicle, FinanceQuote, FinanceCalculatorInput } from '../models/vehicle.interface';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehiclesUrl = '/assets/vehicles.json';
  
  private mockVehicles: Vehicle[] = [
    {
      "make": "Toyota",
      "model": "Camry",
      "year": 2021,
      "price": 23450,
      "mileage": 15000,
      "colour": "White",
      "id": "veh001"
    },
    {
      "make": "Honda",
      "model": "Civic",
      "year": 2020,
      "price": 19800,
      "mileage": 22000,
      "colour": "Blue",
      "id": "veh002"
    },
    {
      "make": "Ford",
      "model": "F-150",
      "year": 2019,
      "price": 27500,
      "mileage": 30000,
      "colour": "Black",
      "id": "veh003"
    },
    {
      "make": "Tesla",
      "model": "Model 3",
      "year": 2022,
      "price": 38990,
      "mileage": 5000,
      "colour": "Red",
      "id": "veh004"
    },
    {
      "make": "Chevrolet",
      "model": "Malibu",
      "year": 2018,
      "price": 15500,
      "mileage": 45000,
      "colour": "Silver",
      "id": "veh005"
    },
    {
      "make": "Nissan",
      "model": "Altima",
      "year": 2021,
      "price": 21000,
      "mileage": 18000,
      "colour": "Gray",
      "id": "veh006"
    },
    {
      "make": "BMW",
      "model": "X3",
      "year": 2020,
      "price": 35500,
      "mileage": 25000,
      "colour": "White",
      "id": "veh007"
    },
    {
      "make": "Hyundai",
      "model": "Elantra",
      "year": 2019,
      "price": 16200,
      "mileage": 35000,
      "colour": "Blue",
      "id": "veh008"
    },
    {
      "make": "Kia",
      "model": "Sorento",
      "year": 2022,
      "price": 29900,
      "mileage": 12000,
      "colour": "Green",
      "id": "veh009"
    },
    {
      "make": "Volkswagen",
      "model": "Jetta",
      "year": 2018,
      "price": 14500,
      "mileage": 48000,
      "colour": "Black",
      "id": "veh010"
    }
  ];

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.vehiclesUrl).pipe(
      delay(500),
      catchError(error => {
        console.warn('Failed to load from assets, using mock data:', error);
        return of(this.mockVehicles).pipe(delay(300));
      })
    );
  }

  getVehicleById(id: string): Observable<Vehicle | null> {
    return this.getVehicles().pipe(
      map(vehicles => vehicles.find(vehicle => vehicle.id === id) || null),
      catchError(error => {
        console.error('Error fetching vehicle by ID:', error);
        return throwError(() => new Error('Failed to load vehicle'));
      })
    );
  }

  calculateFinanceQuote(vehicle: Vehicle, input: FinanceCalculatorInput): Observable<FinanceQuote> {
    return of(this.computeFinanceQuote(vehicle, input)).pipe(
      delay(300),
      catchError(error => {
        console.error('Error calculating finance quote:', error);
        return throwError(() => new Error('Failed to calculate finance quote'));
      })
    );
  }

  private computeFinanceQuote(vehicle: Vehicle, input: FinanceCalculatorInput): FinanceQuote {
    const onTheRoadPrice = vehicle.price;
    const totalDeposit = input.deposit;
    const totalAmountOfCredit = onTheRoadPrice - totalDeposit;
    const numberOfMonthlyPayments = input.term;
    const monthlyPayment = totalAmountOfCredit / numberOfMonthlyPayments;

    return {
      onTheRoadPrice,
      totalDeposit,
      totalAmountOfCredit,
      numberOfMonthlyPayments,
      monthlyPayment: Number(monthlyPayment.toFixed(2))
    };
  }
}