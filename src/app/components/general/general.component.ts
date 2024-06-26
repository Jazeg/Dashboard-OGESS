import { Component } from '@angular/core';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent {


  //dato en gráfico de lineas 
  lineChartData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
    datasets: [{
      label: 'Ventas 2023',
      data: [65, 59, 80, 81, 56, 55, 40],
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }, {
      label: 'Ventas 2024',
      data: [28, 48, 40, 19, 86, 27, 90],
      borderColor: 'rgb(255, 99, 132)',
      tension: 0.1
    }]
  };

  lineChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Gráfico de Líneas de Ventas'
      }
    }
  };

  atendidosData = {
    labels: ['I Trim', 'II Trim', 'III Trim', 'IV Trim', 'AÑO'],
    datasets: [{
      label: 'ATENDIDOS 2023',
      data: [47211, 25568, 28891, 28431, 125087],
      backgroundColor: 'rgba(135, 206, 235, 0.8)',
    }, {
      label: 'ATENDIDOS 2024',
      data: [56079, 0, 0, 0, 56079],
      backgroundColor: 'rgba(205, 92, 92, 0.8)',
    }]
  };

  atencionesData = {
    labels: ['I Trim', 'II Trim', 'III Trim', 'IV Trim', 'AÑO'],
    datasets: [{
      label: 'ATENCIONES 2023',
      data: [156566, 234587, 240472, 220428, 888757],
      backgroundColor: 'rgba(144, 238, 144, 0.8)',
    }, {
      label: 'ATENCIONES 2024',
      data: [210358, 0, 0, 0, 210358],
      backgroundColor: 'rgba(147, 112, 219, 0.8)',
    }]
  };

    // Datos para el gráfico de Extensión de Uso 2024
  extensionUsoData = {
    labels: ['I Trim', 'II Trim', 'III Trim', 'IV Trim', 'AÑO'],
    datasets: [
      {
        label: 'Categoría 1',
        data: [20.5, 0, 0, 0, 54.3],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
      {
        label: 'Categoría 2',
        data: [24.0, 0, 0, 0, 24.0],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: 'Categoría 3',
        data: [11.5, 11.5, 10.7, 11.5, 11.5],
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
      },
      {
        label: 'Categoría 4',
        data: [0, 0, 0, 0, 0],
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      }
    ]
  };

    // Datos para el gráfico de Intensidad de Uso 2024
    intensidadUsoData = {
      labels: ['I Trim', 'II Trim', 'III Trim', 'IV Trim', 'AÑO'],
      datasets: [
        {
          label: 'Categoría 1',
          data: [3.3, 0, 0, 0, 2.2],
          backgroundColor: 'rgba(255, 99, 132, 0.8)',
        },
        {
          label: 'Categoría 2',
          data: [2.2, 8.8, 9.7, 8.3, 6.8],
          backgroundColor: 'rgba(54, 162, 235, 0.8)',
        }
      ]
    };
  


  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          font: { size: 10 }
        }
      },
      x: {
        ticks: {
          font: { size: 10 }
        }
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 10 }
        }
      },
      title: {
        display: true,
        font: { size: 14, weight: 'bold' }
      }
    }
  };

  atendidosOptions = {
    ...this.chartOptions,
    plugins: {
      ...this.chartOptions.plugins,
      title: {
        ...this.chartOptions.plugins.title,
        text: 'ATENDIDOS'
      }
    }
  };

  atencionesOptions = {
    ...this.chartOptions,
    plugins: {
      ...this.chartOptions.plugins,
      title: {
        ...this.chartOptions.plugins.title,
        text: 'ATENCIONES'
      }
    }
  };

    // Opciones específicas para Extensión de Uso
    extensionUsoOptions = {
      ...this.chartOptions,
      plugins: {
        ...this.chartOptions.plugins,
        title: {
          ...this.chartOptions.plugins.title,
          text: 'EXTENSIÓN DE USO 2024'
        }
      }
    };

    // Opciones específicas para Intensidad de Uso
    intensidadUsoOptions = {
      ...this.chartOptions,
      plugins: {
        ...this.chartOptions.plugins,
        title: {
          ...this.chartOptions.plugins.title,
          text: 'INTENSIDAD DE USO 2024'
        }
      }
    };

}