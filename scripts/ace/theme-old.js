define("ace/theme/old",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-old";
exports.cssText = ".ace-old .ace_gutter {\
background: #bdac76;\
color: #000000\
}\
.ace-old {\
opacity: 1.0;\
color: #000000\
}\
.ace-old .ace_cursor {\
color: #601800\
}\
.ace-old .ace_marker-layer .ace_selection {\
background: #eca951\
}\
.ace-old .ace_marker-layer .ace_active-line {\
background: #e3bb69\
}\
.ace-old .ace_gutter-active-line {\
background-color : #c39d4f\
}\
.ace-old .ace_keyword,\
.ace-old .ace_meta,\
.ace-old .ace_support.ace_constant.ace_property-value {\
color: #db233f\
}\
.ace-old .ace_keyword.ace_operator {\
color: #e7802c\
}\
.ace-old .ace_constant.ace_language {\
color: #2582b5\
}\
.ace-old .ace_constant.ace_numeric {\
color: #3e9a0e\
}\
.ace-old .ace_comment {\
color: #b75b15\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
