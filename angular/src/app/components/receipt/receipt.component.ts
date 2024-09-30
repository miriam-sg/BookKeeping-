import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../modules/interfaces';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/data-service.service';
import { response } from 'express';
import { error } from 'console';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-receipt',
  providers: [FormsModule, DataService],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule],
  templateUrl: './receipt.component.html',
  styleUrl: './receipt.component.scss'
})

export class ReceiptComponent implements OnInit {
  receiptForm: FormGroup;
  newCustomer: Customer = { name: '', number: 0 }
  flagnew: boolean = false;
  id: number = 0;
  customers: Array<Customer> = []
  constructor(private dataService: DataService) {
    this.receiptForm = new FormGroup({
      id: new FormControl(''),
      customer: new FormControl(''),
      amount: new FormControl(''),
      paymentMethods: new FormControl(''),
      date: new FormControl('', [Validators.required]),
      details: new FormControl(''),
      description: new FormControl(''),
    })
  }
  ngOnInit(): void {
    this.dataService.AllCustomers.subscribe((data: Customer[]) => {
      this.customers = data;
    })
  }

  saveReceipt() {
    if (this.receiptForm.valid) {
      this.id++
      this.receiptForm.patchValue({ id: this.id })
      this.dataService.addReceipt(this.receiptForm.value).subscribe(
        (response) => {
          console.log('Receipt added successfully:', response);
        },
        (error) => {
          console.error('Error adding receipt:', error);
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
  onSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.flagnew = selectedValue === 'newCustomer';
  }
  updateNewCustomerName(event: Event) {
    this.newCustomer.name = (event.target as HTMLInputElement).value;
  }
  updateNewCustomerNum(event: Event) {
    this.newCustomer.number = parseInt((event.target as HTMLInputElement).value);
  }

  saveCustomer() {
    this.dataService.addCustomer(this.newCustomer).subscribe(
      (response) => {
        console.log('Customer added successfully:', response);
        this.customers.push(this.newCustomer);
        this.newCustomer = { name: '', number: 0 };
      },
      (error) => {
        console.error('Error adding customer:', error);
      }
    );
  }

}
