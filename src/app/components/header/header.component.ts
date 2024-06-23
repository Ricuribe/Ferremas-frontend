import {Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef} from '@angular/core';
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
export class HeaderComponent implements OnInit, OnChanges {

  isLoggedIn: boolean = true;
  userData: any = {
    "user": ""
  }

  constructor(private sessionService: SessionService,
              private apiService: ApiRestService,
              private snackBar: MatSnackBar,
              protected router: Router,
              private storage: StorageMap,
              private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {

      // @ts-ignore
    this.sessionService.hasSessionData().subscribe((exists: boolean) => {
      this.isLoggedIn = exists;
      console.log("Usuario existe?: ", exists);
      if (!exists) {
        return false
      }
      this.sessionService.getSessionData().subscribe((data: any) => {
        this.userData = data;
        console.log(data);
      });
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    this.reload()
  }


  Logout() {

    this.storage.clear().subscribe(() => {
      window.location.reload()
      return;
  })


    this.apiService.logout(this.userData.token).subscribe(
      response => {

        this.snackBar.open('Ha cerrado sesión', 'Cerrar', {
          duration: 2000
        });

        this.snackBar.open('Ha cerrado sesión 2', 'Cerrar', {
          duration: 2000
        });
        this.router.navigate(['/home']);
      },
      error => {

        if (error.status === 400) {
          this.snackBar.open('Error', 'Cerrar', {
            duration: 2000
          });
          return;
        }
        this.snackBar.open('Error en el cierre de sesión', 'Cerrar', {
          duration: 2000
        });
        this.storage.clear().subscribe()
      }
    );
  }
  reload(){
    this.cdRef.detectChanges();
  }
}
