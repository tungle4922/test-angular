import { Injectable, inject } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Loading1Component } from '../components/loading1/loading1.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingModal: any;
  private _nzModalService = inject(NzModalService);

  openLoadingModal() {
    this.loadingModal = this._nzModalService.create({
      nzTitle: undefined,
      nzFooter: null,
      nzContent: Loading1Component,
      nzClosable: false,
      nzMask: false,
      nzMaskClosable: false,
      nzCentered: true,
      nzWrapClassName: 'loading-modal',
      nzWidth: '200px',
    });
  }

  closeLoadingModal() {
    if (!this.loadingModal) return;
    this.loadingModal.close();
  }
}
