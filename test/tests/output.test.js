const assert = require('assert');
const fs = require('fs');
const path = require('path');
const util = require('../../tools/util');

describe('Output', () => {

    it('must create the first js file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/js/app/dir1/file1.min.js')), true);
    });

    it('must set the right mode for the first js file', () => {
        fs.stat(path.resolve(__dirname, '../dist/js/app/dir1/file1.min.js'), function(err, stats) {
            assert.equal(util.unixFilepermission(stats.mode), '0664');
        });
    });

    it('must set the right mode for the first js directory', () => {
        fs.stat(path.resolve(__dirname, '../dist/js/app/dir1'), function(err, stats) {
            assert.equal(util.unixFilepermission(stats.mode), '0775');
        });
    });

    it('must create the second js file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/js/app/dir2/file2.min.js')), true);
    });

    it('must set the right mode for the second js file', () => {
        fs.stat(path.resolve(__dirname, '../dist/js/app/dir2/file2.min.js'), function(err, stats) {
            assert.equal(util.unixFilepermission(stats.mode), '0664');
        });
    });

    it('must set the right mode for the first js directory', () => {
        fs.stat(path.resolve(__dirname, '../dist/js/app/dir2'), function(err, stats) {
            assert.equal(util.unixFilepermission(stats.mode), '0775');
        });
    });

    it('must create the lib output file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/js/lib.min.js')), true);
    });

    it('must set the right mode for the lib file', () => {
        fs.stat(path.resolve(__dirname, '../dist/js/lib.min.js'), function(err, stats) {
            assert.equal(util.unixFilepermission(stats.mode), '0664');
        });
    });

    it('must create the css output file', () => {
        assert.equal(fs.existsSync(path.resolve(__dirname, '../dist/css/main.min.css')), true);
    });

    it('must set the right mode for the css file', () => {
        fs.stat(path.resolve(__dirname, '../dist/css/main.min.css'), function(err, stats) {
            assert.equal(util.unixFilepermission(stats.mode), '0664');
        });
    });

});
