import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbDate, NgbDatepicker, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { Coupon } from './coupon';
import { couponList } from './mock-data/coupon';

@Component({
    selector: 'app-root',
    imports: [CommonModule, NgbDatepickerModule, FormsModule, DatePipe],
    providers: [DatePipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('datepicker') datepicker?: NgbDatepicker;
  
  title = 'list-sort-by-expiry-date';
  date = new Date();
  formattedDate?: string | null;
  couponList?: Coupon[];

  constructor(private datePipe: DatePipe) {
    this.couponList = couponList;

    this.couponList.sort((a, b) => {
      return new Date(a.end_date!).getTime() - new Date(b.end_date!).getTime();
    });

    this.couponList.forEach((coupon) => {
      if (new Date(coupon.end_date!).getTime() < new Date().getTime()) {
        coupon.isExpired = true;
      }
    })
  }

  ngOnInit() {
    this.formattedDate = this.datePipe.transform(this.date, ' MMMM d, y');
    console.log(this.formattedDate); // Output: "January 12, 2023"
  }

  onDateSelect(event: NgbDate) {
    console.log(event);
    this.date = new Date(event.year, event.month - 1, event.day);
    this.formattedDate = this.datePipe.transform(this.date, ' MMMM d, y');
    console.log(this.formattedDate); // Output: "January 12, 2023"
  }
}
