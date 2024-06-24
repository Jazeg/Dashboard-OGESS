import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  @Input() chartData: any;
  @Input() chartOptions: any;
  @Input() chartType: string = 'line';

  chart: Chart | undefined;

  ngOnInit() {}

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    if (this.chartCanvas && this.chartCanvas.nativeElement) {
      this.chart = new Chart(this.chartCanvas.nativeElement, {
        type: this.chartType as any,
        data: this.chartData,
        options: this.chartOptions
      });
    }
  }
}