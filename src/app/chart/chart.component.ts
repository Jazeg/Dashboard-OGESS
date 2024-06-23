import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Chart, Ticks, registerables, scales } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: Chart | undefined;

  ngOnInit() {
    // Inicializaciones que no dependen de la vista
  }

  ngAfterViewInit() {
    this.createChart();
  }

  createChart() {
    if (this.chartCanvas && this.chartCanvas.nativeElement) {
      const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
        datasets: [{
          label: 'Ventas 2023',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }, {
          label: 'Ventas 2024',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1
        }]
      };

      const config = {
        type: 'line' as const,
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top' as const,
              labels: {
                font: {
                  size: 14 // Aumenta el tamaño de la fuente de la leyenda
                }
              }
            },
            title: {
              display: true,
              text: 'Gráfico de Líneas de Ventas',
              font: {
                size: 20 // Aumenta el tamaño del título
              }
            }
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 14 // Aumenta el tamaño de las etiquetas del eje X
                }
              }
            },
            y: {
              ticks: {
                font: {
                  size: 14 // Aumenta el tamaño de las etiquetas del eje Y
                }
              }
            }
          }
        },
      };
  
      this.chart = new Chart(this.chartCanvas.nativeElement, config);
    } else {
      console.error('El elemento canvas no está disponible');
    }
  }
}