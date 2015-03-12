var fs = require('fs');
var coffee = require('coffee-script');

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
            read: function(context, callback) {
                var path = this.path,
                    transformedCode;

                fs.readFile(path, {encoding: 'utf8'}, function(err, src) {
                    if (err) {
                        return callback(err);
                    }
                    transformedCode = coffee.compile(src);

                    callback(null, transformedCode);
                });
            },
            getSourceFile: function() {
                return this.path;
            }
        });
};
