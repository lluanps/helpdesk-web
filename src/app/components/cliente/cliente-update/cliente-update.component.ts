import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: ''
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, [Validators.required, Validators.maxLength(11)]);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService,
    private toastr: ToastrService,
    private router: Router,
    private actRoute: ActivatedRoute, //permite dar um get nos parametros que vem da Url
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.actRoute.snapshot.paramMap.get('id');//o nome dentro do parenteses tem q ser o msm dado na url de update colocado no app-routing
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      resposta.perfis = [];
      this.cliente = resposta;
    });
  }

  update(): void {
    this.service.update(this.cliente).subscribe(() => {
      this.toastr.success('Cliente atualizado com sucesso', 'Update')
      this.router.navigate(['intrutores']);
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
            this.toastr.error(element.message);
        });
      }else {
         this.toastr.error(ex.error.message);
      }
    });
  }

  addPerfil(perfil: any): void {
    // se clicar em um perfil ja selecionado, ele remove, caso contrario seleciona
    if (this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
      console.log(this.cliente.perfis);
    } else {
      this.cliente.perfis.push(perfil);
      console.log(this.cliente.perfis);
    }

  }

  validaCampos(): boolean {
    return this.nome.valid &&  this.cpf.valid && this.email.valid &&  this.senha.valid
  }


}