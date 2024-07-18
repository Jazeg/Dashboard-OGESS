import { Component } from '@angular/core';

@Component({
  selector: 'app-indicadores',
  templateUrl: './indicadores.component.html',
  styleUrls: ['./indicadores.component.css']
})
export class IndicadoresComponent {
  people = [
    { name: 'Andrew Mike', job: 'Develop', salary: 99225 },
    { name: 'John Doe', job: 'Design', salary: 89241 },
    { name: 'Alex Mike', job: 'Design', salary: 92144 },
    { name: 'Mike Monday', job: 'Marketing', salary: 49990 },
    { name: 'Paul Dickens', job: 'Communication', salary: 69201 }
  ];
}
