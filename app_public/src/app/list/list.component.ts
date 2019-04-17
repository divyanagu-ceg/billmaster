import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
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
    

    constructor(private billDataService: BillDataService, private router: Router, private renderer: Renderer2, private elem: ElementRef) {}
    items: Expense[];
    message: string;

    private showError(error: any): void {
        this.message = error.message;
    };

    

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
    
    public setPercent(){
        let element1 = this.elem.nativeElement.querySelector('.spent');
        this.renderer.setAttribute(element1, 'data-perc', '0.50');
        //window.location.reload();
    }

    ngOnInit() {
        this.setPercent();
        
    }
}