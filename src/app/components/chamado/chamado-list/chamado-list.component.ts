import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Chamado } from 'src/app/models/chamado';

@Component({
  selector: 'app-chamado-list',
  templateUrl: './chamado-list.component.html',
  styleUrls: ['./chamado-list.component.css']
})
export class ChamadoListComponent implements OnInit {

  ELEMENT_DATA: Chamado[] = [{
    id: 1,
    dataAbertura: '04/07/2023',
    dataFechamento: '05/07/2023',
    prioridade: 'Alta',
    status: 'Andamento',
    titulo: 'Chamado 1',
    observacoes: 'Teste chamado 1',
    instrutor: 'Ronaldo',
    cliente: 'Pedro',
    nomeCliente: 'Luan',
    nomeInstrutor: 'Ronaldo',
    }
  ]

  displayedColumns: string[] = ['id', 'titulo','cliente', 'instrutor', 'dataAbertura','prioridade', 'status','acoes'];
  datasource = new MatTableDataSource<Chamado>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

}
