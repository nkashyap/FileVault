"use strict";
/**
 * Created by Nisheeth on 06/02/2016.
 */

const FileVault = require('./');
const assert = require('assert');
require('mocha');

describe('FileVault', () => {
    var vault;
    before(() => {
        vault = new FileVault({
            verbose: true,
            version: true,
            username: 'admin',
            password: 'admin'
        });
    });

    describe('export()', () => {
        it('should execute export command', () => {
            assert.deepStrictEqual(vault.parseOptions('export', {
                verbose: true,
                prune: true,
                type: 'package',
                uri: 'http://localhost:4502/crx',
                jcrPath: '.',
                localPath: '/'
            }), [
                '--type package',
                '--credentials admin:admin',
                '--prune-missing',
                '--verbose',
                '--version',
                'http://localhost:4502/crx',
                '.',
                '/'
            ]);
        });
    });

    describe('import()', () => {
        it('should execute import command', () => {
            assert.deepStrictEqual(vault.parseOptions('import', {
                verbose: true,
                sync: true,
                uri: 'http://localhost:4502/crx',
                jcrPath: '.',
                localPath: '/'
            }), [
                '--credentials admin:admin',
                '--sync',
                '--verbose',
                '--version',
                'http://localhost:4502/crx',
                '.',
                '/'
            ]);
        });
    });

    describe('checkout()', () => {
        it('should execute checkout command', () => {
            assert.deepStrictEqual(vault.parseOptions('checkout', {
                verbose: true,
                quite: false,
                force: true,
                filter: '/app/test.js',
                uri: 'http://localhost:4502/crx',
                jcrPath: '.',
                localPath: '/'
            }), [
                '--credentials admin:admin',
                '--filter /app/test.js',
                '--force',
                '--verbose',
                '--version',
                'http://localhost:4502/crx',
                '.',
                '/'
            ]);
        });
    });

    describe('analyze()', () => {
        it('should execute analyze command', () => {
            assert.deepStrictEqual(vault.parseOptions('analyze', {
                verbose: true,
                quite: false,
                linkFormat: 'CQ520_HF_%s|%s',
                localPath: '/'
            }), [
                '--credentials admin:admin',
                '--linkFormat CQ520_HF_%s|%s',
                '--verbose',
                '--version',
                '/'
            ]);
        });
    });

    describe('status()', () => {
        it('should execute status command', () => {
            assert.deepStrictEqual(vault.parseOptions('status', {
                verbose: true,
                quite: false,
                showUpdate: true,
                nonRecursive: true,
                file: '/test.js'
            }), [
                '--credentials admin:admin',
                '--non-recursive',
                '--show-update',
                '--verbose',
                '--version',
                '/test.js'
            ]);
        });
    });
});