import { Injectable} from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'


export class Expense{
	expense_id: number;
	expense_name: string;
	expense_cat: string;
	expense_date: Date;
	expense_desc: string;
	username: string;
}

export class Category{
    cat_id: number;
    cat_name: string;
}

@Injectable()
export class BillDataService {

    constructor(private http: Http) {

    }

    private apiBaseUrl = 'http://localhost:3000/api';

	
	public getExpenses(): Promise < Expense[] > {
        const url: string = `${this.apiBaseUrl}/expenses`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json() as Expense[])
            .catch(this.handleError);
    }
    
    public getCategories(): Promise< Category[] >{
        const url: string = `${this.apiBaseUrl}/categories`;
        return this.http
            .get(url)
            .toPromise()
            .then(response => response.json() as Category[])
            .catch(this.handleError);
    }
	
	public deleteExpense(expense_id): Observable < number > {
        const url: string = `${this.apiBaseUrl}/expenses/${expense_id}`;
        return this.http
            .delete(url)
            .map(response => response.status)
            .catch(this.handleError);
    }
    
    public deleteCategory(cat_id): Observable < number > {
        const url: string = `${this.apiBaseUrl}/category/${cat_id}`;
        return this.http
            .delete(url)
            .map(response => response.status)
            .catch(this.handleError);
    }
    
    public addBill(expense): Observable < number > {
        const url: string = `${this.apiBaseUrl}/expense/`;
        return this.http
            .post(url, expense)
            .map(response => response.status)
            .catch(this.handleError);
    }
    
    public userCreate(newUser): Observable < number > {
        const url: string = `${this.apiBaseUrl}/user/`;
        return this.http
            .post(url, newUser)
            .map(response => response.status)
            .catch(this.handleError);
    }
	
	public addCat(expense): Observable < number > {
        const url: string = `${this.apiBaseUrl}/category/`;
        return this.http
            .post(url, expense)
            .map(response => response.status)
            .catch(this.handleError);
    }
    
    public updateExpense(expense, expenseId): Observable < number >{
        const url: string = `${this.apiBaseUrl}/expense/` + expenseId;
        console.log(url)
        return this.http
            .put(url, expense)
            .map(response => response.status)
            .catch(this.handleError);
    }
    
    public updateCategory(category, cat_id): Observable < number >{
        const url: string = `${this.apiBaseUrl}/category/` + cat_id;
        console.log(url)
        return this.http
            .put(url, category)
            .map(response => response.status)
            .catch(this.handleError);
    }
    
    public checkUser(oldUsername,oldPin): Observable < number >{
        const url: string = `${this.apiBaseUrl}/user/` + oldUsername +`/`+ oldPin ;
        console.log(url);
        return this.http
            .get(url)
            .map(response => response.status)
            .catch(this.handleError);
    }
    

    private handleError(error: any): Promise < any > {
        console.error('API Lookup error', error);
        return Promise.reject(error.message || error);
    }

}