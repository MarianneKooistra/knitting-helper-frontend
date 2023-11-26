import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { KnittingCounter, KnittingCounterType, KnittingCountersType, } from 'src/model/KnittingCounter';
import { CustomResponse } from 'src/model/CustomResponse';

@Injectable({
  providedIn: 'root',
})
export class KnittingCounterService {
  private readonly apiUrl = 'http://localhost:8080/api/counter';
  counters$ = new BehaviorSubject<KnittingCounter[]>([]);
  private currentCounter: KnittingCounter | null = null;
  currentCounter$ = new BehaviorSubject<KnittingCounter> ({ counterId: 999, counterName: 'placeholder', counterNumber: 0, counterTotal: 1});


  constructor(private http: HttpClient) {
    this.currentCounter$.subscribe((counter) => {
        this.currentCounter = counter;
    });
  }

  getCounters(): Observable<CustomResponse<KnittingCountersType>> {
    return this.http
      .get<CustomResponse<KnittingCountersType>>(`${this.apiUrl}/`)
      .pipe(tap(console.log));
  }

  getCounterById(counterId: number): Observable<CustomResponse<KnittingCounterType>> {
    return this.http
      .get<CustomResponse<KnittingCounterType>>(`${this.apiUrl}/get/${counterId}`)
      .pipe(tap(console.log));
  }

  setCurrentCounter(counterId: number): void {
    this.getCounterById(counterId).subscribe((counter) => this.currentCounter = counter.data.counter);
  }

  addCounter(counter: KnittingCounter): Observable<CustomResponse<KnittingCounterType>> {
    return this.http
      .post<CustomResponse<KnittingCounterType>>(`${this.apiUrl}/save`, counter)
      .pipe(tap(console.log));
  }

  addNumber(counterId: number): Observable<CustomResponse<KnittingCounterType>> {
    return this.http
      .post<CustomResponse<KnittingCounterType>>(
        `${this.apiUrl}/add/${counterId}`,
        counterId
      )
      .pipe(tap(console.log));
  }

  minusNumber(counterId: number): Observable<CustomResponse<KnittingCounterType>> {
    return this.http
      .post<CustomResponse<KnittingCounterType>>(
        `${this.apiUrl}/subtract/${counterId}`,
        counterId
      )
      .pipe(tap(console.log));
  }
}
