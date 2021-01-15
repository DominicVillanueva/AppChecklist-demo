import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { IQuestions } from '../models/interfaces/IQuestions';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  urlBase: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
    this.urlBase = environment.www + environment.host_dev;
  }

  /**
   * Get data from the ApiForm
   * Return the questions and answers
   *
   * @return Observable with the results
   */
  getQuestions(): Observable<IQuestions[]> {
    return this.http.get<IQuestions[]>(`${this.urlBase}/questions/`)
      .pipe(
        retry(2),
        catchError(this.handleError)
    );
  }

  /**
   * Save user questions
   * Return message if save questions
   *
   * @param question: IData
   */
  postCreateQuestion(question) {
    return this.http.post(`${this.urlBase}/data/`, question, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }


   // Handle API errors
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}
