var fs = require('fs');
var path = require('path');

var lib = fs.realpathSync('./lib');
var paths = fs.readdirSync(lib);

var js = "// npm 'rangy-browser' package --- \n\n(function(){";
for (var i = 0; i < paths.length; i++) {
    js += '\n// lib/' + paths[i] + '\n\n';
    js += fs.readFileSync(path.resolve(lib, paths[i])).toString();
}
js += ';\n\nexports.rangy = rangy })();\n\n';

fs.writeFileSync('./compiled/rangy.js', js);
