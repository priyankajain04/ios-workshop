/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var C={};C.render=function(r,c){c._iMode=0;var i=c.getId();var t=c.getTooltip_AsString();var m=c.getAggregation("monthsRow");r.write("<div");r.writeControlData(c);r.addClass("sapUiCal");r.addClass("sapUiCalInt");r.addClass("sapUiCalMonthInt");if(c._getShowItemHeader()){r.addClass("sapUiCalIntHead");}var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");var A={labelledby:{value:"",append:false}};if(c._bPoupupMode){A["role"]="dialog";}r.writeAccessibilityState(c,A);if(t){r.writeAttributeEscaped('title',t);}var w=c.getWidth();if(w&&w!=''){r.addStyle("width",w);r.writeStyles();}r.writeClasses();r.write(">");var h=c.getAggregation("header");r.renderControl(h);r.write("<div id=\""+i+"-content\" class=\"sapUiCalContent\">");r.renderControl(m);r.write("</div>");r.write("<button id=\""+i+"-cancel\" class=\"sapUiCalCancel\" tabindex=\"-1\">");r.write(a.getText("CALENDAR_CANCEL"));r.write("</button>");r.write("<div id=\""+i+"-end\" tabindex=\"0\" style=\"width:0;height:0;position:absolute;right:0;bottom:0;\"></div>");if(c.getPickerPopup()){r.write("<div id=\""+i+"-contentOver\" class=\"sapUiCalContentOver\"");if(!c._oPopup||!c._oPopup.isOpen()){r.write("style=\"display:none;\"");}r.write(">");r.write("</div>");}r.write("</div>");};return C;},true);
