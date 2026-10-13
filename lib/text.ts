export function removeAccents(str?: string | null): string {
  if (!str || typeof str !== 'string') return '';
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Universal safe helper for Termina font to avoid any character / accent glitches.
 * Converts accents (é, è, ê, à, ç, ô, etc.) into clean ASCII Latin uppercase.
 */
export function toTermina(str?: string | null): string {
  if (!str || typeof str !== 'string') return '';
  return removeAccents(str).toUpperCase();
}

