import { Component, OnInit } from '@angular/core';
import { MonederoService } from 'src/shared/services/monedero.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccionService } from 'src/shared/services/accion.service';
import { PaginaService } from 'src/shared/services/pagina.service';
import { SidebarService } from 'src/shared/services/sidebar.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accion',
  templateUrl: './accion.component.html',
  styleUrls: ['./accion.component.scss']
})
export class AccionComponent implements OnInit {
  monederos: any;
  form: FormGroup;
  accions: any;
  usuario: string;
  paginaKey: string;
  pagina: any;
  mergedItem: any;

  constructor(
    private monederoService: MonederoService,
    private formBuilder: FormBuilder,
    private accionService: AccionService,
    private paginaService: PaginaService,
    public sidebarService: SidebarService,
    private route: ActivatedRoute,
    private router: Router
  ){ }
  ngOnInit(){
    this.usuario = localStorage.getItem('usuario');
    this.createForm();
    this.route.params.subscribe( paramMap => {
      this.paginaKey = paramMap['paginaKey'];
      this.form.get('paginaKey').setValue(this.paginaKey);
      this.cambioPagina(this.paginaKey);
    });
    this.selectMonederos();
  }

  onSubmit() {
    this.mergedItem = null;
    if (!this.form.valid)
     return;
   if (!this.form.dirty)
     return;

    const mergedItem = { ...this.form.value };
    mergedItem.usuario = this.usuario;
    mergedItem.paginaKey = this.paginaKey;
    this.mergedItem = mergedItem;

    this.selectPagina({usuario: mergedItem.usuario, accionKey: mergedItem.accionKey});
  }

  createForm() {
    this.form = this.formBuilder.group({
      usuario: [{ value: this.usuario, disabled: true }, Validators.required],
      paginaKey: [{ value: '', disabled: true }, Validators.required],
      accionKey: ['', Validators.required],
      precioBuy: ['', [Validators.required, Validators.min(1)]],
      cantidad: ['', [Validators.required,  Validators.min(1)]]
    });
  }
  selectMonederos(){
    this.monederoService.selectItems().subscribe(
    (data) => { this.monederos = data.monederos },
    (error) => { alert('Ha ocurrido un error') });
  }
  selectAccions(paginaKey: string){
    this.accionService.selectItem_paginaKey({ paginaKey: paginaKey }).subscribe(
    (data) => { this.accions = data.acion },
    (error) => { alert('Ha ocurrido un error') });
  }
  insertItem(item){
    this.paginaService.insertItem(item).subscribe(
      () => { alert('Guardado con éxito') },
      (error) => { alert('Ha ocurrido un error') },
      () => { this.changeSidebar() });
  }
  selectPagina(item) {
    this.paginaService.selectItem_Usuario_AccionKey(item).subscribe(
      (data) => { this.pagina = data.acion },
      (error) => { alert('Ha ocurrido un error') },
      () =>  { this.selectPaginaComplete() });
  }
  cambioPagina(paginaKey){
    this.selectAccions(paginaKey);
  }
  changeSidebar(){
    this.sidebarService.updateSidebar();
    this.redirect();
  }
  redirect(){
    this.router.navigate(['/app/monedero/' + this.form.get('accionKey').value]);
  }
  selectPaginaComplete() {
    if(this.pagina.length > 0)
      return alert('Ya existe esta acción.');
    this.insertItem(this.mergedItem);
  }
}
