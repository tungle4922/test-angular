import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable, combineLatest, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'test-angular';
  arr: number[] = [];

  ngOnInit() {

  }

  //Trường hợp tính tổng 3 số dạng observable
  getSumObserve(): Observable<number> {
    const A$: Observable<number> = of(1);
    const B$: Observable<number> = of(2);
    const C$: Observable<number> = of(9);

    return combineLatest([A$, B$, C$]).pipe(map(([a, b, c]) => a + b + c + 10));
  }

  //Trường hợp tính tổng 3 số dạng observable
  getArrObserve() {
    const A$: Observable<number> = of(1);
    const B$: Observable<number> = of(2);
    const C$: Observable<number> = of(9);

    combineLatest([A$, B$, C$]).subscribe(([A, B, C]) => {
      this.arr.push(A);
      this.arr.push(B);
      this.arr.push(C);
    });
  }
}
