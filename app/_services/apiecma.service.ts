import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class ApiecmaService {
    constructor(private http: Http) { }

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
                let user = response.json();
                if (user && user.result && user.result.authenticated === true) {

                    let u = {
                        firstName: user.result.userfio,
                        id : 1,
                        lastName : user.result.userfio,
                        token : user.result.userfio,
                        username : username
                    }

                    // store user details and jwt token in local storage to keep user logged in between page refreshes                    
                    localStorage.setItem('currentUser', JSON.stringify(u));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}