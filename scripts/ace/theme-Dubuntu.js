define("ace/theme/Dubuntu",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-Dubuntu";
exports.cssText = ".ace-Dubuntu .ace_gutter {\
background: #78587D;\
color: #BFC5D1\
}\
.ace-Dubuntu {\
opacity: 1.0;\
color: #BFC5D1\
}\
.ace-Dubuntu .ace_cursor {\
color: #F4E848\
}\
.ace-Dubuntu .ace_marker-layer .ace_selection {\
background: #caa7ac\
}\
.ace-Dubuntu .ace_marker-layer .ace_active-line {\
background: #F4E848\
}\
.ace-Dubuntu .ace_gutter-active-line {\
background-color : #847e25\
}\
.ace-Dubuntu .ace_keyword,\
.ace-Dubuntu .ace_meta,\
.ace-Dubuntu .ace_support.ace_constant.ace_property-value {\
color: #32CD32\
}\
.ace-Dubuntu .ace_keyword.ace_operator {\
color: #639222\
}\
.ace-Dubuntu .ace_constant.ace_language {\
color: #CD3437\
}\
.ace-Dubuntu .ace_constant.ace_numeric {\
color: #bca42a\
}\
.ace-Dubuntu .ace_comment {\
color: #B28EAA\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
