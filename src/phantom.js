/*
 * @Author: qiuz
 * @Github: <https://github.com/qiuziz>
 * @Date: 2018-09-21 16:08:57
 * @Last Modified by: qiuz
 * @Last Modified time: 2018-10-09 17:52:21
 */
var USER_AGENTS = require('./user-agents')
    , LEN = USER_AGENTS.length
    , random = require('./util').random
    , system = require('system') //get args
    , args = system.args
    , port = 8081;

if (args.length === 2 ) {
    port = Number(args[1]);
}

var webserver = require('webserver');

webserver.create().listen(port, { keepAlive: true }, function(request, response) {
  try {
    var bodyParams = JSON.parse(JSON.parse(request.post));
      url= bodyParams.url;
      // create page
      var webPage = require('webpage');
      var page = webPage.create();
      page.settings.userAgent = USER_AGENTS[random(0, LEN)];
      // page.settings.loadImages = false;
      page.settings.resourceTimeout = 10000;//timeout is 10s
      // page error catch
      page.onError = function(msg, trace) {
          console.log("[Warning]This is page.onError", msg);
          // console.error(msgStack.join('\n'));
      };
      // phantomjs error catch
      phantom.onError = function(msg, trace) {
        console.log(new Date().toLocaleString("CST"));
        console.log("[Warning]This is phantom.onError");
        var msgStack = ['PHANTOM ERROR: ' + msg];
        if (trace && trace.length) {
          msgStack.push('TRACE:');
          trace.forEach(function(t) {
            msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
          });
        }
        console.error(msgStack.join('\n'));
        // phantom.exit(1);
      };
      // open url, get html
      page.open(url, function (status) {
        console.log(new Date().toLocaleString("CST"));
        console.log('Target_url is ' + url);
        var body = '';
        if(status === 'success') {
            body= page.content;
        }
        response.status=200;
        response.write(body);  //return html
        page.close();
        response.close();
      });
  } catch(e) {
    console.log('[Error]'+e.message+'happen'+e.lineNumber+'line');
  }
});
