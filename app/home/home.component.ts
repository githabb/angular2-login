import { Component, OnInit } from '@angular/core';

import { User, SessionKey } from '../_models/index';
import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
	currentUser: SessionKey;
    model: User;

    constructor(private authenticationService: AuthenticationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model = authenticationService.user;
    }

    ngOnInit() {
        //this.loadAllUsers();
    }

}