'use strict';
var chai = require('chai');
chai.config.includeStack = true;
require('chai').should();
var expect = require('chai').expect;
var nodePath = require('path');
var fs = require('fs');

var coffeePlugin = require('../'); // Load this module just to make sure it works
var optimizer = require('optimizer');

describe('optimizer-coffee' , function() {


    it('should compile a simple coffee file', function(done) {
        var pageOptimizer = optimizer.create({
                fileWriter: {
                    fingerprintsEnabled: false,
                    outputDir: nodePath.join(__dirname, 'static')
                },
                bundlingEnabled: true,
                plugins: [
                    {
                        plugin: coffeePlugin,
                        config: {

                        }
                    }
                ]
            });

        pageOptimizer.optimizePage({
                name: 'testPage',
                dependencies: [
                    nodePath.join(__dirname, 'fixtures/simple.coffee')
                ]
            },
            function(err, optimizedPage) {
                if (err) {
                    return done(err);
                }

                var output = fs.readFileSync(nodePath.join(__dirname, 'static/testPage.js'), 'utf8');
                expect(output).to.equal('(function() {\n  var test;\n\n  test = 5;\n\n}).call(this);\n');
                done();
            });
    });

    it.only('should compile a simple coffee file as a CommonJS module', function(done) {
        var pageOptimizer = optimizer.create({
                fileWriter: {
                    fingerprintsEnabled: false,
                    outputDir: nodePath.join(__dirname, 'static')
                },
                bundlingEnabled: true,
                plugins: [
                    {
                        plugin: 'optimizer-require',
                        config: {
                            includeClient: false
                        }
                    },
                    {
                        plugin: coffeePlugin,
                        config: {

                        }
                    }
                ]
            });

        pageOptimizer.optimizePage({
                name: 'testPage',
                dependencies: [
                    'require: ' + nodePath.join(__dirname, 'fixtures/simple.coffee')
                ]
            },
            function(err, optimizedPage) {
                if (err) {
                    return done(err);
                }

                var output = fs.readFileSync(nodePath.join(__dirname, 'static/testPage.js'), 'utf8');
                expect(output).to.contain('require');
                expect(output).to.contain('(function() {\n  var test;\n\n  test = 5;\n\n}).call(this);\n');
                done();
            });
    });

});
