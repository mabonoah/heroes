import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HeroesService {
    dynamicFilter: boolean = true;

    constructor() { }

    toggleDynamicFilter(): void {
        this.dynamicFilter = !this.dynamicFilter;
    }
}