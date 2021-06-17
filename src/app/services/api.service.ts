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
    return this.http.get(this.apiUrl + `/webapp/customer`, {
      headers: new HttpHeaders().set('Authorization', String(this.token))
    });
  }

  createNewQuiz(title: String, link: String) {
    return this.http.post(this.apiUrl + `/quiz`, {
      title: title,
      url: link,
      status: false
    }).pipe(catchError(error => {
      console.log(error)
      return ([{ error: error }]);
    }));
  }

  getAllQuizes() {
    return this.http.get(this.apiUrl + `/quiz`, {}).pipe(catchError(error => {
      console.log(error)
      return ([{ error: error }]);
    }));
  }

  setQuizStatus(title: String, status: boolean) {
    return this.http.put(this.apiUrl + `/quiz/${title}`, {}).pipe(catchError((error: any) => {
      console.log(error)
      return ([{ error: error }]);
    }));
  }

  sendNotificationToEveryone(message: String, title: String) {
    return this.http.post(this.apiUrl + `/message/topic`, { title: title, description: message, topic: "main" }).pipe(catchError((error: any) => {
      console.log(error)
      return ([{ error: error }]);
    }))
  }

  sendNotificationToAccount(message: String, title: String, tokens: Array<any>) {
    console.log({ title: title, description: message, userTokens: tokens })
    return this.http.post(this.apiUrl + `/message/multiple`, { title: title, description: message, userTokens: tokens }).pipe(catchError((error: any) => {
      console.log(error)
      return ([{ error: error }])
    }))
  }

  getLoginAnalytics() {
    return this.http.get(this.apiUrl + `/analytics/totalLogins`, {}).pipe(catchError((error: any) => {
      console.log(error);
      return ([{ error: error }])
    }))
  }

  getOrderAnalytics() {
    return this.http.get(this.apiUrl + `/analytics/totalOrders`, {}).pipe(catchError((error: any) => {
      console.log(error);
      return ([{ error: error }])
    }))
  }

  getAppOpenAnalytics() {
    return this.http.get(this.apiUrl + `/analytics/totalAppOpens`, {}).pipe(catchError((error: any) => {
      console.log(error);
      return ([{ error: error }])
    }))
  }



}
