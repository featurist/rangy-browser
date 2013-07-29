var fs = require('fs');
var http = require('http');
var jsdom = require('jsdom');
var stitchy = require('stitchy');
var request = require('request');

describe('rangy, compiled', function() {
    it('is a CommonJS package', function(done) {
        stitchy.run({ lib: './compiled', public: '.', target: './app.js', logging: false });
        request.get("http://localhost:3000/app.js", function(err, response, body) {
            body.should.include("Stitch");
            jsdom.env({
                html: "<html><body></body></html>",
                src: [body],
                done: function(errors, window) {
                    var rangy = window.require('rangy');
                    if (typeof (rangy) !== 'object') {
                        throw new Error("Failed to require rangy");
                    }
                    done();
                }
            });

        })
    });
})