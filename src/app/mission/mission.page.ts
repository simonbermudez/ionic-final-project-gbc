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

  async geocodeLatLng(){
    const coordinates = await Geolocation.getCurrentPosition();

    const latlngMission = {
      lat: this.mission.location.latitude,
      lng: this.mission.location.longitude
    };
    // console.log(coordinates.coords.latitude);
    console.log(coordinates.coords.latitude);
    const latlngCurrent = {
      lat: coordinates.coords.latitude,
      lng: coordinates.coords.longitude
    };

    // decoding mission address
    this.geocoder
      .geocode({ location: latlngMission })
      .then((response) => {
        console.log('MISSION: ' + response.results[0].formatted_address);
        this.missionLoc = response.results[0].formatted_address;
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));

    // decoding current address
    this.geocoder
      .geocode({ location: latlngCurrent })
      .then((response) => {
        console.log('CURRENT: ' + response.results[0].formatted_address);
        this.currentLoc = response.results[0].formatted_address;
      })
      .catch((e) => window.alert('Geocoder failed due to: ' + e));

  }

  calculateAndDisplayRoute(

  ) {
    const that = this;

    this.geocodeLatLng();

    that.directionsService
      .route({
        origin: this.currentLoc,
        destination: '151 A Queens Quay E, Toronto, ON M5A 1B6, Canada',
        travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      if (status === 'OK') {
        console.log('its good to draw');
        that.directionsRenderer.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.myLoc = coordinates;
    console.log('debug current = ' + coordinates.coords.latitude);
    console.log('debug current = ' + coordinates.coords.longitude);
  }

  showMap() {
    const location = new google.maps.LatLng(this.mission.location.latitude, this.mission.location.longitude);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    // sets map on mission location
    this.directionsRenderer.setMap(this.map);
    // calculates/draws directions
    this.calculateAndDisplayRoute();
  }
}


// use this to see what the api looks like
//https://maps.googleapis.com/maps/api/geocode/json?latlng=43.7941924,-79.3242791&location_type=ROOFTOP&result_type=street_address&key=AIzaSyAlbsGTKEPFBku2fC-ASPMeKQWRehE2iVg