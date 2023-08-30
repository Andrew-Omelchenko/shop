import { Injectable } from '@angular/core';

@Injectable()
export class GeneratorService {
  private generator = TokenGenerator();
  getId(qty = 6) {
    let result = '';

    for (let i = 0; i < qty; i++) {
      result += this.generator.next().value;
    }

    return result;
  }
}

function* TokenGenerator(): IterableIterator<string> {
  const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ';
  let lastIndex = 0;
  while (true) {
    const index = (lastIndex + Math.floor(Math.random() * ALPHABET.length)) % ALPHABET.length;
    lastIndex = index;
    yield ALPHABET.charAt(index);
  }
}
