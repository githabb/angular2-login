import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User, SessionKey } from '../_models/index';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    user: User;

    constructor(private http: Http) {
        this.user = null;
    }

    login(username: string, password: string) {

        let requestJson = {
                    "jsonrpc": "2.0",
                    "id": 1234, 
                    "method": "User.signin", 
                    "params": { 
                        "username": username, 
                        "password": password
                    }
                };
                
        return this.http.post('http://api.ecma.it-lab.su/', requestJson)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let authUser = response.json();
                if (authUser && authUser.result && authUser.result.authenticated === true) {

                    let u = new User(authUser.result.userid, authUser.result.username, authUser.result.userfio, authUser.result.userrole);

                    for (let v of authUser.result.vehicles) {
                       u.addVehicle(v.id, v.gos_number);
                    }

                    for (let t of authUser.result.trailers) {
                       u.addTrailer(t.id, t.gos_number);
                    }

                    this.user = u;

                    let sessionKey = new SessionKey(authUser.id, authUser.result.session_id, authUser.result.userid);

                    // store user details and jwt token in local storage to keep user logged in between page refreshes                    
                    localStorage.setItem('currentUser', JSON.stringify(sessionKey));
                    return null;
                }
                else
                {
                    return 'Username or password is incorrect';
                }
            });
    }

    logout() {
        this.user = null;
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}