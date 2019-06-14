import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

  constructor(private auth: AuthenticationService, private api: ApiService) {
    this.toggle=new Int16Array();
    this.LoadSchedule();
  }
  schedule: any[];
  plantData: any;
  toggle:Int16Array;
  ngOnInit() {
  }
  LoadSchedule() {
    this.auth.getToken(this, function (t, token) {
      t.api.GetSchedule(token).subscribe((data) => {
        t.schedule = data;
        t.schedule.forEach(element => {
          element.needsWater=true;
        });
      });
    })
  }
  WaterPlant(plant)
  {
    this.plantData=new Object();
    this.plantData.AccountId=plant.partitionKey;
    this.plantData.PlantId=plant.rowKey;
    this.api.WaterPlant(this.plantData).subscribe((data)=>{
      plant.needsWater=false;
    })

  }
}
