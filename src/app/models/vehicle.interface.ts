export interface Vehicle {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  colour: string;
  id: string;
}

export interface FinanceQuote {
  onTheRoadPrice: number;
  totalDeposit: number;
  totalAmountOfCredit: number;
  numberOfMonthlyPayments: number;
  monthlyPayment: number;
}

export interface FinanceCalculatorInput {
  deposit: number;
  term: number;
}

export type SortField = 'price' | 'year' | 'mileage' | 'make' | 'model';
export type SortDirection = 'asc' | 'desc';

export interface SortOptions {
  field: SortField;
  direction: SortDirection;
}