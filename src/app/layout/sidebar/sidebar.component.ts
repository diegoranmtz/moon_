import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit {
  public showMenu: string;
  constructor() {}
  ngOnInit() {}

  addExpandClass(element: string) {
    if (element === this.showMenu)
      this.showMenu = '';
    else
      this.showMenu = element;
  }
}
