import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router"

import { BillDataService } from '../../bill-data.service';
import { Category } from '../../bill-data.service';


@Component({
    selector: 'add-cat',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css'],
    providers: [BillDataService]
})
export class AddCategoryComponent implements OnInit {

    constructor(private billDataService: BillDataService, private router: Router) {
            this.form = new FormGroup({
            item: new FormControl(null)
            })
    }
    categories: Category[];
    form: FormGroup;
    message: string;
    
    get item(): string {
        return this.form ? this.form.get('item').value : '';
    }


    private showError(error: any): void {
        this.message = error.message;
    };
    
     private getItems(): void {
        this.message = 'Getting all your categories...';
        this.billDataService.getCategories()
            .then(data => {
                console.log(JSON.stringify(data))
                this.message = data.length > 0 ? '' : 'No categories added!';
                this.categories = data;
            },
            err => {
                console.error(JSON.stringify(err));
                this.message = "Error while connecting to database! Please check database connectivity!";
            });
    }
    
    onSubmit(addCat: NgForm) {
        console.log("Bill object ", JSON.stringify(addCat.value));
        console.log("Is form valid?", addCat.valid);

        if (!addCat.valid) {
            this.message = "Enter category value!";
        } else {
            this.billDataService.addCat(addCat.value)
                .subscribe(data => {
                        console.log(JSON.stringify(data));
                        if (data == 201) {
                            this.router.navigate(['/list']);
                        } else {
                            this.message = "Error occurred while saving your category. Please try again!"
                        }
                    },
                    err => {
                        console.error(JSON.stringify(err));
                        this.message = "Error while connecting to database! Please check database connectivity!";
                    });
        }

    }
    
    save(updateCat: NgForm, cat_id: number){
        console.log("Item object ", JSON.stringify(updateCat) + " " + cat_id);
        this.billDataService.updateCategory(updateCat, cat_id)
            .subscribe(data => {
                    console.log(data);
                    if (data == 204) {
                        this.router.navigate(['/list']);
                    } else {
                        this.message = "Error occurred while updating category. Please try again!"
                    }
                },
                err => {
                    console.error(err);
                    this.message = "Error while connecting to database! Please check database connectivity!";
                });
    }
    
     del(cat_id: number){
        console.log("Item object ", cat_id);
        this.billDataService.deleteCategory(cat_id)
            .subscribe(data => {
                    console.log(data);
                    if (data == 204) {
                        this.router.navigate(['/view']);
                    } else {
                        this.message = "Error occurred while deleting category. Please try again!"
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