import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router"

import { BillDataService } from '../bill-data.service';
import { Category } from '../bill-data.service';


@Component({
    selector: 'add-expense',
    templateUrl: './add-expense.component.html',
    styleUrls: ['./add-expense.component.css'],
    providers: [BillDataService]
})
export class AddExpenseComponent implements OnInit {

    constructor(private billDataService: BillDataService, private router: Router) {}
    categories: Category[];
    
    message: string;

    private showError(error: any): void {
        this.message = error.message;
    };
    
    
    onSubmit(addBill: NgForm) {
        console.log("Bill object ", JSON.stringify(addBill.value));
        console.log("Is form valid?", addBill.valid);

        if (!addBill.valid) {
            this.message = "Missing required fields Name/Date/Amount! Cannot add expense to list!!";
        } else {
            this.billDataService.addBill(addBill.value)
                .subscribe(data => {
                        console.log(JSON.stringify(data));
                        if (data == 201) {
                            this.router.navigate(['/list']);
                        } else {
                            this.message = "Error occurred while saving your bill. Please try again!"
                        }
                    },
                    err => {
                        console.error(JSON.stringify(err));
                        this.message = "Error while connecting to database! Please check database connectivity!";
                    });
        }

    }
    
    ngOnInit() {
		this.billDataService.getCategories()
		.then(data => {
				console.log(JSON.stringify(data));
				this.categories = data;
			},
			err => {
				console.error(JSON.stringify(err));
				this.message = "Error while connecting to database! Please check database connectivity!";
			});
    }
}