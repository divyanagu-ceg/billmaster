import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import { BillDataService } from '../bill-data.service';
import { Category } from '../bill-data.service';
import { Expense } from '../bill-data.service';


import { Router } from "@angular/router";


@Component({
    selector: 'view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css'],
    providers: [BillDataService]
})
export class ViewComponent implements OnInit {

    constructor(private billDataService: BillDataService, private router: Router,private renderer: Renderer, private elem: ElementRef) {}
    categories: Category[];
    items: Expense[];
    message: string;
    imgNum: string;

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
    
    private filterBills(catId): void{
        if(catId){
            let elements = this.elem.nativeElement.querySelectorAll('.portfolio_item');   
            elements.forEach(element => {
                 console.log(element.className.indexOf(catId));
                 if(element.className.indexOf(catId) > 0){
                    element.classList.add('display-visible');
                    element.classList.remove('display-none');
                 }else{
                    element.classList.add('display-none');
                    element.classList.remove('display-visible');
                 }
            });
        }else{
            let elements = this.elem.nativeElement.querySelectorAll('.portfolio_item');   
            elements.forEach(element => {
                element.classList.add('display-visible');
                element.classList.remove('display-none');
            });
        }
        
        
    }  
    
    private getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    ngOnInit() {
        this.billDataService.getCategories().then(data => {
            console.log(JSON.stringify(data));
            this.categories = data;
            
            var colorList = ["#E0BBE4", "#957DAD", "#D291BC", "#FEC8D8", "#FFDFD3", "#ffb3ba", "#ffdfba"];
            var randNum = this.getRandomInt(1, 6);
            //this.imgNum = "assets/images/color" + randNum + ".jpg";
            this.imgNum = colorList[randNum];
            
        },
        err => {
            console.error(JSON.stringify(err));
            this.message = "Error while connecting to database! Please check database connectivity!";
        });
        this.getItems();
    }
}