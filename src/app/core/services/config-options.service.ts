import { Injectable } from '@angular/core';
import { ConfigModel } from '../models/config.model';

@Injectable({
  providedIn: 'root',
})
export class ConfigOptionsService {
  private config: ConfigModel = {};

  getConfig(): ConfigModel {
    return this.config;
  }

  setConfig(updates: Partial<ConfigModel>): void {
    this.config = { ...this.config, ...updates };
  }

  setConfigProperty<K extends keyof ConfigModel>(key: K, value: ConfigModel[K]): void {
    this.config[key] = value;
  }
}
