import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash',
  templateUrl: './app-dash.component.html',
  styleUrls: ['./app-dash.component.css']
})
export class AppDashComponent {
  
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'HR', cols: 1, rows: 1, count:2},
          { title: 'Clerk', cols: 1, rows: 1, count:3 },
          { title: 'Designer', cols: 1, rows: 1,count:3 },
          { title: 'Sales Rep', cols: 1, rows: 1,count:3 }
        ];
      }

      return [
        { title: 'HR', cols: 1, rows: 1, count:2 },
        { title: 'Clerk', cols: 1, rows: 1,count:3 },
        { title: 'Designer', cols: 1, rows: 1,count:3 },
        { title: 'Sales Rep', cols: 1, rows: 1, count:3 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
