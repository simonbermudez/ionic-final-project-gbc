/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Mission } from '../models/mission';
import { DatabaseService } from '../shared/database.service';
import { Geolocation } from '@capacitor/geolocation';

declare let google: any;
@Component({
  selector: 'app-mission-map',
  templateUrl: './mission-map.page.html',
  styleUrls: ['./mission-map.page.scss'],
})
export class MissionMapPage implements OnInit {

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  mission: Mission;
  loading = true;

  map: any;

  currentLoc: string;
  missionLoc: string;

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();

  constructor(private navController: NavController,
              private actRoute: ActivatedRoute,
              private db: DatabaseService) {
    db.getMissionById(actRoute.snapshot.params.id).then(mission => {this.mission = mission; this.loading = false;});
  }

  goBack() {
    this.navController.back();
  }
  
  async ngOnInit() {
    await this.db.init();
  }

  async ionViewDidEnter() {
    this.showMap();
    await this.geocodeLatLng();
  }

  async geocodeLatLng(){
    const coordinates = await Geolocation.getCurrentPosition();

    const latlngMission = {
      lat: this.mission.location.latitude,
      lng: this.mission.location.longitude
    };

    const latlngCurrent = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };

    this.geocoder
      .geocode({ location: latlngMission })
      .then((response) => {
        console.log('MISSION: ' + response.results[0].formatted_address);
        this.missionLoc = response.results[0].formatted_address;
        this.geocoder
          .geocode({ location: latlngCurrent })
          .then((response_2) => {
            console.log('CURRENT: ' + response_2.results[0].formatted_address);
            this.currentLoc = response_2.results[0].formatted_address;
            this.calculateAndDisplayRoute(this.currentLoc, this.missionLoc);
          })
          .catch((e) => window.alert('Geocoder failed due to: ' + e));
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));
  }

  calculateAndDisplayRoute(current: string, mission: string) {
    const that = this;
    that.directionsService
      .route({
        origin: current,
        destination: mission,
        travelMode: google.maps.TravelMode.DRIVING
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
    this.directionsRenderer.setMap(this.map);
  }
}
