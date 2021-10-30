import {EventEmitter, Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthResponse, AuthUser} from "../../types/types";
import {throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private serverUrl = environment.serverUrl;
  private loggedUser!: string;
  private eventEmitter = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  public login(user: AuthUser) {
    return this.httpClient.post<AuthResponse>(`${this.serverUrl}/api/auth/login`, user, { withCredentials: true })
      .pipe(
        map(result => {
          console.log("Session Service Login Result: ", result);
          this.loggedUser = result.content.loggedUser;
          console.log(this.loggedUser);
          this.eventEmitter.emit(this.loggedUser);
          return result;
        }),
        catchError(this.handleError)
      )
  }

  public logout() {
    return this.httpClient.post(`${this.serverUrl}/api/auth/logout`, {}, { withCredentials: true })
      .pipe(
        map(result => {
          console.log("Session Service Logout Result: ", result);
          this.loggedUser = '';
          this.eventEmitter.emit(this.loggedUser);
        }),
        catchError(this.handleError)
      )
  }

  public isLoggedIn() {
    return this.httpClient.post<AuthResponse>(`${this.serverUrl}/api/auth/checkSession`, {}, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      )
  }

  public getEventEmitter() {
    return this.eventEmitter;
  }

  private handleError(error: HttpErrorResponse) {
    return throwError('We are having issues, please try again.');
  }
}
