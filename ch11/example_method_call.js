RPC.Util.date('d/m/Y', console.log, console);



var callbackFn = function(res) {
    this.log(res);
    this.timeEnd('DirectTiming');
}

console.time('DirectTiming');
RPC.Util.date('d/m/Y', callbackFn, console);

/**
 * undefined
 * 25/02/2012
 * DirectTiming: 1514ms
 */





//multiple requests
console.time('DirectTiming');
RPC.Util.date('d/m/Y', function(res) {
    console.log(res);
    console.timeEnd('DirectTiming');
});
RPC.Util.date('d/m/Y', function(res) {
    console.log(res);
    console.timeEnd('DirectTiming');
});
RPC.Util.date('d/m/Y', function(res) {
    console.log(res);
    console.timeEnd('DirectTiming');
});
RPC.Util.date('d/m/Y', function(res) {
    console.log(res);
    console.timeEnd('DirectTiming');
});

/**
 * undefined
 * 25/02/2012
 * DirectTiming: 1307ms
 * 25/02/2012
 * 25/02/2012
 * 25/02/2012
*/