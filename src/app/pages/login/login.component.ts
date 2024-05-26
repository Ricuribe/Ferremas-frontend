import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiRestService} from "../../services/api-rest.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: ApiRestService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9@.\/+_-]*$/),
          Validators.maxLength(50)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.isLoading = false;
          this.snackBar.open('Hecho', 'Cerrar', {
            duration: 2000
          });
        },
        error => {
          this.isLoading = false;
          this.snackBar.open('Error en el inicio de sesión', 'Cerrar', {
            duration: 2000
          });
        }
      );
    }
  }
}

