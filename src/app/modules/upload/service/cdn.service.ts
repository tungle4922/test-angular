import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CdnService {
  _http = inject(HttpClient);
  endpoint = 'https://cdn-test.eztek.net/gateway/Media/Upload';

  uploadImage(file: File): Observable<string[]> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('source', 'test'); //optional
    return this._http.put<string[]>(this.endpoint, formData);
  }
}
