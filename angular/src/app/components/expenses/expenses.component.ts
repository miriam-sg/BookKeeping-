import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from '../../services/data-service.service';

@Component({
  selector: 'app-expenses',
  providers: [FormsModule, DataService],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'
})
export class ExpensesComponent {
  expenseForm: FormGroup;
  constructor(private dataService: DataService) {
    this.expenseForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      paymentMethods: new FormControl(''),
      amount: new FormControl(''),
      provider: new FormControl(''),
      details: new FormControl('')
    })
  }
  saveExpenses() {
    if (this.expenseForm.valid) {
      this.dataService.addExpenses(this.expenseForm.value).subscribe(
        (response) => {
          console.log('Expense added successfully:', response);
        },
        (error) => {
          console.log('Error adding expense:', error);
        }
      );
    } else {
      alert('Please fill in all required fields correctly.')
    }
  }
}






