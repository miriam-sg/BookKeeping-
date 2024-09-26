import { Injectable } from '@angular/core';
import { Customer, Expense, Receipt, Revenue } from '../modules/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  private customers: Customer[] = []; // Assuming you have a property to store customers

  private baseUrl = 'http://127.0.0.1:3000'

  constructor(private http: HttpClient) { }

  get AllReceipts(): Observable<Array<Receipt>> {
    // ניתוב להבאת כל הקבלות
    return this.http.get<Array<Receipt>>(`${this.baseUrl}`);
  }
  get AllCustomers(): Observable<Array<Customer>> {
    // ניתוב להבאת כל הלקוחות
    return this.http.get<Array<Customer>>(`${this.baseUrl}/customer/findCustomer`);
  }
  get lastNumber(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}`);
  }
  addReceipt(newReceipt: Receipt): Observable<Receipt> {
    return this.http.post<Receipt>(`${this.baseUrl}/receipt/addReceipt`,
      newReceipt, {
      headers: { 'content-type': 'application/json' }
    })
  }
  addExpenses(newExpense: Expense): Observable<Receipt> {
    return this.http.post<Receipt>(`${this.baseUrl}/expense/addExpense`,
      newExpense, {
      headers: { 'content-type': 'application/json' }
    })
  }
  addCustomer(newCustomer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.baseUrl}/customer/addcustomer`, newCustomer)
  }
  findCustomer(filter: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/customer/findCustomer/${filter}`);
  }
  getExpenseByYear(year: number): Observable<Array<Expense>> {
    return this.http.get<Array<Expense>>(`${this.baseUrl}/expense/getByYear/${year}`);
  }
  getReceiptByYear(year: number): Observable<Array<Receipt>> {
    return this.http.get<Array<Receipt>>(`${this.baseUrl}/receipt/getByYear/${year}`)
  }
  getExpenseByMonth(month: number): Observable<Array<Expense>> {
    return this.http.get<Array<Expense>>(`${this.baseUrl}/expense/getByMonth/${month}`);
  }
  getReceiptByMonth(month: number): Observable<Array<Receipt>> {
    return this.http.get<Array<Receipt>>(`${this.baseUrl}/receipt/getByMonth/${month}`)
  }
  getExpenseBy2date(startDate: Date, endDate: Date): Observable<Array<Expense>> {
    return this.http.get<Array<Expense>>(`${this.baseUrl}/expense/getBy2date/${startDate}/${endDate}`);
  }
  getReceiptBy2date(startDate: Date, endDate: Date): Observable<Array<Receipt>> {

    return this.http.get<Array<Receipt>>(`${this.baseUrl}/receipt/getBy2date/${startDate}/${endDate}`);
  }
  getByCust(customer: any): Observable<Array<Receipt>> {
    return this.http.get<Array<Receipt>>(`${this.baseUrl}/receipt/getByCust/${customer}`)
  }
}