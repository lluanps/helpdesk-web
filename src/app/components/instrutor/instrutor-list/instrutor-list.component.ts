import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Instrutor } from 'src/app/models/instrutor';

@Component({
  selector: 'app-instrutor-list',
  templateUrl: './instrutor-list.component.html',
  styleUrls: ['./instrutor-list.component.css']
})
export class InstrutorListComponent implements OnInit {

  ELEMENT_DATA: Instrutor[] = [
    {    
      id: 1,
      nome: 'Luan Pinheiro',
      cpf: '123.456.789-10',
      email: 'luan@gmail.com',
      senha: 'admin',
      perfis: ['0'],
      dataCriacao: '29/06/2023'
    }
  ];
  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acoes'];
  dataSource = new MatTableDataSource<Instrutor>(this.ELEMENT_DATA);

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

