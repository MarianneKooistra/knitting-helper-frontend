import { Component, OnInit } from '@angular/core';
import { KnittingCounterService } from './service/knittingCounter.service';
import { KnittingCounter } from 'src/model/KnittingCounter';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SummerVacationProjectFrontend';
  currentCounter: KnittingCounter = { counterId: 999, counterName: 'placeholder', counterNumber: 0, counterTotal: 1};

  constructor(private counterService: KnittingCounterService) {}

  ngOnInit(): void {
    this.counterService.currentCounter$.subscribe((counter) => {
      this.currentCounter = counter;
    });
  }

  countOne() {
    this.counterService.addNumber(this.currentCounter.counterId).subscribe({
      next: (response) => {
        this.counterService.currentCounter$.next(
          response.data.counter
        );
      }
    });
  }

  minusOne() {
    this.counterService.minusNumber(this.currentCounter.counterId).subscribe({
      next: (response) => {
        this.counterService.currentCounter$.next(
          response.data.counter
        );
      }
    });
  }

}
