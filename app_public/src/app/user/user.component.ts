import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router"

import { BillDataService } from '../bill-data.service';


@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    providers: [BillDataService]
})
export class UserComponent implements OnInit {

    constructor(private billDataService: BillDataService, private router: Router) {}
    
    message: string;
    isValid: boolean;
    
    private showError(error: any): void {
        this.message = error.message;
    };
    
    updatePin(){
    
    }
    
    onOldSubmit(oldUser: NgForm) {
        console.log("Bill object ", JSON.stringify(oldUser.value));
        console.log("Is form valid?", oldUser.valid);

        if (!oldUser.valid) {
            this.message = "Missing required fields!!";
        } else {
            this.billDataService.checkUser(oldUser.value.oldUsername,oldUser.value.oldPin)
                .subscribe(data => {
                        //console.log(JSON.stringify(data));
                        if (data) {
                            this.isValid = true;
                            console.log("here", this.isValid);
                        } else {
                            this.message = "Error occurred while login. Please try again!"
                            this.isValid = false;
                        }
                    },
                    err => {
                        //console.error(JSON.stringify(err));
                        this.message = "Error while connecting to database! Please check database connectivity!";
                        this.isValid = false;
                    });
        }

    }
    onNewSubmit(newUser: NgForm) {
        console.log("Bill object ", JSON.stringify(newUser.value));
        console.log("Is form valid?", newUser.valid);
        if (!newUser.valid) {
            this.message = "Missing required fields!!";
        } else {
           // console.log("onNewSubmit else");
            this.billDataService.userCreate(newUser.value)
                .subscribe(data => {
                        console.log(JSON.stringify(data));
                        /*if (data == 201) {
                            this.router.navigate(['/list']);
                        } else {
                            this.message = "Error occurred while saving your bill. Please try again!"
                        }*/
                    },
                    err => {
                        //console.error(JSON.stringify(err));
                        this.message = "Error while connecting to database! Please check database connectivity!";
                    });
        }
        
        }
    
    ngOnInit() {
		this.isValid = false;
    }
}