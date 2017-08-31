define("ace/theme/Dwhite",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-Dwhite";
exports.cssText = ".ace-Dwhite .ace_gutter {\
background: #f0f0f0;\
color: black\
}\
.ace-Dwhite {\
opacity: 1.0;\
color: black\
}\
.ace-Dwhite .ace_cursor {\
color: #b71b2c\
}\
.ace-Dwhite .ace_marker-layer .ace_selection {\
background: #b5d5ff\
}\
.ace-Dwhite .ace_marker-layer .ace_active-line {\
background: #b71b2c\
}\
.ace-Dwhite .ace_gutter-active-line {\
background-color : #881b2c\
}\
.ace-Dwhite .ace_keyword,\
.ace-Dwhite .ace_meta,\
.ace-Dwhite .ace_support.ace_constant.ace_property-value {\
color: blue\
}\
.ace-Dwhite .ace_keyword.ace_operator {\
color: #687687\
}\
.ace-Dwhite .ace_constant.ace_language {\
color: #585cf6\
}\
.ace-Dwhite .ace_constant.ace_numeric {\
color: #0000cd\
}\
.ace-Dwhite .ace_comment {\
color: #4c886b\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
