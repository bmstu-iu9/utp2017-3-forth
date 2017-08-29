define("ace/theme/ubuntu",["require","exports","module","ace/lib/dom"], function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-ubuntu";
exports.cssText = ".ace-ubuntu .ace_gutter {\
background: #78587D;\
color: #BFC5D1\
}\
.ace-ubuntu {\
opacity: 1.0;\
color: #BFC5D1\
}\
.ace-ubuntu .ace_cursor {\
color: #BFC5D1\
}\
.ace-ubuntu .ace_marker-layer .ace_selection {\
background: #caa7ac\
}\
.ace-ubuntu .ace_marker-layer .ace_active-line {\
background: #7A6C7C\
}\
.ace-ubuntu .ace_gutter-active-line {\
background-color : #716272\
}\
.ace-ubuntu .ace_keyword,\
.ace-ubuntu .ace_meta,\
.ace-ubuntu .ace_support.ace_constant.ace_property-value {\
color: #32CD32\
}\
.ace-ubuntu .ace_keyword.ace_operator {\
color: #639222\
}\
.ace-ubuntu .ace_constant.ace_language {\
color: #CD3437\
}\
.ace-ubuntu .ace_constant.ace_numeric {\
color: #bca42a\
}\
.ace-ubuntu .ace_comment {\
color: #B28EAA\
}";

var dom = require("../lib/dom");
dom.importCssString(exports.cssText, exports.cssClass);
});
