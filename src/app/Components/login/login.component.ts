import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private auth:AuthService, private router: Router){}

  login(form:NgForm){
    this.auth.login(form.value.username, form.value.password).subscribe(
      {
        next: ()=>{this.router.navigate(['home'])},
        error:(err) =>{}
      }
    )
  }
}
