export default function decorate(block) {
  const [...rows] = block.children;
  const firstRow = rows[0];

  if (!firstRow) return;

  // Wrap content in hero-content div
  const contentDiv = document.createElement('div');
  contentDiv.className = 'hero-content';

  // Move all children of first cell into content div
  const firstCell = firstRow.children[0];
  if (firstCell) {
    contentDiv.append(...firstCell.childNodes);
  }

  // Detect CTA paragraphs: <p> containing only a single <a>
  // Wrap them in a .hero-ctas container, give each link a cta-* class
  const ctaPs = [...contentDiv.querySelectorAll('p')].filter((p) => {
    const kids = [...p.childNodes].filter(
      (n) => n.nodeType !== Node.TEXT_NODE || n.textContent.trim(),
    );
    return kids.length === 1 && kids[0].tagName === 'A';
  });

  if (ctaPs.length) {
    const ctaWrapper = document.createElement('div');
    ctaWrapper.className = 'hero-ctas';
    ctaPs.forEach((p, i) => {
      const a = p.querySelector('a');
      a.classList.add(i === 0 ? 'cta-primary' : 'cta-secondary');
      ctaWrapper.append(a);
      p.remove();
    });
    contentDiv.append(ctaWrapper);
  }

  // Replace block content
  block.innerHTML = '';
  block.append(contentDiv);
}
