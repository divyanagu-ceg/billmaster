import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router"

import { BillDataService } from '../../bill-data.service';
import { Expense } from '../../bill-data.service';


@Component({
    selector: 'update-cat',
    templateUrl: './update-category.component.html',
    styleUrls: ['./update-category.component.css'],
    providers: [BillDataService]
})
export class UpdateCategoryComponent implements OnInit {

    constructor(private billDataService: BillDataService, private router: Router) {
        this.form = new FormGroup({
            item: new FormControl(null)
        })
    }
    items: Expense[];
    message: string;
    form: FormGroup;
    
    get item(): string {
        return this.form ? this.form.get('item').value : '';
    }
    private showError(error: any): void {
        this.message = error.message;
    };

    private getItems(): void {
        this.message = 'Getting all your expenses...';
        this.billDataService.getExpenses()
            .then(data => {
                console.log(JSON.stringify(data))
                this.message = data.length > 0 ? '' : 'No expenses added!';
                this.items = data;
            },
            err => {
                console.error(JSON.stringify(err));
                this.message = "Error while connecting to database! Please check database connectivity!";
            });
    }
    
    save(updateBill: NgForm, expenseId: number){
        console.log("Item object ", JSON.stringify(updateBill) + " " + expenseId);
        this.billDataService.updateExpense(updateBill, expenseId)
            .subscribe(data => {
                    console.log(data);
                    if (data == 204) {
                        this.router.navigate(['/list']);
                    } else {
                        this.message = "Error occurred while updating expense. Please try again!"
                    }
                },
                err => {
                    console.error(err);
                    this.message = "Error while connecting to database! Please check database connectivity!";
                });
    }

    ngOnInit() {
        this.getItems();
    }


}
