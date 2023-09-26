import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, share, mergeMap, finalize } from 'rxjs/operators';
import { ApiHttpService } from '../apihttp/apihttp.service';
import { AuthStore } from '../auth/auth.store';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  private stores = new Map<string, Map<string, any>>();
  private cachedObservables = new Map<string, Observable<any>>();

  constructor(private auth: AuthStore, private api: ApiHttpService) { }

  getStore(storeName: string): Observable<Map<string, any>> {
    return new Observable((subscriber) => {
      let store = new Map<string, any>();
      if (this.stores.has(storeName)) store = this.stores.get(storeName)!;
      else this.stores.set(storeName, store);

      subscriber.next(store);
    });
  }

  getCache(
    storeName: string,
    key: string,
    params: any,
    service?: string,
    assemblyName?: string,
    className?: string,
    method?: string
  ) {
    if (!storeName || !key) return of(null);

    const user = this.auth.get();
    const lowerKey = key.toLowerCase();
    if (!user) of(null);

    if (!service) service = 'SYS';

    if (!assemblyName) assemblyName = 'CM';

    if (!className) className = 'CMBusiness';

    if (!method) method = 'GetCacheAsync';

    return this.getStore(storeName).pipe(
      mergeMap((store) => {
        let data: any = null;
        if (store.has(lowerKey)) {
          data = store.get(lowerKey);
        }
        if (data != null || storeName === 'Images') return of(data);
        let observable: Observable<any>;

        let keyValue = JSON.stringify(params).toLowerCase();
        if (this.cachedObservables.has(keyValue)) {
          observable = this.cachedObservables.get(keyValue)!;
        } else {
          // observable = this.api
          //   .callSv(service!, assemblyName!, className!, method!, params)
          //   .pipe(
          //     map((res) => {
          //       if (res?.msgBodyData && res.msgBodyData[0]) {
          //         const datas = res.msgBodyData[0];
          //         this.add(storeName, keyValue, datas);
          //         return datas;
          //       }
          //     }),
          //     share(),
          //     finalize(() => this.cachedObservables.delete(keyValue))
          //   );
          this.cachedObservables.set(keyValue, observable);
        }

        return observable;
      })
    );
  }

  add(storeName: string, key: string, data: any) {
    this.getStore(storeName).subscribe((store) => {
      store.set(key.toLowerCase(), data);
    });
  }

  delete(storeName: string, key: string) {
    if (this.stores.has(storeName)) {
      const store = this.stores.get(storeName);
      store?.delete(key);
    }
  }

  valueList(name: string) {
    const storeName = 'SYS_ValueList';
    return this.getCache(storeName, name, [storeName, name]);
  }

  setValueList(name: string, datas: any) {
    const storeName = 'SYS_ValueList';
    this.add(storeName, name, datas);
  }
}
