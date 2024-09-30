import { Component } from '@angular/core';
import { DataService } from '../../services/data-service.service';
import { CommonModule } from '@angular/common';
import { ExpensesComponent } from '../expenses/expenses.component';
import { Customer } from '../../modules/interfaces';

@Component({
  selector: 'app-data-segmenation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-segmenation.component.html',
  styleUrl: './data-segmenation.component.scss'
})


export class DataSegmenationComponent {
  startDate: any;
  endDate: any;
  value: any = [];
  arr: any = [];
  customers: Array<Customer> = [];
  revenue: any = [];
  expense: any = [];
  flagcust: boolean = false;
  flagExpense: boolean = false;
  flagRevenue: boolean = false;
  flagYear: boolean = false;
  flagMonth: boolean = false;
  flag2date: boolean = false;
  flagDisplay: boolean = false;

  constructor(private dataService: DataService) {
    this.dataService.AllCustomers.subscribe(customers => {
      this.customers = customers;
    })
  }

  getByYear() {
    const value = (this.value.target as HTMLInputElement).value
    const year = parseInt(value)

    this.flagDisplay = false; 

    if (this.flagExpense) {
      this.dataService.getExpenseByYear(year).subscribe((response) => {
        this.expense = response;
        this.flagDisplay = true;
      })
    }

    if (this.flagRevenue) {
      this.dataService.getReceiptByYear(year).subscribe((response) => {
        this.revenue = response;
        this.flagDisplay = true;
      });
    }
  }
  getByMonth() {
    const value = (this.value.target as HTMLInputElement).value
    const month = parseInt(value)

    this.flagDisplay = false; 

    if (this.flagExpense) {
      this.dataService.getExpenseByMonth(month).subscribe((response) => {
        this.expense = response;
        this.arr = this.value;
        this.flagDisplay = true;
      })
    }
    
    if (this.flagRevenue) {
      this.dataService.getReceiptByMonth(month).subscribe((response) => {
        this.revenue = response
        this.flagDisplay = true
      })
    }
  }
  getBy2date() {
    this.startDate = (this.startDate.target as HTMLInputElement).value
    this.endDate = (this.endDate.target as HTMLInputElement).value

    this.flagDisplay = false; 

    if (this.flagExpense) {
      this.dataService.getExpenseBy2date(new Date(this.startDate), new Date(this.endDate)).subscribe((response) => {
        this.expense = response;
        this.arr = this.value;
        this.flagDisplay = true;
      });
    }

    if (this.flagRevenue) {
      this.dataService.getReceiptBy2date(this.startDate, this.endDate).subscribe((response) => {
        this.revenue = response;
        this.flagDisplay = true

      });
    }
  }
  getByCust(customer: any) {
    const cust = (customer.target as HTMLInputElement).value;
    this.dataService.getByCust(cust).subscribe((response) => {
      this.revenue = response;
      this.flagDisplay = true

    })
  }
}
