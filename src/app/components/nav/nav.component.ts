import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {


  constructor(private router: Router, private authservice: AuthService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.router.navigate(['home'])
    this.toast.show("Acesso o menu no canto superior esquerdo para mais informações", "Bem vindo!", {timeOut:6000});
  }

  logout() {
    this.router.navigate(['login']);
    this.authservice.logout();
    this.toast.show("Logout realizado com sucesso!", 'Logout', {timeOut: 7500})
  }

}
