import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private APIEndpointURL = "https://planthubapi.azurewebsites.net/api/";
  private APIAccountSuffix="accounts";
  private APIPlantsSuffix="plants";
  constructor(private http: HttpClient) { }
  CreateAccount(user_name){
    var user = {"AccountName":user_name}
    return this.http.post(this.APIEndpointURL+this.APIAccountSuffix,user);
  }
  GetPlants(userKey)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'key':  userKey
      })
    };
    return this.http.get(this.APIEndpointURL+this.APIPlantsSuffix, httpOptions);
  }
}
