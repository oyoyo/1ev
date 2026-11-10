/**
 * Render one Markdown list item to HTML for card/preview lists:
 *   - [来源名](https://...) -> <a href="...">来源名</a>  (URL hidden, name clickable)
 *   - **粗体** -> <strong>粗体</strong>
 * List items are plain text otherwise; output is safe to inject via set:html.
 */
export function renderBullet(line: string): string {
  let s = line.replace(/^- /, '').trim();
  s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2">$1</a>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return s;
}

/** Build the card preview <ul> (first N list items of a post body). */
export function previewList(body: string | undefined, n = 3): string {
  const lines = (body || '').split('\n').filter((l) => l.trim().startsWith('- ')).slice(0, n);
  return lines.length ? '<ul>' + lines.map((l) => '<li>' + renderBullet(l) + '</li>').join('') + '</ul>' : '';
}
