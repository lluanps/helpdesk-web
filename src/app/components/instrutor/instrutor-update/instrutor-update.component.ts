import { Component, OnInit } from '@angular/core';
import { Instrutor } from 'src/app/models/instrutor';
import { FormControl, Validators } from '@angular/forms';
import { InstrutorService } from 'src/app/services/instrutor.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-instrutor-update',
  templateUrl: './instrutor-update.component.html',
  styleUrls: ['./instrutor-update.component.css']
})
export class InstrutorUpdateComponent implements OnInit {
  
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
    private actRoute: ActivatedRoute, //permite dar um get nos parametros que vem da Url
  ) { }

  ngOnInit(): void {
    this.instrutor.id = this.actRoute.snapshot.paramMap.get('id');//o nome dentro do parenteses tem q ser o msm dado na url de update colocado no app-routing
    this.findById();
  }

  findById(): void {
    this.service.findById(this.instrutor.id).subscribe(resposta => {
      resposta.perfis = [];
      this.instrutor = resposta;
    });
  }

  update(): void {
    this.service.update(this.instrutor).subscribe(() => {
      this.toastr.success('Instrutor atualizado com sucesso', 'Update')
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

