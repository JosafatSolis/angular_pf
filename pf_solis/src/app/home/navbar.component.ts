import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromStore from '../session/root-store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private store: Store,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  navigateTo(dest: string) {
    switch (dest) {
      case 'alumnos':
        this.router.navigate(['home', 'alumnos']);
        break;
      case 'inscripciones':
        this.router.navigate(['home', 'inscripciones'])
        break;
        case 'cursos':
          this.router.navigate(['home', 'cursos'])
          break;
        case 'usuarios': 
          this.router.navigate(['auth', 'usuarios'])
        break;
      default:
        this.router.navigate(['home'])
        break;
    }
  }

}
