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
    this.getCurrentLocation();
  }

  showMap(loc: any) {
    const location = new google.maps.LatLng(this.mission.location.latitude, this.mission.location.longitude);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkerToMap(loc);
  }

  async getCurrentLocation() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.showMap(coordinates);
    console.log(coordinates);
  }

  addMarkerToMap(loc: any) {
    let position = new google.maps.LatLng(this.mission.location.latitude, this.mission.location.longitude);
    let mapMarker = new google.maps.Marker({
      position,
      title: this.mission.name,
      latitude: this.mission.location.longitude,
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
    // eslint-disable-next-line max-len
    window.open('https://www.google.com/maps/dir?api=1&destination=' + this.mission.location.latitude + ',' + this.mission.location.longitude);
  }
}