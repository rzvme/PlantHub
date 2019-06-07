import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.page.html',
  styleUrls: ['./plants.page.scss'],
})
export class PlantsPage implements OnInit {

  constructor(private auth: AuthenticationService, private api: ApiService) {
    this.LoadPlants();
   }
  plants:any[]
  ngOnInit() {
  }
  LoadPlants(){
    this.auth.getToken(this, function(t, token){
      t.api.GetPlants(token).subscribe((data)=>{
        t.plants=data;
      });
    })
  }

}
