import { Component, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Cantidad",
          data: [3, 5, 0, 2]
        }
      ],
      chart: {
        height: 350,
        type: "bar"
      },
      title: {
        text: "Estados de las Obras"
      },
      xaxis: {
        categories: ["Asignada", "En Desarrollo", "En Revisión", "Aceptada"]
      }
    };
  }
}
