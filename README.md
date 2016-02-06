# FileVault

FileVault is Apache Jackrabbit FileVault/Adobe CQ VLT node integration.

### Installation

Download and install vlt command line tool from one of the following link and set it on path.

* [Adobe Experience Manager]
* [JackRabbit FileFault]

You also need to install FileVault globally:

```sh
$ npm install -g filevault
```

### Usage

```javascript
const FileVault = require('filevault');
const devServer = new FileVault({
    verbose: true,
    username: 'admin',
    password: 'admin'
});

devServer
    .import({
        uri: 'http://localhost:4502/crx',
        jcrPath: '.',
        localPath: '/'
    })
    .then((response, error)=>{
    
    })
```

[Adobe Experience Manager]: <https://docs.adobe.com/docs/en/crx/2-3/how_to/how_to_use_the_vlttool.html>
[JackRabbit FileFault]: <http://jackrabbit.apache.org/filevault/index.html>
