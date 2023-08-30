import { InjectionToken } from '@angular/core';
import { GeneratorService } from './generator.service';

export const GeneratedString = new InjectionToken<string>('generatedString');

export function GeneratorFactory(qty: number): (generator: GeneratorService) => string {
  return (generator: GeneratorService) => generator.getTokenId(qty);
}
