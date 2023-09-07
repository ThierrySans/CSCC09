function indentCSS(text) {
  const prefix = text.slice(0, text.indexOf("{")).trim();
  let attributes = text
    .slice(text.indexOf("{") + 1, text.indexOf("}"))
    .split(";");
  attributes = attributes
    .reduce(function (acc, attribute) {
      attribute = attribute.trim();
      if (attribute.length > 0) acc.push("  " + attribute + ";\n");
      return acc;
    }, [])
    .join("");
  return prefix + " {\n" + attributes + "}\n";
}

const styles = [];
const selectors = [];
Array.from(document.styleSheets[0].cssRules).forEach(function (rule) {
  const selector = rule.selectorText.split(" ")[0];
  const content = indentCSS(rule.cssText);
  const index = selectors.indexOf(selector);
  if (index == -1) {
    selectors.push(selector);
    styles.push(content);
  } else {
    styles[index] += "\n" + content;
  }
});

Array.from(document.getElementsByClassName("display")).forEach(
  function (element, i) {
    const html = document.createElement("pre");
    html.className = "html";
    html.innerText = element.innerHTML.trim();
    element.parentNode.appendChild(html);
    const css = document.createElement("pre");
    css.className = "css";
    css.innerText = styles[i];
    element.parentNode.appendChild(css);
  },
);
