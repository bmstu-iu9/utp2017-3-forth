define("ace/theme/white",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-white";
exports.cssText = ".ace-white .ace_gutter {\
background: #f0f0f0;\
color: black\
}\
.ace-white {\
opacity: 1.0;\
color: black\
}\
.ace-white .ace_cursor {\
color: black\
}\
.ace-white .ace_marker-layer .ace_selection {\
background: #b5d5ff\
}\
.ace-white .ace_marker-layer .ace_active-line {\
background: #ededed\
}\
.ace-white .ace_gutter-active-line {\
background-color : #dcdcdc\
}\
.ace-white .ace_keyword,\
.ace-white .ace_meta,\
.ace-white .ace_support.ace_constant.ace_property-value {\
color: blue\
}\
.ace-white .ace_keyword.ace_operator {\
color: #687687\
}\
.ace-white .ace_constant.ace_language {\
color: #585cf6\
}\
.ace-white .ace_constant.ace_numeric {\
color: #0000cd\
}\
.ace-white .ace_comment {\
color: #4c886b\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});