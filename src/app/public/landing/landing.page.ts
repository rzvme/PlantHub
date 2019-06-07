import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private authService: AuthenticationService) { }
  regUserName: any
  userToken: any
  ngOnInit() {

  }
  login() {
    // TODO: fill in code here
  }
  register() {
    this.authService.register(this.regUserName);
  }
}
