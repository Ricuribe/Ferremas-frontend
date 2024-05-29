import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../services/session.service";
import {ApiRestService} from "../../services/api-rest.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {StorageMap} from "@ngx-pwa/local-storage";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = true;
  userData: any = ""

  constructor(private sessionService: SessionService,
              private apiService: ApiRestService,
              private snackBar: MatSnackBar,
              private router: Router,
              private storage: StorageMap) { }

  ngOnInit(): void {
    // @ts-ignore
    this.sessionService.hasSessionData('userSession').subscribe((exists: boolean) => {
      this.isLoggedIn = exists;
      console.log(this.isLoggedIn);
      console.log(exists);
      if (!exists) {
        return false
      }
      this.sessionService.getSessionData('userSession').subscribe((data: any) => {
        this.userData = data;
        console.log(data);
      });
    })
  }


  Logout() {

    this.storage.clear()
    this.snackBar.open('Ha cerrado sesión', 'Cerrar', {
      duration: 2000
    });
    this.router.navigate(['/home']);
    return;
    this.apiService.logout(this.userData.token).subscribe(
      response => {
        this.snackBar.open('Ha cerrado sesión', 'Cerrar', {
          duration: 2000
        });

      },
      error => {
        if (error.status === 400) {
          this.snackBar.open('Error', 'Cerrar', {
            duration: 2000
          });
          return;
        }
        this.snackBar.open('Error en el inicio de sesión', 'Cerrar', {
          duration: 2000
        });
      }
    );
  }
}
