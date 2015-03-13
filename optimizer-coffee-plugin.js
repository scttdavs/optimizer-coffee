var fs = require('fs');
var coffee = require('coffee-script');

function read(path, callback) {
    var transformedCode;

    fs.readFile(path, {encoding: 'utf8'}, function(err, src) {
        if (err) {
            return callback(err);
        }
        transformedCode = coffee.compile(src);

        callback(null, transformedCode);
    });
}

module.exports = function(pageOptimizer, config) {
    pageOptimizer.dependencies.registerJavaScriptType(
        'coffee',
        {
            properties: {
                'path': 'string'
            },
            init: function(optimizerContext, callback) {
                if (!this.path) {
                    return callback(new Error('"path" is required'));
                }
                this.path = this.resolvePath(this.path);
                callback();
            },
            read: function(optimizerContext, callback) {
                read(this.path, callback);
            },
            getSourceFile: function() {
                return this.path;
            }
        });

    pageOptimizer.dependencies.registerRequireExtension('coffee', {
            read: function(path, optimizerContext, callback) {
                read(path, callback);
            },

            getLastModified: function(path, optimizerContext, callback) {
                optimizerContext.getFileLastModified(path, callback);
            }
        });
};
