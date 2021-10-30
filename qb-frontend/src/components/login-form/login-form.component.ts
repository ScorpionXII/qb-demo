import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AuthResponse, AuthUser} from "../../types/types";
import { SessionService } from "../../services/session/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  loginInvalid: boolean = false;

  constructor(private formBuilder: FormBuilder, private sessionService: SessionService, private router: Router) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.sessionService.isLoggedIn()
      .subscribe(
        (result) => {
          if (result.content && result.content.loggedUser) {
            this.router.navigate(['home'] );
          }
        },
        (error) => { console.log(error) }
      );
  }

  onSubmit() {
    console.log('OK');
    const authUser: AuthUser = {
      username: this.form.get('username')?.value,
      password: this.form.get('password')?.value
    }
    this.sessionService.login(authUser).subscribe(
      (result) => {
        if (result.content && result.content.loggedUser) {
          this.router.navigate(['home'] );
        }
      },
      (error) => { this.loginInvalid = true }
    );
  }
}
