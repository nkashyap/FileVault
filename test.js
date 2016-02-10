"use strict";
/**
 * Created by Nisheeth on 06/02/2016.
 */

const FileVault = require('./');
const assert = require('assert');
require('mocha');

describe('FileVault', () => {
    let vault;
    before(() => {
        vault = new FileVault({
            verbose: true,
            version: true,
            username: 'admin',
            password: 'admin'
        });
    });

    describe('export()', () => {
        it('should execute export command with correct arguments', () => {
            assert.equal(vault.parseOptions('export', {
                verbose: true,
                prune: true,
                type: 'platform',
                uri: 'http://localhost:4502/crx',
                jcrPath: '.',
                localPath: '/'
            }).join(' '), '--credentials admin:admin export --type platform --prune-missing --verbose --version http://localhost:4502/crx . /');
        });
    });

    describe('import()', () => {
        it('should execute import command with correct arguments', () => {
            assert.equal(vault.parseOptions('import', {
                verbose: true,
                sync: true,
                uri: 'http://localhost:4502/crx',
                jcrPath: '.',
                localPath: '/'
            }).join(' '), '--credentials admin:admin import --sync --verbose --version http://localhost:4502/crx . /');
        });
    });

    describe('checkout()', () => {
        it('should execute checkout command with correct arguments', () => {
            assert.equal(vault.parseOptions('checkout', {
                verbose: true,
                quite: false,
                force: true,
                filter: 'filter.xml',
                uri: 'http://localhost:4502/crx',
                jcrPath: '.',
                localPath: '/'
            }).join(' '), '--credentials admin:admin checkout --filter filter.xml --force --verbose --version http://localhost:4502/crx . /');
        });
    });

    describe('analyze()', () => {
        it('should execute analyze command with correct arguments', () => {
            assert.equal(vault.parseOptions('analyze', {
                verbose: true,
                quite: false,
                linkFormat: 'CQ520_HF_%s|%s',
                localPath: '/'
            }).join(' '), '--credentials admin:admin analyze --linkFormat CQ520_HF_%s|%s --verbose --version /');
        });
    });

    describe('status()', () => {
        it('should execute status command with correct arguments', () => {
            assert.equal(vault.parseOptions('status', {
                verbose: true,
                quite: false,
                showUpdate: true,
                nonRecursive: true,
                file: '/test.js'
            }).join(' '), '--credentials admin:admin status --non-recursive --show-update --verbose --version /test.js');
        });
    });

    describe('update()', () => {
        it('should execute update command with correct arguments', () => {
            assert.equal(vault.parseOptions('update', {
                verbose: true,
                quite: false,
                force: true,
                nonRecursive: true,
                file: ['/test.js']
            }).join(' '), '--credentials admin:admin update --non-recursive --force --verbose --version /test.js');
        });
    });

    describe('info()', () => {
        it('should execute info command with correct arguments', () => {
            assert.equal(vault.parseOptions('info', {
                verbose: true,
                quite: false,
                force: true,
                recursive: true,
                file: ['/test.js']
            }).join(' '), '--credentials admin:admin info --recursive --force --verbose --version /test.js');
        });
    });

    describe('commit()', () => {
        it('should execute commit command with correct arguments', () => {
            assert.equal(vault.parseOptions('commit', {
                verbose: true,
                quite: false,
                force: true,
                nonRecursive: true,
                file: ['/test.js']
            }).join(' '), '--credentials admin:admin commit --non-recursive --force --verbose --version /test.js');
        });
    });

    describe('revert()', () => {
        it('should execute revert command with correct arguments', () => {
            assert.equal(vault.parseOptions('revert', {
                quite: false,
                recursive: true,
                file: ['/test.js']
            }).join(' '), '--credentials admin:admin revert --recursive --verbose --version /test.js');
        });
    });

    describe('resolved()', () => {
        it('should execute resolved command with correct arguments', () => {
            assert.equal(vault.parseOptions('resolved', {
                quite: false,
                force: true,
                recursive: true,
                file: ['/test.js']
            }).join(' '), '--credentials admin:admin resolved --recursive --force --verbose --version /test.js');
        });
    });

    describe('propget()', () => {
        it('should execute propget command with correct arguments', () => {
            assert.equal(vault.parseOptions('propget', {
                quite: false,
                recursive: true,
                propname: 'name',
                file: ['/test.js']
            }).join(' '), '--credentials admin:admin propget --recursive --verbose --version name /test.js');
        });
    });

    describe('proplist()', () => {
        it('should execute proplist command with correct arguments', () => {
            assert.equal(vault.parseOptions('proplist', {
                quite: false,
                recursive: true,
                file: ['/test.js']
            }).join(' '), '--credentials admin:admin proplist --recursive --verbose --version /test.js');
        });
    });

    describe('propset()', () => {
        it('should execute propset command with correct arguments', () => {
            assert.equal(vault.parseOptions('propset', {
                quite: false,
                recursive: true,
                propname: 'name',
                propval: 'test',
                file: ['/test.js']
            }).join(' '), '--credentials admin:admin propset --recursive --verbose --version name test /test.js');
        });
    });

    describe('add()', () => {
        it('should execute add command with correct arguments', () => {
            assert.equal(vault.parseOptions('add', {
                verbose: true,
                quite: false,
                force: true,
                nonRecursive: true,
                file: ['/test.js']
            }).join(' '), '--credentials admin:admin add --non-recursive --force --verbose --version /test.js');
        });
    });

    describe('delete()', () => {
        it('should execute delete command with correct arguments', () => {
            assert.equal(vault.parseOptions('delete', {
                verbose: true,
                quite: false,
                force: true,
                file: ['/test.js']
            }).join(' '), '--credentials admin:admin delete --force --verbose --version /test.js');
        });
    });

    describe('diff()', () => {
        it('should execute diff command with correct arguments', () => {
            assert.equal(vault.parseOptions('diff', {
                nonRecursive: true,
                file: ['/test.js']
            }).join(' '), '--credentials admin:admin diff --non-recursive --verbose --version /test.js');
        });
    });

    describe('console()', () => {
        it('should execute console command with correct arguments', () => {
            assert.equal(vault.parseOptions('console', {
                settings: '/test.js'
            }).join(' '), '--credentials admin:admin console --console-settings /test.js --verbose --version');
        });
    });

    describe('rcp()', () => {
        it('should execute rcp command with correct arguments', () => {
            assert.equal(vault.parseOptions('rcp', {
                quite: false,
                recursive: true,
                batchSize: 100,
                throttle: 1,
                update: true,
                newer: true,
                exclude: 'css',
                src: 'http://localhost:4502/crx/-/jcr:root/content',
                dst: 'http://admin:admin@localhost:4503/crx/-/jcr:root/content_copy'
            }).join(' '), '--credentials admin:admin rcp --batchSize 100 --throttle 1 --exclude css --recursive --newer --update --verbose --version http://localhost:4502/crx/-/jcr:root/content http://admin:admin@localhost:4503/crx/-/jcr:root/content_copy');
        });
    });

    describe('sync()', () => {
        it('should execute sync command with correct arguments', () => {
            assert.equal(vault.parseOptions('sync', {
                verbose: true,
                force: true,
                uri: 'http://localhost:4502',
                command: 'install',
                localPath: '/'
            }).join(' '), '--credentials admin:admin sync --uri http://localhost:4502 --force --verbose --version install /');
        });
    });
});