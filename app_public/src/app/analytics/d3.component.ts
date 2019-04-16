import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import * as d3 from 'd3';

import { BillDataService } from '../bill-data.service';
import { Category } from '../bill-data.service';
import { Expense } from '../bill-data.service';


import { Router } from "@angular/router";


@Component({
    selector: 'analytics',
    templateUrl: './d3.component.html',
    styleUrls: ['./d3.component.css'],
    providers: [BillDataService]
})
export class d3Component implements OnInit {

    constructor(private billDataService: BillDataService, private router: Router,private renderer: Renderer, private elem: ElementRef) {}
    categories: Category[];
    items: Expense[];
    message: string;
    imgNum: string;
    showDates = false;
    
    public start: Date = new Date ("10/07/2017"); 
    public end: Date = new Date ("11/25/2017");

    private showError(error: any): void {
        this.message = error.message;
    };
    
    private createCategoryPie(){
        var div = d3.select("svg").append("div").attr("class", "toolTip")
        .attr("style", "position: absolute;display: none;width: auto;height: auto;background: none repeat scroll 0 0 white;                    border: 0 none;border-radius: 8px 8px 8px 8px;box-shadow: -3px 3px 15px #888888;color: black;font: 12px sans-serif;padding: 5px;       text-align: center;");
        var dataset = [];
        this.billDataService.getCategorySpend()
            .then(data => {
                    console.log(JSON.stringify(data));
                    dataset = data;
                    
                    var width = 960,
                    height = 500,
                    radius = Math.min(width, height) / 4;

                    var color = d3.scaleOrdinal()
                        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

                    var arc = d3.arc()
                        .outerRadius(radius - 10)
                        .innerRadius(radius - 70);

                    var pie = d3.pie()
                        .sort(null)
                         .startAngle(1.1*Math.PI)
                        .endAngle(3.1*Math.PI)
                        .value(function(d) { return d.total; });

                    //var svg = d3.select("body").append("svg")
                        var svg = d3.select("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("transform", "translate(" + width / 4 + "," + height / 4 + ")");


                     var g = svg.selectAll(".arc")
                          .data(pie(dataset))
                        .enter().append("g")
                          .attr("class", "arc");

                      g.append("path")
                        .style("fill", function(d) { return color(d.data.name); })
                        .transition().delay(function(d,i) {
                        return i * 500; }).duration(500)
                        .attrTween('d', function(d) {
                            var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
                            return function(t) {
                                d.endAngle = i(t); 
                                return arc(d)
                                }
                            }); 
                      g.append("text")
                          .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
                          .attr("dy", ".35em")
                          .transition()
                          .delay(1000)
                          .text(function(d) { return d.data.name; });

                        d3.selectAll("path").on("mousemove", function(d) {
                            div.style("left", d3.event.pageX+10+"px");
                              div.style("top", d3.event.pageY-25+"px");
                              div.style("display", "inline-block");
                              div.style("background-color", "#000");
                        div.html((d.data.name)+"<br>"+(d.data.total) + "<br>"+(d.data.percent) + "%");
                    });

                    d3.selectAll("path").on("mouseout", function(d){
                        div.style("display", "none");
                    });


                    //d3.select("body").transition().style("background-color", "#d3d3d3");
                    
                },
                err => {
                    console.error(JSON.stringify(err));
                    this.message = "Error while connecting to database! Please check database connectivity!";
                });
        /*var dataset = [
            { name: 'Food', total: 8124, percent: 60 },
            { name: 'Entertainment', total: 1567, percent: 30 },
            { name: 'Misc', total: 1610, percent: 10 }
        ];*/
        
        
    }
    
    

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
    
    private showDateChart(){
         console.log(this.start);
        console.log(this.end);
    }
    
    public changeChart(type): void{
        if(type){
            if(type == 1){
                this.createCategoryPie();    
            } else if(type == 2){
                this.showDates = true;
            }
        }else{
            
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