var args = require('yargs').argv;
var httpProxy = require('http-proxy');
var fs = require('fs');
var path = require('path');
var https = require('https');
var WebSocket = require('ws');
var PackageManager = require('../package-manager');

var localConfig = PackageManager.getTaskConfig('local', false);
var httpsConfig = localConfig.https;
var lrConfig = localConfig.livereload;

var key = null;
var cert = null;

if(httpsConfig) {
    var keyfile = path.join(process.gulp_init_cwd, httpsConfig.key);
    var certfile = path.join(process.gulp_init_cwd, httpsConfig.cert);

    key = fs.readFileSync(keyfile, 'utf8');
    cert = fs.readFileSync(certfile, 'utf8');
}

var started = false;
function setupSecureWs() {
    var proxy = new WebSocket('ws://localhost:' + lrConfig.config.port + '/livereload');
    proxy.on('open', function() {
        started = true;

        var httpsServer = https.createServer({key: key, cert: cert}, function(req, res) {});
        httpsServer.listen(lrConfig.secure.port);
        var server = new WebSocket.Server({ server: httpsServer });
        server.on('connection', function(ws) {
            ws.on('message', function(data, flags) {
                proxy.send(data, flags, function(err) { /*if(err) console.error(err);*/ });
            });
            proxy.on('message', function(data, flags) {
                ws.send(data, flags, function(err) { /*if(err) console.error(err);*/ });
            });
        });
    });
    proxy.on('error', function(error) {
        if(!started) {
            try {
                proxy.terminate();
            } catch (e) {
            }
            // try again until livereload is up
            setupSecureWs();
        }
    });
}
function setupSecureProxy() {
    if (httpsConfig) {
        httpProxy.createServer({
            ssl: { key: key, cert: cert },
            target: 'http://localhost:' + lrConfig.config.port,
            secure: true
        }).listen(lrConfig.secure.js_port);
    }
}

module.exports = function () {
    if (httpsConfig && args._ && args._[0] === 'local') {
        setupSecureProxy();
        setupSecureWs();
    }
};