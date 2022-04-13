/* eslint-disable max-len */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Mission } from '../models/mission';
import { DatabaseService } from '../shared/database.service';

import { Geolocation } from '@capacitor/geolocation';

declare let google: any;

@Component({
  selector: 'app-mission',
  templateUrl: './mission.page.html',
  styleUrls: ['./mission.page.scss'],
})
export class MissionPage implements OnInit {

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;
  mission: Mission;
  loading = true;
  map: any;
  myLoc: any;

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  // directionForm: FormGroup;

  constructor(private navController: NavController,
              private actRoute: ActivatedRoute,
              private db: DatabaseService) {
    db.getMissionById(actRoute.snapshot.params.id).then(mission => {this.mission = mission; this.loading = false;});
  }

  async ngOnInit() {
    await this.db.init();
  }

  goBack() {
    this.navController.back();
  }

  deleteMission(id: number) {
    this.db.deleteMissionById(id);
    this.goBack();
  }


  // map methods
  async ionViewDidEnter() {
    this.showMap();
    this.getCurrentLocation();
  }

  calculateAndDisplayRoute() {
    const that = this;
    console.log('debug');
    console.log('current latit: ' + this.myLoc.coords.latitude);
    console.log('current longi: ' + this.myLoc.coords.longitude);
    console.log('destination latit: ' + this.mission.location.latitude);
    console.log('destination longi: ' + this.mission.location.longitude);

    this.directionsService
      .route({
        origin: "100 sprucewood",
        destination: "85 Thorncliffe park",
        travelMode: google.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  showMap() {
    const location = new google.maps.LatLng(this.mission.location.latitude, this.mission.location.longitude);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkerToMap();
  }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log("current location: " + coordinates.coords.latitude)
    this.myLoc = coordinates;
    console.log(coordinates);
  }

  addMarkerToMap() {
    const position = new google.maps.LatLng(this.mission.location.latitude, this.mission.location.longitude);
    const mapMarker = new google.maps.Marker({
      position,
      title: this.mission.name,
      latitude: this.mission.location.latitude,
      longitude: this.mission.location.longitude,
      task: this.mission.tasks,
      tags: this.mission.tags
    });
    mapMarker.setMap(this.map);
    // this.addInfoWindowToMarker(mapMarker);
  }

  customNavigate() {
    console.log('navigate button clicked');
    // navigate using google maps
    // this is useless now
    // window.open('https://www.google.com/maps/dir?api=1&destination=' + this.mission.location.latitude + ',' + this.mission.location.longitude);
  }
}