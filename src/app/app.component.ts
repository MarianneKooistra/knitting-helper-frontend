import { Component, OnInit } from '@angular/core';
import { KnittingCounterService } from './service/knittingCounter.service';
import { KnittingCounter } from './interface/knittingCounter';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

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
  increasedNumber$: Observable<KnittingCounter> = this.knittingCounterSubject.asObservable();

  constructor(private counterService:KnittingCounterService) {}

  ngOnInit(): void {
    //With the single line below commented, the modal and the submission form works as it should. 
    //Except it shows an empty list when the page is loaded.
    //The getList solves that. But then new counters no longer get added to the list (they are getting added to the database)
    
    // this.getList();
    this.currentCounter$ = this.counterService.counterById$(1);
  }

  getList(): void {
    this.listOfCounters$ = this.counterService.counters$;
  }

  getCounterById(counter: KnittingCounter): void {
    this.currentCounter$ = this.counterService.counterById$(counter.counterId)
  }

  addCounter(form: NgForm) {
    const addedCounter: KnittingCounter = {
      counterId: form.value.counterId,
      counterName: form.value.counterName,
      counterNumber: 0,
      counterTotal: form.value.counterTotal
    };

    this.counterService.addCounter$(addedCounter).subscribe((newAddedCounter) => {
      const counters = this.knittingCounterArraySubject.value;
      counters.push(newAddedCounter);
      this.knittingCounterArraySubject.next(counters);
      document.getElementById('closeModal')?.click();
      form.resetForm();
    });
  }

  countOne(counter: KnittingCounter): void {
    this.counterService.addNumber$(counter.counterId).subscribe(updateCounter => {
      this.currentCounter$ = this.counterService.counterById$(counter.counterId);
    });
  }
}
