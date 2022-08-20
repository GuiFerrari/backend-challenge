export function isValidURL(str: string) {
  const pattern = RegExp('^(http|https)://github.com/', 'i');
  return !!pattern.test(str);
}
