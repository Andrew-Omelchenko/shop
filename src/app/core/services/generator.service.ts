import { inject, Injectable } from '@angular/core';
import { TokenGenerator } from '../utils/id-generator';
import { GenIdGeneratorService } from './gen-id-generator.service';

@Injectable()
export class GeneratorService {
  private genIdGenerator = inject(GenIdGeneratorService);
  private generator = TokenGenerator();

  getNumericId(): number {
    return this.genIdGenerator.getNumericId();
  }

  getTokenId(qty = 6) {
    let result = '';

    for (let i = 0; i < qty; i++) {
      result += this.generator.next().value;
    }

    return result;
  }
}
