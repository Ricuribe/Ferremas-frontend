import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiRestService} from "../../services/api-rest.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private restService: ApiRestService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9@.\/+_-]*$/),
          Validators.maxLength(50)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(70)
        ]
      ],
      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      ]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    // @ts-ignore
    return formGroup.get('password').value === formGroup.get('confirmPassword').value
      ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { confirmPassword, ...parsedData } = this.registerForm.value;
      this.isLoading = true;
      const registerData = {
        'username': parsedData.username,
        'email': parsedData.email,
        'first_name': parsedData.firstName,
        'last_name': parsedData.lastName,
        'password': parsedData.password
      }
      this.restService.register(registerData).subscribe(
        response => {
          this.isLoading = false;
          console.log(response)
          this.snackBar.open('Registro exitoso', 'Cerrar', {
            duration: 2000
          });
          this.router.navigate(['/login']);
        },
        error => {
          this.isLoading = false;
          if (error.status === 400) {
            this.snackBar.open('Error: Error de datos', 'Cerrar', {
              duration: 2000
            });
            return;
          }
          this.snackBar.open('Error en el registro', 'Cerrar', {
            duration: 2000
          });
        }
      );
    }
  }

}
