// Note to self: I think this file works as follows.
// It creates the url of the api. So by calling on one of these methods, the url is fed to the api and gets the right data for the html to show the user.

import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from "rxjs";
import { KnittingCounter } from "../interface/knittingCounter";

@Injectable({
    providedIn: 'root'
})

export class KnittingCounterService {
    private readonly apiUrl = 'http://localhost:8080/api/counter';

    constructor(private http: HttpClient) {}

    counters$ = <Observable<KnittingCounter[]>> this.http.get(`${this.apiUrl}/`)
        .pipe(
            
            tap(console.log)
    );

    counterById$ = (counterId: number) => <Observable<KnittingCounter>> this.http.get(`${this.apiUrl}/get/${counterId}`)
        .pipe(
            tap(console.log)
    );

    addCounter$ = (counter: KnittingCounter) => <Observable<KnittingCounter>> this.http.post<KnittingCounter>(`${this.apiUrl}/save`, counter)
        .pipe(
            tap(console.log)
    );

    addNumber$ = (counterId: number): Observable<KnittingCounter> => this.http.post(`${this.apiUrl}/add/${counterId}`, counterId)
        .pipe(
            tap(console.log)
    );

    minusNumber$ = (counterId: number): Observable<KnittingCounter> => this.http.post(`${this.apiUrl}/subtract/${counterId}`, counterId)
        .pipe(
            tap(console.log)
    );
}