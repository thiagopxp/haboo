/**
 * @param pathRegExp
 * @param pathReplacement
 * @param exts
 * @constructor
 */
var AliasOverridePlugin = function(pathRegExp, pathReplacement) {
    this.pathRegExp = pathRegExp;
    this.pathReplacement = pathReplacement;
}

AliasOverridePlugin.prototype.apply = function (resolver) {
    var pathRegExp = this.pathRegExp;
    var pathReplacement = this.pathReplacement;
    var exts = this.exts;

    resolver.plugin("normal-module-factory", function(nmf) {
        nmf.plugin("before-resolve", function(result, callback) {
            if(!result) return callback();

            // test the request for a path match
            if(pathRegExp.test(result.request)) {
                var filePath = result.request.replace(pathRegExp, pathReplacement)
                result.request = filePath;
                return callback(null, result);

            } else {
                return callback(null, result);
            }
        });
    });
};

module.exports = AliasOverridePlugin


