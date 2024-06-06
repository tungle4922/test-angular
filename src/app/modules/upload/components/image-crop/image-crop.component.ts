import { Component, Input, inject } from '@angular/core';
import { NZ_MODAL_DATA } from 'ng-zorro-antd/modal';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-crop',
  standalone: true,
  imports: [ImageCropperModule],
  templateUrl: './image-crop.component.html',
  styleUrl: './image-crop.component.scss',
})
export class ImageCropComponent {
  readonly nzModalData = inject(NZ_MODAL_DATA);
  croppedImage: any = '';
  uploadImage: any = '';
  showCropper = false;

  ngOnInit(): void {
    console.log("lll",this.nzModalData.data);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    console.log(event)
    // this.uploadImage = this.base64ToFile(event.base64, 'noti.png');
    console.log('mmb', event.base64)
  }

  imageLoaded() {
    this.showCropper = true;
  }

  loadImageFailed() {
    console.log('Load failed');
  }

  base64ToFile(data: any, filename: string) {
    const arr = data?.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }
}
