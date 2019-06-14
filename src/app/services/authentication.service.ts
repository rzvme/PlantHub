import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../services/api.service';
 
const USER_TOKEN = 'user-token';
 
@Injectable({
  providedIn: 'root'
})
// subscribe((data)=>{return data;})
//   }

export class AuthenticationService {
 
  authenticationState = new BehaviorSubject(false);
 
  constructor(private storage: Storage, private plt: Platform, private api: ApiService) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
 
  checkToken() {
    this.storage.get(USER_TOKEN).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
  getToken(transport, cb) {
    this.storage.get(USER_TOKEN).then(res => {
      if (res) {
        cb(transport, res);
      }
    })
  }

  login(userKey) {
    // return this.storage.set(USER_TOKEN, 'Bearer 1234567').then(() => {
    //   this.authenticationState.next(true);
    // });
    //TODO: aici call sa iau full user based on token
    this.api.GetAccount(userKey).subscribe((data)=>{
      if(data["rowKey"])
        this.storage.set(USER_TOKEN,data["rowKey"]).then(()=>{
          this.authenticationState.next(true);
        });
    })
    return this.isAuthenticated();
  }

  register(user_name)
  {
    this.api.CreateAccount(user_name).subscribe((data)=>{
      this.storage.set(USER_TOKEN,data["rowKey"]).then(()=>{
        this.authenticationState.next(true);
      })
    })
  }
  
 
  logout() {
    return this.storage.remove(USER_TOKEN).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
}