import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/shared/services/usuario.service';
import { Login } from 'src/shared/models/login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  form: FormGroup;
  get name(){ return this.form.get('name') };
  get account(){ return this.form.get('account') };
  get password(){ return this.form.get('password') };

  constructor(private formBuilder: FormBuilder, private router: Router, private usuarioService: UsuarioService){

  }
  ngOnInit(){
    this.createForm();
  }

  onSubmit(){
    if (!this.form.valid)
      return;
    if (!this.form.dirty)
      return;
      this.insertItem({ name: this.name.value, account: this.account.value, password: this.password.value })
  }

  createForm(){
    this.form = this.formBuilder.group({
      account: ['', [Validators.required]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  insertItem(item: any){
    this.usuarioService.insertItem(item).subscribe(
      (data) => this.insertItemComplete(data),
      (error) => alert('Error en el registro'));
  }

  insertItemComplete(data){
    if(data.ok){
      alert('Usuario creado con exito');
      this.router.navigate(['/login']);
    }
    if(data.errors._message === 'Usuario validation failed')
      this.account.setErrors({'exist': true});
  }
}
