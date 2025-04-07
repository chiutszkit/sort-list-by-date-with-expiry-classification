import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NgbDatepickerModule, FormsModule, DatePipe],
    providers: [DatePipe],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'list-sort-by-expiry-date';
  date = new Date();
  formattedDate?: string | null;

  constructor(private datePipe: DatePipe) {}

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
