import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Credenciais } from 'src/app/models/credenciais';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: Credenciais =  {
    email: '',
    senha: ''
  }

  // verifica email
  email = new FormControl(null, Validators.email);
  // verifica senha 
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void { }

  logar() {
    this.service.authenticate(this.creds).subscribe(resposta => {
      this.service.successFullLogin(resposta.headers.get('Authorization').substring(7));
      this.router.navigate([''])
    }, () => {
      this.toast.error('Usuário e/ou senha inválidos');
    })
  }

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid
  }
 
}
