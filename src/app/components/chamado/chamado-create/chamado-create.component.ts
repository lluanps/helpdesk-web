import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Instrutor } from 'src/app/models/instrutor';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { InstrutorService } from 'src/app/services/instrutor.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {

  chamado: Chamado = {
    prioridade:   '',
    status:       '',
    titulo:       '',
    observacoes:  '',
    instrutor:    '',
    cliente:      '',
    nomeCliente:  '',
    nomeInstrutor:'',
  }

  clientes: Cliente[] = []
  instrutores: Instrutor[]= []

  titulo: FormControl = new FormControl(null, [Validators.required])
  instrutor: FormControl = new FormControl(null, [Validators.required])
  cliente: FormControl = new FormControl(null, [Validators.required])
  status: FormControl = new FormControl(null, [Validators.required])
  prioridade: FormControl = new FormControl(null, [Validators.required])
  observacoes: FormControl = new FormControl(null, [Validators.required])

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private instrutorService: InstrutorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllIntrutores();
  }

  create(): void {
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toastr.success('Chamado criado com sucesso!', 'Novo Chamado Cadastrado');
      this.router.navigate(['chamados'])
    }, ex => {
      this.toastr.error(ex.error.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

  findAllIntrutores(): void  {
    this.instrutorService.findAll().subscribe(resposta => {
      this.instrutores = resposta;
    })
  }

  validaCampos(): boolean {
    return this.titulo.valid &&
        this.instrutor.valid &&
        this.cliente.valid &&
        this.status.valid &&
        this.prioridade.valid &&
        this.observacoes.valid
  }

}
