import { FormControl, Validators } from '@angular/forms';
import { Credenciais } from './../../models/credenciais';
import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  validaCampos(): boolean {
    if (this.email.valid && this.senha.valid) {
      return true;
    } else {
      return false;
    }
  }
 
}
