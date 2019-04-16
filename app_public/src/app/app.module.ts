import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';


import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { UpdateExpenseComponent } from './update-expense/update-expense.component';

import { AddCategoryComponent } from './category/add-cat/add-category.component';
import { UpdateCategoryComponent } from './category/edit-cat/update-category.component';
import { ViewComponent } from './view/view.component';
import { UserComponent } from './user/user.component';
import { HomeComponent } from './home/home.component';
import { d3Component } from './analytics/d3.component';


@NgModule({
    declarations: [
        AppComponent,
        ListComponent,
        AddExpenseComponent,
        UpdateExpenseComponent,
		AddCategoryComponent,
		UpdateCategoryComponent,
        ViewComponent,
        HomeComponent,
        UserComponent,
        d3Component
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        DateRangePickerModule,
        RouterModule.forRoot([{
                path: '',
                component: ViewComponent
            },
            {
                path: 'list',
                component: ListComponent
            },
            {
                path: 'add-expense',
                component: AddExpenseComponent
            },
            {
                path: 'update-item',
                component: UpdateExpenseComponent
            },
            {
                path: 'add-cat',
                component: AddCategoryComponent
            },
            {
                path: 'edit-cat',
                component: UpdateCategoryComponent
            },
            {
                path: 'view',
                component: ViewComponent
            },
            {
                path: 'home',
                component: HomeComponent,
                outlet: 'login'
            },
            {
                path: 'update-expense',
                component: UpdateExpenseComponent
            },
            {
                path: 'analytics',
                component: d3Component
            }
        ])
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
