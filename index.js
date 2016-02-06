"use strict";
/**
 * Created by Nisheeth on 06/02/2016.
 */

/**
 * Create a new FileVault
 * @class
 * @name FileVault
 * @see {@link http://jackrabbit.apache.org/filevault/overview.html}
 * @see {@link https://docs.adobe.com/docs/en/crx/2-3/how_to/how_to_use_the_vlttool.html}
 *
 * @param {object} options - command arguments parameter.
 * @param {boolean} options.verbose - verbose output.
 * @param {boolean} options.quiet - prints as little as possible.
 * @param {boolean} options.version - Prints the version information and exits VLT
 * @param {string} options.Xjcrlog - Extended JcrLog options
 * @param {string} options.Xdavex - Extended JCR remoting options
 * @param {string} options.config - The JcrFs config to use
 * @param {string} options.logLevel - Indicates the log level, for example, the log4j log level.
 * @param {string} options.credentials - The default credentials to use
 * @param {string} options.username - username.
 * @param {string} options.password - password.
 */
class FileVault {

    constructor(options) {
        this.cp = require('child_process');
        this.options = options || {};
    }

    /**
     * Parse options
     *
     * @summary Parse options
     * @method
     * @private
     * @param {string} command - vlt command name.
     * @param {object} options - command arguments parameter.
     * @return {string} parameters.
     */
    parseOptions(cmd, opts) {
        let params = ['vlt', cmd];
        let options = Object.assign({}, this.options, opts);

        if (options.Xjcrlog) params.push(`-Xjcrlog ${options.Xjcrlog}`);
        if (options.Xdavex) params.push(`-Xdavex ${options.Xdavex}`);
        if (options.config) params.push(`--config ${options.config}`);
        if (options.logLevel) params.push(`--log-level ${options.logLevel}`);
        if (options.type) params.push(`--type ${options.type}`);
        if (options.credentials) {
            params.push(`--credentials ${options.credentials}`);
        } else if (options.username && options.password) {
            params.push(`--credentials ${options.username}:${options.password}`);
        } else {
            throw new Error('Please provide credentials.');
        }

        if (options.filter) params.push(`--filter ${options.filter}`);
        if (options.linkFormat) params.push(`--linkFormat ${options.linkFormat}`);
        if (options.settings) params.push(`--console-settings ${options.settings}`);
        if (options.batchSize) params.push(`--batchSize ${options.batchSize}`);
        if (options.throttle) params.push(`--throttle ${options.throttle}`);
        if (cmd === 'sync' && options.uri) params.push(`--uri ${options.uri}`);
        if (options.exclude) {
            params.push(`--exclude ${(Array.isArray(options.exclude) ? options.exclude.join(' ') : options.exclude)}`);
        }

        if (options.recursive) params.push('--recursive');
        else if (options.nonRecursive) params.push('--non-recursive');

        if (options.prune) params.push('--prune-missing');
        if (options.sync) params.push('--sync');
        if (options.showUpdate) params.push('--show-update');
        if (options.force) params.push('--force');
        if (options.newer) params.push('--newer');
        if (options.update) params.push('--update');

        if (options.verbose) params.push('--verbose');
        else if (options.quiet) params.push('--quiet');

        if (options.version) params.push('--version');

        if (options.command) params.push(options.command);
        if (options.propname) params.push(options.propname);
        if (options.propval) params.push(options.propval);
        if (cmd !== 'sync' && options.uri) params.push(options.uri);
        if (options.src) params.push(options.src);
        if (options.dst) params.push(options.dst);
        if (options.jcrPath) params.push(options.jcrPath);
        if (options.localPath) {
            params.push(Array.isArray(options.localPath) ? options.localPath.join(' ') : options.localPath);
        }
        if (options.file) {
            params.push(Array.isArray(options.file) ? options.file.join(' ') : options.file);
        }

        return params.join(' ');
    }

    /**
     * Execute vlt command
     *
     * @summary Execute vlt command
     * @method
     * @private
     * @param {string} command - vlt command name.
     * @param {object} options - command arguments parameter.
     * @return {Promise} A Promise object.
     */
    exec(command, options) {
        return (new Promise((resolve, reject) => {
            this.cp.exec(this.parseOptions(command, options), (error, stdout, stderr) => {
                return error !== null ? reject(stderr, error) : resolve(stdout);
            });
        }));
    }

    /**
     * Exports from a JCR repository (vault file system) to the local file system without control files.
     *
     * @summary Exports the Vault filesystem mounted at <uri> to the local filesystem at <local-path>.
     *      An optional <jcr-path> can be specified in order to export just a sub-tree.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.verbose - verbose output.
     * @param {boolean} options.prune - specifies if missing local files should be deleted.
     * @param {string} options.type - specifies the export type, either platform or jar.
     * @param {string} options.uri - mountpoint uri.
     * @param {string} options.jcrPath - JCR path.
     * @param {string} options.localPath - local path.
     * @return {Promise} A Promise object.
     */
    export(options) {
        return this.exec('export', options);
    }

