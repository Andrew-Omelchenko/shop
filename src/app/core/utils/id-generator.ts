export function* IdGenerator(): IterableIterator<number> {
  let id = 1;
  while (id < Number.MAX_SAFE_INTEGER) {
    yield id++;
  }
  throw Error('Max value limit has been reached!');
}

export function* TokenGenerator(): IterableIterator<string> {
  const ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ';
  let lastIndex = 0;
  while (true) {
    const index = (lastIndex + Math.floor(Math.random() * ALPHABET.length)) % ALPHABET.length;
    lastIndex = index;
    yield ALPHABET.charAt(index);
  }
}
