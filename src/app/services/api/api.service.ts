import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { apikey } from '../../../environments/environment';

@Injectable({providedIn:'root'})
export class ApiService {
    
    constructor(private http: HttpClient) {}

    getUserInfo(email: string):any{
        const url: string = 'https://api.fullcontact.com/v3/person.enrich';
        const body ={
            email : email
        }
        const headers= new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Authorization', `Bearer ${apikey}`);

        return this.http.post(url, body, {headers: headers}).pipe(
            map((res: any) => {return res;}),
            catchError(err=> err)
        );
    }
}