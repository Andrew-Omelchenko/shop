export function parseQueryString(queryString: string): { [paramName: string]: string } {
  return queryString
    .replace(/^\?|#/, '')
    .split('&')
    .reduce(
      (res, item) => {
        const [a, b] = item.split('=');
        res[a] = b;
        return res;
      },
      {} as { [key: string]: string },
    );
}
