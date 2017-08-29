define("ace/theme/Dold",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-Dold";
exports.cssText = ".ace-Dold .ace_gutter {\
background: #bdac76;\
color: #000000\
}\
.ace-Dold {\
opacity: 1.0;\
color: #000000\
}\
.ace-Dold .ace_cursor {\
color: #026f3f\
}\
.ace-Dold .ace_marker-layer .ace_selection {\
background: #eca951\
}\
.ace-Dold .ace_marker-layer .ace_active-line {\
background: #026f3f\
}\
.ace-Dold .ace_gutter-active-line {\
background-color : #005932\
}\
.ace-Dold .ace_keyword,\
.ace-Dold .ace_meta,\
.ace-Dold .ace_support.ace_constant.ace_property-value {\
color: #db233f\
}\
.ace-Dold .ace_keyword.ace_operator {\
color: #e7802c\
}\
.ace-Dold .ace_constant.ace_language {\
color: #2582b5\
}\
.ace-Dold .ace_constant.ace_numeric {\
color: #3e9a0e\
}\
.ace-Dold .ace_comment {\
color: #b75b15\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
