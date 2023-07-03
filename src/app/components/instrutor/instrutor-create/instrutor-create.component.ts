import { Instrutor } from 'src/app/models/instrutor';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InstrutorService } from 'src/app/services/instrutor.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instrutor-create',
  templateUrl: './instrutor-create.component.html',
  styleUrls: ['./instrutor-create.component.css']
})
export class InstrutorCreateComponent implements OnInit {

  instrutor: Instrutor = {
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
    private service: InstrutorService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.instrutor).subscribe(() => {
      this.toastr.success('Instrutor cadastrado com sucesso', 'Cadastro')
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
    if (this.instrutor.perfis.includes(perfil)) {
      this.instrutor.perfis.splice(this.instrutor.perfis.indexOf(perfil), 1);
      console.log(this.instrutor.perfis);
    } else {
      this.instrutor.perfis.push(perfil);
      console.log(this.instrutor.perfis);
    }

  }

  validaCampos(): boolean {
    return this.nome.valid &&  this.cpf.valid && this.email.valid &&  this.senha.valid
  }


}
