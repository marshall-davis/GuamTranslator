/**
 * Created by ToothlessRebel on 12-May-16.
 */

var body = document.getElementsByTagName('body');
var elements = body.children();
var not_parsed = [
    'html',
    'head',
    'script',
    'title',
    'frameset',
    'meta'
];

for (var i = 0, limit = elements.length; i < limit; i++) {
    var element = elements.item(i);
    if (element !== null) {
        var tag = element.nodeName.toLowerCase();

        if (0 > not_parsed.indexOf(tag)) {
            console.log('Replacing text in ' + tag + ' as ' + element.textContent + '.');
            element.textContent = element.textContent.replace(/\s.+?\s/g, ' guam ');
        } else if (tag === 'frame') {

        }
    }
}
