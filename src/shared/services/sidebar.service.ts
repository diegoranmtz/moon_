import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private changed = new Subject();

  constructor() {
  }
  updateSidebar(){
    return this.changed.next();
  }
  getSidebar(){
    return this.changed;
  }
}
