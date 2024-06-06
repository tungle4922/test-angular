import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
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
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { ImageCropComponent } from './modules/upload/components/image-crop/image-crop.component';
import {
  ImageCroppedEvent,
  ImageCropperModule,
  LoadedImage,
} from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NzModalModule,
    ImageCropperModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'test-angular';
  arr: number[] = [];
  _nzModalService = inject(NzModalService);
  imageChangedEvent: any = '';
  croppedImage: any = '';
  testArr: any = Array(100);

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.limitValueInput()
  }

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

  createTplModal($event: any): void {
    this._nzModalService.create({
      nzTitle: 'Img crop',
      nzContent: ImageCropComponent,
      nzData: {
        data: $event,
      },
      nzOnOk: () => console.log('Click ok'),
    });
  }

  //focus input in arr
  @ViewChildren('inputField') inputFields: QueryList<ElementRef> | undefined;
  @ViewChild('focusButton') focusButton: ElementRef | undefined;
  indexFocus = new FormControl(0);

  focusInput(index: number) {
    const sixthInput = this.inputFields?.toArray()[index]; // Lấy input thứ 6 (vị trí 5 vì index bắt đầu từ 0)
    sixthInput?.nativeElement.focus(); // Focus vào input
  }

  limitValueInput() {
    this.indexFocus.valueChanges.subscribe((value) => {
      if (value && value > 99) {
        this.indexFocus.setValue(99);
      }
      if (value && value < 0) {
        this.indexFocus.setValue(0);
      }
    });
  }
}
