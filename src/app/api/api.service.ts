import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../heroes/hero';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class APIService {
    private heroesUrl = 'assets/config.json';

    constructor(private http: HttpClient) { }

    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl);
    }
}