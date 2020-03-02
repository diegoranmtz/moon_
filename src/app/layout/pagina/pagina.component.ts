import { Component, OnInit, Input } from '@angular/core';
import { MonederoService } from 'src/shared/services/monedero.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccionService } from 'src/shared/services/accion.service';
import { PaginaService } from 'src/shared/services/pagina.service';
import { SidebarService } from 'src/shared/services/sidebar.service';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styleUrls: ['./pagina.component.scss']
})
export class PaginaComponent implements OnInit {
  monederos: any;
  form: FormGroup;
  accions: any;
  usuario: string;

  constructor(
    private monederoService: MonederoService,
    private formBuilder: FormBuilder,
    private accionService: AccionService,
    private paginaService: PaginaService,
    public sidebarService: SidebarService
  ){ }
  ngOnInit(){
    this.usuario = localStorage.getItem('usuario');
    this.createForm();
    this.selectMonederos();
  }

  onSubmit() {
    if (!this.form.valid)
     return;
   if (!this.form.dirty)
     return;

    const mergedItem = { ...this.form.value };
    mergedItem.usuario = this.usuario;
    console.log(mergedItem);
    this.insertItem(mergedItem);
  }

  createForm() {
    this.form = this.formBuilder.group({
      usuario: [{ value: this.usuario, disabled: true }, Validators.required],
      paginaKey: ['', Validators.required],
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
  cambioPagina(paginaKey){
    this.selectAccions(paginaKey);
  }
  changeSidebar(){
    this.sidebarService.updateSidebar();
  }
}
