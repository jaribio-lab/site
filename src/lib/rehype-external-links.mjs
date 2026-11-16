// Opens every external link in Markdown content in a new tab, so readers never leave the site.
const isExternal = href => /^(https?:)?\/\//i.test(href) || href.startsWith('mailto:');

export default function rehypeExternalLinks() {
  return tree => {
    const visit = node => {
      if (node.type === 'element' && node.tagName === 'a' && typeof node.properties?.href === 'string' && isExternal(node.properties.href)) {
        node.properties.target = '_blank';
        node.properties.rel = ['noopener'];
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}