    /**
     * Imports a local file system to a JCR repository (vault file system).
     *
     * @summary Imports the local file system (starting at <local-path> to the vault file system at <uri>.
     *  You can specify a <jcr-path>as import root.
     *  If --sync is specified, the imported files are automatically put under vault control.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.verbose - verbose output.
     * @param {string} options.sync - puts the local files under vault control.
     * @param {string} options.uri - mountpoint uri.
     * @param {string} options.jcrPath - JCR path.
     * @param {string} options.localPath - local path.
     * @return {Promise} A Promise object.
     */
    import(options) {
        return this.exec('import', options);
    }

    /**
     * Checks out a Vault file system. Use this for an initial JCR repository to the local file system.
     * (Note: You must first check out the repository in subversion.)
     *
     * @summary Performs an initial check out from a JCR repository to the local filesystem starting at <uri> to the local filesystem at <local-path>.
     * You can also add a <jcrPath> argument to check out a sub-directory of the remote tree.
     * Workspace filters can be specified that are copied into the META-INF directory.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.verbose - verbose output.
     * @param {boolean} options.force - forces checkout to overwrite local files if they already exist.
     * @param {boolean} options.quiet - prints as little as possible.
     * @param {string} options.filter - <file> specifies auto filters if none are defined
     * @param {string} options.uri - mountpoint uri.
     * @param {string} options.jcrPath - JCR path.
     * @param {string} options.localPath - local path.
     * @return {Promise} A Promise object.
     */
    checkout(options) {
        return this.exec('checkout', options);
    }

    /**
     * Analyzes packages.
     *
     * @summary Analyzes packages.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.verbose - verbose output.
     * @param {boolean} options.quiet - prints as little as possible.
     * @param {string} options.linkFormat - <format> printf format for hotfix links (name,id), for example [CQ520_HF_%s|%s]
     * @param {array} options.localPath - local path.
     * @return {Promise} A Promise object.
     */
    analyze(options) {
        return this.exec('analyze', options);
    }

    /**
     * Prints the status of working copy files and directories.
     *
     * @summary Prints the status of working copy files and directories.
     *  If --show-update is specified, each file is checked against the remote version.
     *  The second letter then specifies what action would be performed by an update operation.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.verbose - verbose output.
     * @param {boolean} options.quiet - prints as little as possible.
     * @param {boolean} options.showUpdate - displays update information
     * @param {boolean} options.nonRecursive - operates on a single directory
     * @param {array} options.file - file or directory to display the status
     * @return {Promise} A Promise object.
     */
    status(options) {
        return this.exec('status', options);
    }

    /**
     * Imports changes from the repository into the working copy.
     *
     * @summary Copies changes from the repository into the working copy.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.verbose - verbose output.
     * @param {boolean} options.quiet - prints as little as possible.
     * @param {boolean} options.force - forces the overwrite of local files
     * @param {boolean} options.nonRecursive - operates on a single directory
     * @param {array} options.file - file or directory to update
     * @return {Promise} A Promise object.
     */
    update(options) {
        return this.exec('update', options);
    }

    /**
     * Displays information about a local file.
     *
     * @summary Displays information about a local file.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.verbose - verbose output.
     * @param {boolean} options.quiet - prints as little as possible.
     * @param {boolean} options.recursive - operates recursive
     * @param {array} options.file - file or directory to update
     * @return {Promise} A Promise object.
     */
    info(options) {
        return this.exec('info', options);
    }

    /**
     * Sends changes from your working copy to the repository.
     *
     * @summary Sends changes from your working copy to the repository.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.verbose - verbose output.
     * @param {boolean} options.quiet - prints as little as possible.
     * @param {boolean} options.force - forces committing even if the remote copy is modified
     * @param {boolean} options.nonRecursive - operates on a single directory
     * @param {array} options.file - file or directory to update
     * @return {Promise} A Promise object.
     */
    commit(options) {
        return this.exec('commit', options);
    }

    /**
     * Restores the working copy file to its original state and undoes most local edits.
     *
     * @summary Restores the working copy file to its original state and undoes most local edits.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.quiet - prints as little as possible.
     * @param {boolean} options.recursive - descends recursively
     * @param {array} options.file - file or directory to update
     * @return {Promise} A Promise object.
     */
    revert(options) {
        return this.exec('revert', options);
    }

