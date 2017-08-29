define("ace/theme/Dnature",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-Dnature";
exports.cssText = ".ace-Dnature .ace_gutter {\
background: #a9d619;\
color: #b7551d\
}\
.ace-Dnature {\
opacity: 1.0;\
color: #b7551d\
}\
.ace-Dnature .ace_cursor {\
color: #0a82db\
}\
.ace-Dnature .ace_marker-layer .ace_selection {\
background: #00b777\
}\
.ace-Dnature .ace_marker-layer .ace_active-line {\
background: #0a82db\
}\
.ace-Dnature .ace_gutter-active-line {\
background-color : #006ab9\
}\
.ace-Dnature .ace_keyword,\
.ace-Dnature .ace_meta,\
.ace-Dnature .ace_support.ace_constant.ace_property-value {\
color: #0e7111\
}\
.ace-Dnature .ace_keyword.ace_operator {\
color: #175c83\
}\
.ace-Dnature .ace_constant.ace_language {\
color: #db0a26\
}\
.ace-Dnature .ace_constant.ace_numeric {\
color: #005922\
}\
.ace-Dnature .ace_comment {\
color: #f35c00\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
