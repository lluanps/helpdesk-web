import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Instrutor } from 'src/app/models/instrutor';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { InstrutorService } from 'src/app/services/instrutor.service';

@Component({
  selector: 'app-chamado-update',
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {

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
    private router: Router,
    private ActRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.ActRoute.snapshot.paramMap.get('id');
    this.findById();
    this.findAllClientes();
    this.findAllIntrutores();
  }

  findById():void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
    }, ex => {
      this.toastr.error(ex.error.error);
    })
  }

  update(): void {
    this.chamadoService.update(this.chamado).subscribe(resposta => {
      this.toastr.success('Chamado atualizado com sucesso!', 'Cadastrado atualizado');
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

  retornaStatus(status: any): string {
    if (status == '0') {
      return 'ABERTO'
    } else if (status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: any): string {
    if (prioridade == '0') {
      return 'BAIXA'
    }else if (prioridade == '1') {
      return 'MÉDIA'
    }else {
      return 'ALTA'
    }
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
