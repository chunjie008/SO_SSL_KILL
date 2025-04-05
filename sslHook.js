function awaitForCondition(callback) {
    var i = setInterval(function () {
      var addr = Module.findBaseAddress('libcocos2djs.so');
        if (addr) {
            clearInterval(i);
            callback(addr);
        }
    }, 1000);
}

var cocos2djs = null;

awaitForCondition(function (base) {
    cocos2djs = ptr(base);
    hookSslSymbols()
});


function hookSslSymbols() {
    var x509_verify_cert = Module.findExportByName('libcocos2djs.so', "X509_verify_cert");
    if (x509_verify_cert) {
        Interceptor.attach(x509_verify_cert, {
            onEnter: function (args) {
            },
            onLeave: function (retval) {
                retval.replace(1);
            }
        });
    } else {
    }

    var ssl_get_verify_result = Module.findExportByName('libcocos2djs.so', "SSL_get_verify_result");
    if (ssl_get_verify_result) {
        Interceptor.attach(ssl_get_verify_result, {
            onEnter: function (args) {
            },
            onLeave: function (retval) {
                retval.replace(0); 
            }
        });
    } else {
    }
}
