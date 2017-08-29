define("ace/theme/nature",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-nature";
exports.cssText = ".ace-nature .ace_gutter {\
background: #a9d619;\
color: #b7551d\
}\
.ace-nature {\
opacity: 1.0;\
color: #b7551d\
}\
.ace-nature .ace_cursor {\
color: #b7551d\
}\
.ace-nature .ace_marker-layer .ace_selection {\
background: #00b777\
}\
.ace-nature .ace_marker-layer .ace_active-line {\
background: #3ab03d\
}\
.ace-nature .ace_gutter-active-line {\
background-color : #199c1c\
}\
.ace-nature .ace_keyword,\
.ace-nature .ace_meta,\
.ace-nature .ace_support.ace_constant.ace_property-value {\
color: #0e7111\
}\
.ace-nature .ace_keyword.ace_operator {\
color: #175c83\
}\
.ace-nature .ace_constant.ace_language {\
color: #db0a26\
}\
.ace-nature .ace_constant.ace_numeric {\
color: #005922\
}\
.ace-nature .ace_comment {\
color: #f35c00\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
