import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiService } from '../../services/api.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';

@Component({
  selector: 'app-plants',
  templateUrl: './plants.page.html',
  styleUrls: ['./plants.page.scss'],
})
export class PlantsPage implements OnInit {

  constructor(private auth: AuthenticationService, private api: ApiService, private camera: Camera, private file: File) {
    this.LoadPlants();
  }
  plants: any[]
  createMode: boolean = false;
  newPlantName: any = "";
  newPlantNotes: any = "";
  newPlantNoDaysWateringInterval: any = 1;
  newPlant: any;
  ngOnInit() {
  }
  LoadPlants() {
    this.auth.getToken(this, function (t, token) {
      t.api.GetPlants(token).subscribe((data) => {
        t.plants = data;
      });
    })
  }
  AddPlant() {

    this.auth.getToken(this, function (t, token) {


      var sourceType = t.camera.PictureSourceType.CAMERA;
      var options: CameraOptions = {
        quality: 20,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
      };

      t.camera.getPicture(options).then(imagePath => {

        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        t.file.readAsDataURL(correctPath, currentName).then((s) => {
          t.newPlant = new Object();
          t.newPlant.PictureBinary = s.substr(23);
          t.newPlant.PlantName = t.newPlantName;
          t.newPlant.NoDaysWateringInterval = t.newPlantNoDaysWateringInterval;
          t.newPlant.Notes=t.newPlantNotes;
          t.newPlant.AccountId = token;
          t.api.CreatePlant(t.newPlant).subscribe((data) => {
            if (data["rowKey"]) {
              t.plants.push(data);
              t.createMode = !t.createMode;
            }
          });
        })
      });
    })
  }
}
