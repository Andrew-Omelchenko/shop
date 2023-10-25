import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { catchError, Observable, of, retry, Subject, take, tap } from 'rxjs';
import { SETTINGS_KEY } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { SortingOrder } from '../models/common.types';
import { SettingsModel } from '../models/settings.model';

const DEFAULT_SETTINGS: SettingsModel = {
  sortingOrder: SortingOrder.Descending,
};

const ATTEMPTS = 2;

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  private readonly appSettings$$: Subject<SettingsModel> = new Subject<SettingsModel>();
  readonly appSettings$: Observable<SettingsModel> = this.appSettings$$.asObservable();

  constructor(
    private readonly httpClient: HttpClient,
    private readonly localStorageService: LocalStorageService,
  ) {
    this.loadSettings()
      .pipe(take(1))
      .subscribe((settings) => this.appSettings$$.next(settings));
  }

  private loadSettings(): Observable<SettingsModel> {
    const settings = this.localStorageService?.get(SETTINGS_KEY);
    if (settings) {
      return of(settings);
    }

    return this.httpClient.get<SettingsModel>('assets/app-settings.json').pipe(
      retry(ATTEMPTS),
      tap((settings) => {
        if (!settings?.sortingOrder) {
          throw new Error("Can't read default sorting order");
        }
        this.updateSettings('sortingOrder', settings.sortingOrder);
      }),
      catchError(() => of(DEFAULT_SETTINGS)),
    );
  }

  updateSettings<K extends keyof SettingsModel>(key: K, value: SettingsModel[K]): void {
    const settings = this.localStorageService?.get(SETTINGS_KEY) || DEFAULT_SETTINGS;
    settings[key] = value;
    this.localStorageService?.set(SETTINGS_KEY, settings);
    this.appSettings$$.next(settings);
  }
}
