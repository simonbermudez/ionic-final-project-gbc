/* eslint-disable max-len */
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Mission } from '../models/mission';
import { DatabaseService } from '../shared/database.service';

import { Geolocation } from '@capacitor/geolocation';
import { MissionMapPage } from '../mission-map/mission-map.page';

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

  currentLoc: string;
  missionLoc: string;

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  geocoder = new google.maps.Geocoder();
  infowindow = new google.maps.InfoWindow();

  constructor(private navController: NavController,
              private actRoute: ActivatedRoute,
              private db: DatabaseService) {
  }

  async ngOnInit() {
    await this.db.init();
  }

  async ionViewWillEnter() {
    let mission = await this.db.getMissionById(this.actRoute.snapshot.params.id);
    this.mission = mission;
    this.loading = false;
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

    // decoding mission and current long/lat to string address
    // I nested it cuz I was having problem with a returned promise
    this.geocoder
      .geocode({ location: latlngMission })
      .then((response) => {
        console.log('MISSION: ' + response.results[0].formatted_address);
        this.missionLoc = response.results[0].formatted_address;
        // testing bellow
        this.geocoder
          .geocode({ location: latlngCurrent })
          .then((response_2) => {
            console.log('CURRENT: ' + response_2.results[0].formatted_address);
            this.currentLoc = response_2.results[0].formatted_address;
            //nested testing
            this.calculateAndDisplayRoute(this.currentLoc, this.missionLoc);
            // nested testing ends here
          })
          .catch((e) => window.alert('Geocoder failed due to: ' + e));
        // testing ends here
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

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.myLoc = coordinates;
  }

  showMap() {
    const location = new google.maps.LatLng(this.mission.location.latitude, this.mission.location.longitude);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: false
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    // // calculates/draws directions
    // this.geocodeLatLng();
    // sets map on mission location
    this.directionsRenderer.setMap(this.map);
  }
}
