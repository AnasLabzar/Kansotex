/**
 * Universal text utility for Kansotex.
 * Strips accents, unifies spaces, replaces ligatures, and sanitizes special characters.
 */
export function removeAccents(str?: string | null): string {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/[\u00A0\u202F\u2007\u2009]/g, ' ') // Non-breaking & narrow spaces to standard ASCII space
    .replace(/[\u2018\u2019\u02BC\u02BB]/g, "'") // Curly apostrophes to standard straight apostrophe
    .replace(/[\u201C\u201D\u00AB\u00BB]/g, '"') // Curly quotes to standard quote
    .replace(/[\u2013\u2014]/g, '-') // En-dash & Em-dash to standard dash
    .replace(/œ/g, 'oe')
    .replace(/Œ/g, 'OE')
    .replace(/æ/g, 'ae')
    .replace(/Æ/g, 'AE')
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, ""); // Strip diacritics / accents
}

/**
 * Universal safe helper for Termina font to avoid any character / accent glitches.
 * TerminaTest-Bold font is limited to uppercase Latin A-Z, numbers 0-9, dash, dot, comma, and space.
 * This helper cleans all unsupported glyphs (slashes, bullets, middle-dots, accents, non-breaking spaces)
 * so Termina renders crisply without font metric or fallback glitches.
 */
export function toTermina(str?: string | null): string {
  if (!str || typeof str !== 'string') return '';
  return removeAccents(str)
    .replace(/[•·●○]/g, ' ') // Replace bullets/dots with clean space
    .replace(/^\s*\/\s*/, '') // Remove leading slash if any
    .replace(/\s*\/\s*/g, ' ') // Replace slash with space in Termina strings
    .replace(/['’]/g, '') // TerminaTest lacks apostrophe glyph; strip it to prevent metric bug
    .replace(/&/g, 'ET') // TerminaTest lacks ampersand; convert to French ET
    .toUpperCase()
    .trim();
}
