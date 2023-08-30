import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private readonly storageService: StorageService) {}

  public get(key: string) {
    return this.storageService.get(key);
  }

  public has(key: string) {
    return this.storageService.has(key);
  }

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  public set(key: string, value: any) {
    return this.storageService.set(key, value);
  }

  public remove(key: string) {
    return this.storageService.remove(key);
  }

  public clear() {
    return this.storageService.clear();
  }
}
