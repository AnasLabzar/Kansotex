export function removeAccents(str: string): string {
  if (!str || typeof str !== 'string') return str;
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
