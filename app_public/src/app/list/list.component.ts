import { Component, OnInit } from '@angular/core';
import { BillDataService } from '../bill-data.service';
import { Expense } from '../bill-data.service';

import { Router } from "@angular/router";


@Component({
    selector: 'list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    providers: [BillDataService]
})
export class ListComponent implements OnInit {

    constructor(private billDataService: BillDataService, private router: Router) {}
    items: Expense[];
    message: string;

    private showError(error: any): void {
        this.message = error.message;
    };

    private getItems(): void {
        this.message = 'Getting your expenses...';
        this.billDataService.getExpenses()
            .then(data => {
                    console.log(JSON.stringify(data));
                    this.message = data.length > 0 ? '' : 'No expenses today!';
                    this.items = data;
                },
                err => {
                    console.error(JSON.stringify(err));
                    this.message = "Error while connecting to database! Please check database connectivity!";
                });
    }

    public deleteExpense(expense_id) {
        console.log("Expense id to delete ", expense_id);
        this.billDataService.deleteExpense(expense_id)
            .subscribe(data => {
                    if (data == 200 || data == 204) {
                        this.ngOnInit();
                    } else {
                        this.message = "Error while deleting expense!";
                    }
                },
                err => {
                    console.error(JSON.stringify(err));
                    this.message = "Error while connecting to database! Please check database connectivity!";
                });
    }
    
    public addExpense(){
        this.router.navigate(['/add-expense']);
    }

    ngOnInit() {
        this.getItems();
    }
}