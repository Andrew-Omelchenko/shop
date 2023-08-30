import { Injectable } from '@angular/core';
import { IdGenerator } from '../utils/id-generator';

@Injectable()
export class GenIdGeneratorService {
  private generator = IdGenerator();

  getNumericId(): number {
    return this.generator.next().value;
  }
}