    /**
     * Removes conflicted state on working copy files or directories.
     *
     * @summary Removes conflicted state on working copy files or directories.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.force - resolves, even if there are conflict markers
     * @param {boolean} options.quiet - prints as little as possible
     * @param {boolean} options.recursive - descends recursively
     * @param {array} options.file - file or directory to update
     * @return {Promise} A Promise object.
     */
    resolved(options) {
        return this.exec('resolved', options);
    }

    /**
     * Prints the value of a property on files or directories.
     *
     * @summary Prints the value of a property on files or directories.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.quiet - prints as little as possible
     * @param {boolean} options.recursive - descends recursively
     * @param {string} options.propname - the property name
     * @param {array} options.file - file or directory to get the property from
     * @return {Promise} A Promise object.
     */
    propget(options) {
        return this.exec('propget', options);
    }

    /**
     * Prints the properties on files or directories.
     *
     * @summary Prints the properties on files or directories.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.quiet - prints as little as possible
     * @param {boolean} options.recursive - descends recursively
     * @param {array} options.file - file or directory to list the properties from
     * @return {Promise} A Promise object.
     */
    proplist(options) {
        return this.exec('proplist', options);
    }

    /**
     * Sets the value of a property on files or directories.
     *
     * @summary Sets the value of a property on files or directories.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.quiet - prints as little as possible
     * @param {boolean} options.recursive - descends recursively
     * @param {string} options.propname - the property name
     * @param {string} options.propval - the property value
     * @param {array} options.file - file or directory to set the property to
     * @return {Promise} A Promise object.
     */
    propset(options) {
        return this.exec('propset', options);
    }

    /**
     * Puts files and directories under version control.
     *
     * @summary Puts files and directories under version control, scheduling them for addition to repository.
     *      They will be added on next commit.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.verbose - verbose output.
     * @param {boolean} options.force - forces the operation to run
     * @param {boolean} options.quiet - prints as little as possible
     * @param {boolean} options.nonRecursive - operates on a single directory
     * @param {array} options.file - local file or directory to add
     * @return {Promise} A Promise object.
     */
    add(options) {
        return this.exec('add', options);
    }

    /**
     * Removes files and directories from version control.
     *
     * @summary Removes files and directories from version control.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.verbose - verbose output.
     * @param {boolean} options.force - forces the operation to run
     * @param {boolean} options.quiet - prints as little as possible
     * @param {array} options.file - local file or directory to add
     * @return {Promise} A Promise object.
     */
    delete(options) {
        return this.exec('delete', options);
    }

    /**
     * Displays the differences between two paths.
     *
     * @summary Displays the differences between two paths.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.nonRecursive - operates on a single directory
     * @param {array} options.file - local file or directory to add
     * @return {Promise} A Promise object.
     */
    diff(options) {
        return this.exec('diff', options);
    }

    /**
     * Runs an interactive console.
     *
     * @summary Runs an interactive console.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {string} options.settings - specifies the console settings file. The default file is console.properties.
     * @return {Promise} A Promise object.
     */
    console(options) {
        return this.exec('console', options);
    }

    /**
     * Copies a node tree from one remote repository to another.
     *
     * @summary Copies a node tree from one remote repository to another.
     *      <src> points to the source node and <dst> specifies the destination path,
     *      where the parent node must exist. Rcp processes the nodes by streaming the data.
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.quiet - prints as little as possible
     * @param {boolean} options.recursive - descends recursively
     * @param {string} options.batchSize - <size> Number of nodes to be processed before an intermediate save.
     * @param {string} options.throttle - <seconds>    Number of seconds to wait after an intermediate save.
     * @param {boolean} options.update - Overwrite/delete existing nodes.
     * @param {boolean} options.newer - Respect lastModified properties for update.
     * @param {string} options.exclude - Regexp of excluded source paths.
     * @param {string} options.src - The repository address of the source tree.
     * @param {string} options.dst - The repository address of the destination node.
     * @return {Promise} A Promise object.
     */
    rcp(options) {
        return this.exec('rcp', options);
    }

    /**
     * Allows to control the vault sync service.
     *
     * @summary Allows to control the vault sync service.
     *      Without any arguments this command tries to put the current working directory under sync control.
     *      If executed within a vlt checkout, it uses the respective filter and host to configure the synchronization.
     *      If executed outside of a vlt checkout, it registers the current folder for synchronization only if the directory is empty.
     *
     * @method
     * @param {object} options - command arguments parameter.
     * @param {boolean} options.verbose - verbose output.
     * @param {boolean} options.force - force certain commands to execute
     * @param {string} options.uri - <uri> specifies the URI of the sync host.
     * @param {string} options.command - sync command to execute.
     * @param {string} options.localPath - local path.
     * @return {Promise} A Promise object.
     */
    sync(options) {
        return this.exec('sync', options);
    }
}

module.exports = FileVault;
