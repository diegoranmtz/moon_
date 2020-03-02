import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/shared/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from 'src/shared/models/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  get account(){ return this.form.get('account') };
  get password(){ return this.form.get('password') };

    constructor(private loginService: LoginService, private formBuilder: FormBuilder,
  private router: Router){}

  ngOnInit(){
    this.createForm();
  }

  onSubmit(){
    if (!this.form.valid)
      return;
    if (!this.form.dirty)
      return;
    this.selectLogin(this.account.value, this.password.value);
  }

  createForm() {
    this.form = this.formBuilder.group({
      account: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  selectLogin(account: any, password: any){
    this.loginService.selectItem({ account: account, password: password }).subscribe(
      (data) => { this.selectLoginComplete(data)},
      (error) => { alert('Error en el login'); console.log(error); }
    );
  }
  selectLoginComplete(login: Login){
    if(login.ok){
      this.saveLocalStorage(login.usuario.account);
      return this.router.navigate(['app/dashboard']);
    }
    this.account.setErrors({'exist': true});
  }
  saveLocalStorage(usuario){
    localStorage.setItem('usuario', usuario);
  }
}
