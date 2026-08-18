import { Fragment } from 'react';

/** Inline **bold** → <strong>. Everything else stays literal. */
const inline = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((chunk, i) =>
    chunk.startsWith('**') && chunk.endsWith('**') ? (
      <strong key={i}>{chunk.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{chunk}</Fragment>
    )
  );

/**
 * Minimal block renderer for the post format: ## headings, - bullets,
 * 1. ordered items, and paragraphs. The previous version dropped list markup
 * into paragraphs, so bullets rendered as literal "- **text**".
 */
const Prose = ({ content }) => {
  const blocks = [];
  let list = null; // { type: 'ul' | 'ol', items: [] }

  const flush = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };

  for (const raw of content.split('\n')) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }

    if (line.startsWith('## ')) {
      flush();
      blocks.push({ type: 'h2', text: line.slice(3) });
    } else if (line.startsWith('# ')) {
      flush();
      blocks.push({ type: 'h2', text: line.slice(2) });
    } else if (/^[-*]\s+/.test(line)) {
      if (list?.type !== 'ul') {
        flush();
        list = { type: 'ul', items: [] };
      }
      list.items.push(line.replace(/^[-*]\s+/, ''));
    } else if (/^\d+\.\s+/.test(line)) {
      if (list?.type !== 'ol') {
        flush();
        list = { type: 'ol', items: [] };
      }
      list.items.push(line.replace(/^\d+\.\s+/, ''));
    } else {
      flush();
      blocks.push({ type: 'p', text: line });
    }
  }
  flush();

  return (
    <div className="prose-editorial">
      {blocks.map((block, i) => {
        if (block.type === 'h2') return <h2 key={i}>{block.text}</h2>;

        if (block.type === 'p') return <p key={i}>{inline(block.text)}</p>;

        if (block.type === 'ul') {
          return (
            <ul key={i} className="space-y-2.5">
              {block.items.map((item, j) => (
                <li key={j} className="flex gap-4">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-4 shrink-0 bg-clay" />
                  <span>{inline(item)}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <ol key={i} className="space-y-2.5">
            {block.items.map((item, j) => (
              <li key={j} className="flex gap-4">
                <span className="shrink-0 font-mono text-micro text-clay">
                  {String(j + 1).padStart(2, '0')}
                </span>
                <span>{inline(item)}</span>
              </li>
            ))}
          </ol>
        );
      })}
    </div>
  );
};

export default Prose;
