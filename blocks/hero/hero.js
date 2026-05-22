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

  // Replace block content
  block.innerHTML = '';
  block.append(contentDiv);
}
