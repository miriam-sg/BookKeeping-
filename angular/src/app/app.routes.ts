import { Routes } from '@angular/router';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { DataSegmenationComponent } from './components/data-segmentation/data-segmenation.component';

export const routes: Routes = [
    {path:'receipt' ,component:ReceiptComponent},
    {path:'expenses' ,component:ExpensesComponent},
    {path:'data-segmentation' ,component:DataSegmenationComponent}
];
