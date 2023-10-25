import { Inject, Injectable } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';
import { Params } from '@angular/router';
import { parseQueryString } from '../utils/parse-query-string';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly location: Location,
  ) {}

  public getCurrentQueryParams(): Params {
    return parseQueryString(this.document.location.search);
  }

  public goBack() {
    this.location.back();
  }
}
