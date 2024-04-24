import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  Observable,
  combineLatest,
  concatMap,
  forkJoin,
  interval,
  map,
  mergeMap,
  of,
  switchMap,
} from 'rxjs';
import { LoadingService } from './modules/loading/services/loadingService.service';

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

  ngOnInit() {}

  //Trường hợp tính tổng 3 số dạng observable
  getSumObserve(): Observable<number> {
    const A$: Observable<number> = of(1);
    const B$: Observable<number> = of(2);
    const C$: Observable<number> = of(9);

    return combineLatest([A$, B$, C$]).pipe(map(([a, b, c]) => a + b + c));
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

  //test dùng switchmap
  testSwitchMap() {
    const A$: Observable<number> = of(3);

    A$.pipe(
      switchMap((A) => {
        return of(A + 1); //phải return về 1 observable
      }),
      switchMap((B) => {
        return of(B + 1);
      }),
      switchMap((C) => {
        return of(C + 2);
      })
    ).subscribe((finalData) => {
      console.log(finalData);
    });
  }

  // Ví dụ về switchMap
  switchMapExample() {
    interval(1000)
      .pipe(switchMap((value) => of(`SwitchMap: ${value}`)))
      .subscribe((result) => console.log(result));
  }

  // Ví dụ về mergeMap
  mergeMapExample() {
    interval(1000)
      .pipe(mergeMap((value) => of(`MergeMap: ${value}`)))
      .subscribe((result) => console.log(result));
  }

  // Ví dụ về concatMap
  concatMapExample() {
    interval(1000)
      .pipe(concatMap((value) => of(`ConcatMap: ${value}`)))
      .subscribe((result) => console.log(result));
  }
}
