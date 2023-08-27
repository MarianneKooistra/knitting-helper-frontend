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

  private knittingCountersSubject = new BehaviorSubject<any[]>([{}]);
  listOfCounters$: Observable<any[]> = this.knittingCountersSubject.asObservable();

  constructor(private counterService:KnittingCounterService) {}

  ngOnInit(): void {
    this.listOfCounters$ = this.counterService.counters$
  }

}
