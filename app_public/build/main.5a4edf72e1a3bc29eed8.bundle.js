webpackJsonp([1],{0:function(e,t,o){e.exports=o("cDNt")},ASi2:function(e,t,o){t=e.exports=o("rP7Y")(!1),t.push([e.i,"",""]),e.exports=e.exports.toString()},GtK6:function(e,t,o){t=e.exports=o("rP7Y")(!1),t.push([e.i,"",""]),e.exports=e.exports.toString()},HmrU:function(e,t,o){t=e.exports=o("rP7Y")(!1),t.push([e.i,"a:hover{text-decoration:underline!important}",""]),e.exports=e.exports.toString()},WebO:function(e,t){e.exports='<div class="padding-left-50">\r\n   <h1 class="padding-top-20">Items in my Fridge</h1>\r\n   <h3 [innerHTML]="message"></h3>\r\n   <div class="col-md-3">\r\n       <form [formGroup]="form">\r\n\t       <select formControlName="item" class="form-control">\r\n                <option [ngValue]="null" selected>Select Item to Update</option>\r\n                <option *ngFor="let item of items" [ngValue]="item">{{item.name}}</option>\r\n            </select>           \r\n       </form>\r\n    </div>\r\n    <div *ngIf="item" class="col-md-12" class="padding-top-20">\r\n        <form class="form-horizontal" #updatefood="ngForm" >\r\n            <div class="form-group row" >\r\n        <label class="col-xs-10 col-sm-4 control-label" for="name">Name</label>\r\n        <div class="col-xs-12 col-sm-4">\r\n          <input class="form-control" id="name" name="name" disabled  [(ngModel)]="item.name"/>\r\n        </div>\r\n      </div>\r\n      <div class="form-group row">\r\n        <label class="col-xs-10 col-sm-4 control-label" for="date">Date</label>\r\n        <div class="col-xs-12 col-sm-4">\r\n          <input class="form-control" id="date" name="date" placeholder="mm-dd-yyyy" required  [ngModel]="item.date | date: \'dd-MMM-yyyy\'"  (ngModelChange)="item.date=$event" disabled/>\r\n        </div>\r\n      </div>\r\n      <div class="form-group row">\r\n        <label class="col-xs-10 col-sm-4 control-label" for="edate">Expiry Date</label>\r\n        <div class="col-xs-12 col-sm-4">\r\n          <input class="form-control" id="edate" name="edate" placeholder="mm-dd-yyyy" [ngModel]="item.expiry | date: \'dd-MMM-yyyy\'"  (ngModelChange)="item.expiry=$event"/>\r\n        </div>\r\n      </div>\r\n      <div class="form-group row">\r\n        <label class="col-xs-10 col-sm-4 control-label" for="quantity">Quantity</label>\r\n        <div class="col-xs-12 col-sm-2">\r\n          <input class="form-control" id="quantity" name="quantity" type="number" min="1" required  [(ngModel)]="item.quantity"/>\r\n        </div>\r\n      </div>\r\n            <button class="btn btn-default" type="button" (click)="save(updatefood.value, item._id)" [disabled]="!updatefood.dirty">Update Fridge</button>\r\n        </form>  \r\n    </div>\r\n</div>'},cDNt:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=o("/oeL"),r=o("Qa4U"),i=o("fc+i"),a=o("CPp0"),s=o("BkNc"),c=o("bm2B"),l=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(i<3?r(a):i>3?r(t,o,a):r(t,o))||a);return i>3&&a&&Object.defineProperty(t,o,a),a},d=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},f=function(){function e(){}return e.prototype.ngOnInit=function(){},e}();f=l([Object(n.o)({selector:"app-root",template:o("efyd"),styles:[o("hxJY")]}),d("design:paramtypes",[])],f);var p=(o("82j9"),o("5v8a"),o("xpf9"),this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(i<3?r(a):i>3?r(t,o,a):r(t,o))||a);return i>3&&a&&Object.defineProperty(t,o,a),a}),m=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},u=(function(){function e(){}}(),function(){function e(e){this.http=e,this.apiBaseUrl="http://localhost:3000/api"}return e.prototype.getItems=function(){var e=this.apiBaseUrl+"/food";return this.http.get(e).toPromise().then(function(e){return e.json()}).catch(this.handleError)},e.prototype.deleteItem=function(e){var t=this.apiBaseUrl+"/food/"+e;return this.http.delete(t).map(function(e){return e.status}).catch(this.handleError)},e.prototype.addItem=function(e){var t=this.apiBaseUrl+"/food/";return this.http.post(t,e).map(function(e){return e.status}).catch(this.handleError)},e.prototype.updateItem=function(e,t){var o=this.apiBaseUrl+"/food/"+t;return console.log(o),this.http.put(o,e).map(function(e){return e.status}).catch(this.handleError)},e.prototype.handleError=function(e){return console.error("API Lookup error",e),Promise.reject(e.message||e)},e}());u=p([Object(n.C)(),m("design:paramtypes",["function"==typeof(g=void 0!==a.a&&a.a)&&g||Object])],u);var g,v=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(i<3?r(a):i>3?r(t,o,a):r(t,o))||a);return i>3&&a&&Object.defineProperty(t,o,a),a},h=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},y=function(){function e(e){this.fridgeDataService=e}return e.prototype.showError=function(e){this.message=e.message},e.prototype.getItems=function(){var e=this;this.message="Getting items from your fridge...",this.fridgeDataService.getItems().then(function(t){console.log(JSON.stringify(t)),e.message=t.length>0?"":"No items in fridge! Time to restock!",e.items=t},function(t){console.error(JSON.stringify(t)),e.message="Error while connecting to database! Please check database connectivity!"})},e.prototype.deleteItem=function(e){var t=this;console.log("Item id to delete ",e),this.fridgeDataService.deleteItem(e).subscribe(function(e){200==e||204==e?t.ngOnInit():t.message="Error while deleting item!"},function(e){console.error(JSON.stringify(e)),t.message="Error while connecting to database! Please check database connectivity!"})},e.prototype.ngOnInit=function(){this.getItems()},e}();y=v([Object(n.o)({selector:"list",template:o("r66H"),styles:[o("HmrU")],providers:[u]}),h("design:paramtypes",["function"==typeof(b=void 0!==u&&u)&&b||Object])],y);var b,x=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(i<3?r(a):i>3?r(t,o,a):r(t,o))||a);return i>3&&a&&Object.defineProperty(t,o,a),a},O=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},j=function(){function e(e,t){this.fridgeDataService=e,this.router=t}return e.prototype.showError=function(e){this.message=e.message},e.prototype.onSubmit=function(e){var t=this;console.log("Item object ",JSON.stringify(e.value)),console.log("Is form valid?",e.valid),e.valid?this.fridgeDataService.addItem(e.value).subscribe(function(e){console.log(JSON.stringify(e)),201==e?t.router.navigate(["/list"]):t.message="Error occurred while adding data. Please try again!"},function(e){console.error(JSON.stringify(e)),t.message="Error while connecting to database! Please check database connectivity!"}):this.message="Missing required fields Name/Date/Quantity! Cannot add item to fridge!!"},e.prototype.ngOnInit=function(){},e}();j=x([Object(n.o)({selector:"add-item",template:o("j5UV"),styles:[o("ASi2")],providers:[u]}),O("design:paramtypes",["function"==typeof(w=void 0!==u&&u)&&w||Object,"function"==typeof(I=void 0!==s.a&&s.a)&&I||Object])],j);var w,I,R=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(i<3?r(a):i>3?r(t,o,a):r(t,o))||a);return i>3&&a&&Object.defineProperty(t,o,a),a},_=this&&this.__metadata||function(e,t){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(e,t)},M=function(){function e(e,t){this.fridgeDataService=e,this.router=t,this.form=new c.b({item:new c.a(null)})}return Object.defineProperty(e.prototype,"item",{get:function(){return this.form?this.form.get("item").value:""},enumerable:!0,configurable:!0}),e.prototype.showError=function(e){this.message=e.message},e.prototype.getItems=function(){var e=this;this.message="Getting items from your fridge...",this.fridgeDataService.getItems().then(function(t){console.log(JSON.stringify(t)),e.message=t.length>0?"":"No items in fridge! Time to restock!",e.items=t},function(t){console.error(JSON.stringify(t)),e.message="Error while connecting to database! Please check database connectivity!"})},e.prototype.save=function(e,t){var o=this;console.log("Item object ",JSON.stringify(e)+" "+t),this.fridgeDataService.updateItem(e,t).subscribe(function(e){console.log(e),200==e?o.router.navigate(["/list"]):o.message="Error occurred while updating data. Please try again!"},function(e){console.error(e),o.message="Error while connecting to database! Please check database connectivity!"})},e.prototype.ngOnInit=function(){this.getItems()},e}();M=R([Object(n.o)({selector:"update-item",template:o("WebO"),styles:[o("GtK6")],providers:[u]}),_("design:paramtypes",["function"==typeof(P=void 0!==u&&u)&&P||Object,"function"==typeof(S=void 0!==s.a&&s.a)&&S||Object])],M);var P,S,k=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,a=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,o,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(i<3?r(a):i>3?r(t,o,a):r(t,o))||a);return i>3&&a&&Object.defineProperty(t,o,a),a},D=function(){function e(){}return e}();D=k([Object(n.M)({declarations:[f,y,j,M],imports:[i.a,a.b,c.c,c.d,s.b.forRoot([{path:"",component:y},{path:"list",component:y},{path:"add-item",component:j},{path:"update-item",component:M}])],providers:[],bootstrap:[f]})],D),{production:!0}.production&&Object(n._23)(),Object(r.a)().bootstrapModule(D).catch(function(e){return console.log(e)})},efyd:function(e,t){e.exports='<nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="menu-bar">\n    <div class="container-fluid">\n      <a class="navbar-brand brand-name" href="/">What\'s in my fridge?</a>\n      <div class="collapse navbar-collapse">\n        <ul class="navbar-nav mr-auto">\n          <li class="nav-item" routerLinkActive="active">\n              <a class="nav-link menu-item" routerLink="list">My Food</a>\n          </li>\n          <li class="nav-item">\n              <a class="nav-link menu-item" routerLink="add-item">Add Food</a>\n          </li>\n          <li class="nav-item">\n              <a class="nav-link menu-item" routerLink="update-item">Update Fridge</a>\n          </li>    \n        </ul>\n      </div>\n    </div>\n</nav>\n<div class="container margin-0">\n  <router-outlet></router-outlet>\n</div>'},gFIY:function(e,t){function o(e){return Promise.resolve().then(function(){throw new Error("Cannot find module '"+e+"'.")})}o.keys=function(){return[]},o.resolve=o,e.exports=o,o.id="gFIY"},hxJY:function(e,t,o){t=e.exports=o("rP7Y")(!1),t.push([e.i,"",""]),e.exports=e.exports.toString()},j5UV:function(e,t){e.exports='<div class="row padding-top-20 padding-left-50">\r\n   <div class="col-xs-12 col-md-12">\r\n      <h3>Add food to the Fridge</h3>\r\n   </div>\r\n   <div class="col-xs-12 col-md-6 padding-top-20">\r\n      <form class="form-horizontal" #addfood="ngForm" (ngSubmit)="onSubmit(addfood)">\r\n      <div class="form-group row">\r\n         <label class="col-xs-10 col-sm-4 control-label" for="name">Name</label>\r\n         <div class="col-xs-12 col-sm-4">\r\n            <input class="form-control" id="name" name="name" required  ngModel/>\r\n         </div>\r\n      </div>\r\n      <div class="form-group row">\r\n         <label class="col-xs-10 col-sm-4 control-label" for="date">Date</label>\r\n         <div class="col-xs-12 col-sm-4">\r\n            <input class="form-control" id="date" name="date" placeholder="mm-dd-yyyy" required  ngModel/>\r\n         </div>\r\n      </div>\r\n      <div class="form-group row">\r\n         <label class="col-xs-10 col-sm-4 control-label" for="edate">Expiry Date</label>\r\n         <div class="col-xs-12 col-sm-4">\r\n            <input class="form-control" id="edate" name="edate" placeholder="mm-dd-yyyy" ngModel/>\r\n         </div>\r\n      </div>\r\n      <div class="form-group row">\r\n         <label class="col-xs-10 col-sm-4 control-label" for="quantity">Quantity</label>\r\n         <div class="col-xs-12 col-sm-2">\r\n            <input class="form-control" id="quantity" name="quantity" type="number" min="1" required  ngModel/>\r\n         </div>\r\n      </div>\r\n      <div class="form-group row">\r\n         <label class="col-xs-10 col-sm-4 control-label" for="left_over">Is it a left-over?</label>\r\n         <div class="col-xs-12 col-sm-3">\r\n            <select class="form-control input-sm" id="rating" name="left_over"  ngModel>\r\n               <option>False</option>\r\n               <option>True</option>\r\n            </select>\r\n         </div>\r\n      </div>\r\n      <button class="btn btn-default">Add to Fridge</button>\r\n      </form>\r\n   </div>\r\n   <div class="col-xs-12 col-md-6">\r\n      <h2>{{message}}</h2>\r\n   </div>\r\n</div>'},r66H:function(e,t){e.exports='<div class="padding-left-50">\r\n   <h1 class="padding-top-20">Items in my Fridge</h1>\r\n   <h3 [innerHTML]="message"></h3>\r\n   <div class="card-deck padding-top-20" >\r\n      <div class="card bg-light mb-3" style="max-width:18rem" *ngFor="let item of items">\r\n         <div class="card-header" style="background-color: #283c4f;color: white;text-align:center;font-weight:bold;font-size:30px">\r\n            {{item.name}}\r\n         </div>\r\n         <div class="card-body">\r\n            <div class="card-text">\r\n               <p *ngIf="item.expiry" style="font-style: italic">Expires: {{item.expiry | date: \'dd-MMM-yyyy\'}}</p>\r\n            </div>\r\n            <p style="font-style: italic">Date: {{item.date | date: \'dd-MMM-yyyy\'}}</p>\r\n            <p> You have <span style="font-weight:bold"> {{item.quantity}} </span> left!</p>\r\n            <p>\r\n               Is it a Left-Over? <span *ngIf="item.left_overs == \'True\';else other_content">Yes</span> \r\n               <ng-template #other_content>No</ng-template>\r\n            </p>\r\n         </div>\r\n         <div class="card-footer" style="background-color:#283c4f;color:white;text-align:center;font-weight:bold;">\r\n            <a style="color:white;cursor: pointer" (click)="deleteItem(item._id)">Remove from fridge</a> \r\n         </div>\r\n      </div>\r\n   </div>\r\n</div>'}},[0]);