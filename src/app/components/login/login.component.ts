import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from './../../models/credenciais';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds?: Credenciais =  {
    email: '',
    senha: ''
  }

  // verifica email
  email = new FormControl(null, Validators.email);
  // verifica senha 
  senha = new FormControl(null, Validators.minLength(3));

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
  }

  logar() {
    this.toast.error("Usuário e/ou senha inválido!", 'Login');
    //limpa campo senha após msg de erro no toastr 
    this.creds.senha = '';
  }

  validaCampos(): boolean {
    if (this.email.valid && this.senha.valid) {
      return true;
    } else {
      return false;
    }
  }
 
}
