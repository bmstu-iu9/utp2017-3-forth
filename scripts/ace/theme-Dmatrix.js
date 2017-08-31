define("ace/theme/Dmatrix",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-Dmatrix";
exports.cssText = ".ace-Dmatrix .ace_gutter {\
background: #071400;\
color: #00FF00\
}\
.ace-Dmatrix {\
opacity: 1.0;\
color: #228B22\
}\
.ace-Dmatrix .ace_cursor {\
color: #F4E848\
}\
.ace-Dmatrix .ace_marker-layer .ace_selection {\
background: #00FF7F\
}\
.ace-Dmatrix .ace_marker-layer .ace_active-line {\
background: #F4E848\
}\
.ace-Dmatrix .ace_gutter-active-line {\
background-color : #847e25\
}\
.ace-Dmatrix .ace_keyword,\
.ace-Dmatrix .ace_meta,\
.ace-Dmatrix .ace_support.ace_constant.ace_property-value {\
color: #32CD32\
}\
.ace-Dmatrix .ace_keyword.ace_operator {\
color: #8FBC8F\
}\
.ace-Dmatrix .ace_constant.ace_language {\
color: #39946A\
}\
.ace-Dmatrix .ace_constant.ace_numeric {\
color: #40E0D0\
}\
.ace-Dmatrix .ace_comment {\
color: #556B2F\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
