import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Globals } from 'src/globals';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private globals: Globals) { }

  private apiUrl = "https://skool-workshop-api.herokuapp.com/api"
  private token: String = "";

  login(email: String, password: String): Observable<any> {
    return this.http.post(this.apiUrl + '/account/login', {
      username: email,
      password: password
    }).pipe(catchError(error => {
      console.log(error)
      return ([{ error: "error" }]);
    }));
  }

  getAllCustomers(): Observable<any> {
    this.token = new String("Bearer " + this.globals.login_token);
    return this.http.get(this.apiUrl + `/customer`, {
      headers: new HttpHeaders().set('Authorization', String(this.token))
    });
  }

  createNewQuiz(title: string, link: String) {
    return this.http.post(this.apiUrl + `/quiz`, {
      title: title,
      url: link,
      status: false
    }).pipe(catchError(error => {
      console.log(error)
      return ([{ error: error }])
    }));
  }

  getAllQuizes() {
    return this.http.get(this.apiUrl + `/quiz`, {}).pipe(catchError(error => {
      console.log(error)
      return ([{ error: error }])
    }));
  }

  setQuizStatus(title: String, status: boolean) {
    return this.http.put(this.apiUrl + `/quiz/${title}`, {}).pipe(catchError((error: any) => {
      console.log(error)
      return ([{ error: error }])
    }));
  }
}
