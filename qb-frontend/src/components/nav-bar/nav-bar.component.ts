import { Component, OnInit } from '@angular/core';
import {SessionService} from "../../services/session/session.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedUser: string = ''

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
    this.sessionService.isLoggedIn()
      .subscribe(
        (authResponse) => {
          if (authResponse.content) {
            this.loggedUser = authResponse.content.loggedUser;
          }
        }
      );

    this.sessionService.getEventEmitter()
      .subscribe(
        (loggedUser) => { this.loggedUser = loggedUser }
      );
  }

  logout() {
    this.sessionService.logout()
      .subscribe(
        () => { this.router.navigate(['']) }
      );
  }
}
