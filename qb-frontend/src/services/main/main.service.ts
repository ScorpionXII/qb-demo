import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {MixedContact} from "../../types/types";

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private serverUrl = environment.serverUrl;

  constructor(private httpClient: HttpClient) { }

  public getMixedContactList() {
    return this.httpClient.get<Array<MixedContact>>(`${this.serverUrl}/api/mixedContact`, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  public createContactFromGithub(inputData: object) {
    return this.httpClient.post(`${this.serverUrl}/api/main`, inputData, { withCredentials: true })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.error('Client side error occurred: ', error.error);
    } else {
      console.error('Backend side error occurred: ', error.error);
    }
    return throwError('We are having issues, please try again.');
  }

}
