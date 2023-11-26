import { Component, OnInit } from '@angular/core';
import { KnittingCounterService } from '../service/knittingCounter.service';
import { KnittingCounter } from 'src/model/KnittingCounter';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  counters: KnittingCounter[] = [];
  selectedCounter: KnittingCounter = { counterId: 999, counterName: 'placeholder', counterNumber: 0, counterTotal: 1};

  constructor(private counterService: KnittingCounterService) { }

  ngOnInit() {
    this.counterService.counters$.subscribe((counters) => {
      this.counters = counters;
    });
    this.getCounters();

    this.counterService.currentCounter$.subscribe((counter) => {
      this.selectedCounter = counter;
    });
  }

  private getCounters() {
    this.counterService.getCounters().subscribe((response) => {
      if (response.data.counters != undefined) {
        this.counterService.counters$.next(response.data.counters);
      }
    });
  }

  submitForm(form: NgForm) {
    //Make the new counter
    const newCounter: KnittingCounter = {
      counterId: form.value.counterId,
      counterName: form.value.counterName,
      counterNumber: 0,
      counterTotal: form.value.counterTotal
    };

    //Save / send new counter
    this.counterService.addCounter(newCounter).subscribe({
      next: (response) => {
        this.counterService.counters$.next([
          response.data.counter,
          ...this.counterService.counters$.getValue()
        ]);
      }
    });

    //Close modal
    document.getElementById('closeModal')?.click();
    form.resetForm();
  }

  getCounter(counter: KnittingCounter) {
    this.counterService.getCounterById(counter.counterId).subscribe({
      next: (response) => {
        this.counterService.currentCounter$.next(
          response.data.counter,
        );
        this.selectedCounter = response.data.counter;
      }
    });
  }

}
