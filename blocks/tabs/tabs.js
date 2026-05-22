export default function decorate(block) {
  const tabList = document.createElement('div');
  tabList.className = 'tabs-list';
  tabList.setAttribute('role', 'tablist');

  const panels = [];

  [...block.children].forEach((row, i) => {
    const [labelCell, contentCell] = row.children;
    const label = labelCell?.textContent?.trim() || `Tab ${i + 1}`;
    const id = `tab-${i}`;

    // Build tab button
    const btn = document.createElement('button');
    btn.className = 'tabs-tab';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-controls', `panel-${id}`);
    btn.setAttribute('id', `btn-${id}`);
    btn.textContent = label;
    if (i === 0) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.setAttribute('aria-selected', 'false');
    }
    tabList.append(btn);

    // Build panel
    const panel = document.createElement('div');
    panel.className = 'tabs-panel';
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('id', `panel-${id}`);
    panel.setAttribute('aria-labelledby', `btn-${id}`);
    if (i !== 0) panel.hidden = true;
    if (contentCell) panel.append(...contentCell.childNodes);
    panels.push(panel);
  });

  // Click handler
  tabList.addEventListener('click', (e) => {
    const btn = e.target.closest('.tabs-tab');
    if (!btn) return;
    const idx = [...tabList.children].indexOf(btn);
    [...tabList.querySelectorAll('.tabs-tab')].forEach((b, i) => {
      const active = i === idx;
      b.classList.toggle('active', active);
      b.setAttribute('aria-selected', active);
      panels[i].hidden = !active;
    });
  });

  // Keyboard nav
  tabList.addEventListener('keydown', (e) => {
    const current = [...tabList.children].findIndex((b) => b.classList.contains('active'));
    let next = current;
    if (e.key === 'ArrowRight') next = (current + 1) % tabList.children.length;
    if (e.key === 'ArrowLeft') next = (current - 1 + tabList.children.length) % tabList.children.length;
    if (next !== current) {
      tabList.children[next].click();
      tabList.children[next].focus();
    }
  });

  block.innerHTML = '';
  block.append(tabList, ...panels);
}
