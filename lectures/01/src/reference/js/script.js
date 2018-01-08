(function() {
'use strict';

    var indentCSS = function(text){
        var prefix = text.slice(0, text.indexOf('{')).trim();
        var attributes = text.slice(text.indexOf('{') + 1, text.indexOf('}')).split(";");
        attributes = attributes.reduce(function(acc, attribute){
            var attribute = attribute.trim();
            if (attribute.length>0) acc.push("  " + attribute + ";\n");
            return acc;
        },[]).join('');
        return prefix + " {\n" + attributes + "}\n";
    }

    window.addEventListener("load", function(event) {
        // fetching css
        var styles = [];
        var selectors = [];
        Array.from(document.styleSheets[1].cssRules).forEach(function(rule){
            var selector = rule.selectorText.split(' ')[0];
            var content = indentCSS(rule.cssText);
            var index = selectors.indexOf(selector);
            if (index == -1){
                selectors.push(selector);
                styles.push(content);
            } else {
                styles[index] += "\n" + content;
            }
        });
        // fetching html and populating the DOM
        Array.from(document.getElementsByClassName('display')).forEach(function(element, i){
            var html = document.createElement('pre');
            html.className = "html";
            html.innerText = element.innerHTML.trim();
            element.parentNode.appendChild(html);
            var css = document.createElement('pre');
            css.className = "css";
            css.innerText = styles[i];
            element.parentNode.appendChild(css);
        });
    });
    
})();