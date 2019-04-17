import { Component, OnInit, Renderer, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { DatePipe } from '@angular/common';

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

    constructor(private billDataService: BillDataService, private router: Router,private renderer: Renderer, private elem: ElementRef, private datePipe: DatePipe) {}
    categories: Category[];
    items: Expense[];
    message: string;
    imgNum: string;
    total: number;
    showDates = false;
    todaysBills = false;
    
    public start: Date = new Date ("10/07/2017"); 
    public end: Date = new Date ("11/25/2017");

    private showError(error: any): void {
        this.message = error.message;
    };
    
    private createCategoryPie(){
        //var pieContainer = d3.select("#container");
            //var svg = pieContainer.append("svg").attr("id", "svgPie");
           
        var div = d3.select("#container").append("div").attr("class", "toolTip")
        /*
        .attr("style", "position: absolute;display: inline-block;width: auto;height: auto;background: none repeat scroll 0 0 white;                    border: 0 none;border-radius: 8px 8px 8px 8px;box-shadow: -3px 3px 15px #888888;color: black;font: 12px sans-serif;padding: 5px;       text-align: center;z-index: 999;");*/
        
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
                            console.log(d3.event.pageX);
                            div.style("left", d3.event.pageX-650+"px");
                              div.style("top", d3.event.pageY-750+"px");
                              div.style("display", "inline-block").style("border","1px dotted black")
                              .style("background-color", "white")
                              .style(" border-radius", "8px 8px 8px 8px");
                              div.style("color", "#000");
                        div.html("$" + d.data.total);
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
    
    private onDateSelection($event){
         console.log($event.value);
         d3.select("svg").html("");
            console.log(this.datePipe.transform($event.value[0], 'yyyy-MM-dd'));
            var from1 = this.datePipe.transform($event.value[0], 'MMM-dd'), to1 = this.datePipe.transform($event.value[1], 'MMM-dd');
            var fromDate = this.datePipe.transform($event.value[0], 'yyyy-MM-dd'), toDate = this.datePipe.transform($event.value[1], 'yyyy-MM-dd');
            
            this.billDataService.getDateRangeSpend(fromDate, toDate)
            .then(data => {
                console.log(JSON.stringify(data));
                var svg = d3.select("svg"),
                margin = 200,
                width = 600 - margin,
                height = 500 - margin;

                svg.attr("width", 600).attr("height", 500);

            svg.append("text")
               .attr("transform", "translate(100,0)")
               .attr("x", 50)
               .attr("y", 50)
               .attr("font-size", "24px")
               .text("Expenses between " + from1 + " and " + to1);

            var xScale = d3.scaleBand().range([0, width]).padding(0.4),
                yScale = d3.scaleLinear().range([height, 0]);

            var g = svg.append("g")
                       .attr("transform", "translate(" + 100 + "," + 100 + ")");

                       /*data = [
                    {date:"2019-04-09", amount:90},
                    {date:"2019-04-09", amount:12},
                    {date:"2019-04-01", amount:11},
                    {date:"2019-04-09", amount:13}
                    ];*/
                 
                for(var i=0;i<data.length;i++){
                    data[i].date = this.datePipe.transform(data[i].date, 'yyyy-MM-dd');
                    console.log(data[i].date);
                }

                xScale.domain(data.map(function(d) { return d.date; }));
                yScale.domain([0, d3.max(data, function(d) { return d.amount; })]);

                g.append("g")
                 .attr("transform", "translate(0," + height + ")")
                 .call(d3.axisBottom(xScale))
                 .append("text")
                 .attr("y", height - 250)
                 .attr("x", width - 100)
                 .attr("text-anchor", "end")
                 .attr("stroke", "#8583e1")
                 .text("Date");

                g.append("g")
                 .call(d3.axisLeft(yScale).tickFormat(function(d){
                     return "$" + d;
                 })
                 .ticks(10))
                 .append("text")
                 .attr("transform", "rotate(-90)")
                 .attr("y", 6)
                 .attr("dy", "-5.1em")
                 .attr("text-anchor", "end")
                 .attr("stroke", "#8583e1")
                 .text("Amount in $");

                g.selectAll(".bar")
                 .data(data)
                 .enter().append("rect")
                 .attr("class", "bar")
                 .attr("x", function(d) { return xScale(d.date); })
                 .attr("y", function(d) { return yScale(d.amount); })
                 .attr("width", xScale.bandwidth())
                 .attr("height", function(d) { return height - yScale(d.amount); });
           // });
            },
            err => {
                console.error(JSON.stringify(err));
            });
        
    }
    
    public getTodaysBills(){
        this.billDataService.getTodaysBills()
        .then(data => {
            console.log(data)
            this.total = data[0].total;
        },
        err => {
            console.log(JSON.stringify(err));
        });
    }
    public changeChart(type): void{
        if(type){
            if(type == 1){
                this.showDates = false;
                this.todaysBills = false;
                d3.select("svg").html("");
                this.createCategoryPie();
                
            } else if(type == 2){
                this.todaysBills = false;
                d3.select("svg").html("");
                this.showDates = true;
            } else if(type == 3){
                this.todaysBills = false;
                this.showDates = false;
                d3.select("svg").html("");
            } else if(type == 4){
                this.showDates = false;
                this.todaysBills = true;
                d3.select("svg").html("");
                this.getTodaysBills();
            }
        }else{
            
        }
        
        
    }  
    
    private getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    ngOnInit() {
        
        
    }
}