define("ace/theme/matrix",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-matrix";
exports.cssText = ".ace-matrix .ace_gutter {\
background: #071400;\
color: #00FF00\
}\
.ace-matrix {\
opacity: 1.0;\
color: #228B22\
}\
.ace-matrix .ace_cursor {\
color: #00FF00\
}\
.ace-matrix .ace_marker-layer .ace_selection {\
background: #00FF7F\
}\
.ace-matrix .ace_marker-layer .ace_active-line {\
background: #0d2600\
}\
.ace-matrix .ace_gutter-active-line {\
background-color : #0d2600\
}\
.ace-matrix .ace_keyword,\
.ace-matrix .ace_meta,\
.ace-matrix .ace_support.ace_constant.ace_property-value {\
color: #32CD32\
}\
.ace-matrix .ace_keyword.ace_operator {\
color: #8FBC8F\
}\
.ace-matrix .ace_constant.ace_language {\
color: #39946A\
}\
.ace-matrix .ace_constant.ace_numeric {\
color: #40E0D0\
}\
.ace-matrix .ace_comment {\
color: #556B2F\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
