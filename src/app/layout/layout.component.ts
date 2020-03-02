import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

   public pushRightClass: string;
   constructor(private router: Router) {}

   ngOnInit() {
     this.pushRightClass = 'push-right';
   }

   onclickMenu() {
     this.toggleSidebar(this.pushRightClass);
  }

  toggleSidebar(classPushed){
    const dom: any = document.querySelector('body');
    dom.classList.toggle(classPushed);
    dom.classList.toggle('transAnimacion');
    dom.classList.toggle('bounceAnimacion');
  }
  onLoggedout(){
    localStorage.clear();
    return this.router.navigate(['login']);
  }
}
