import { Component, OnInit } from '@angular/core';
import { KnittingCounterService } from './service/knittingCounter.service';
import { KnittingCounter } from './interface/knittingCounter';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SummerVacationProjectFrontend';
  private newCounter = new KnittingCounter();

  private knittingCounterArraySubject = new BehaviorSubject<any[]>([]);
  listOfCounters$: Observable<any[]> = this.knittingCounterArraySubject.asObservable();
  private knittingCounterSubject = new BehaviorSubject<KnittingCounter> (this.newCounter);
  currentCounter$: Observable<KnittingCounter> = this.knittingCounterSubject.asObservable();

  constructor(private counterService:KnittingCounterService) {}

  ngOnInit(): void {
    this.listOfCounters$ = this.counterService.counters$
    this.currentCounter$ = this.counterService.counterById$(1);
  }

  getCounterById(counter: KnittingCounter): void {
    this.currentCounter$ = this.counterService.counterById$(counter.counterId)
  }

}
