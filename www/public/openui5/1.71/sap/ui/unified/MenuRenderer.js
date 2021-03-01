/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var M={};M.render=function(r,m){var a=sap.ui.getCore().getConfiguration().getAccessibility(),R=m.getRootMenu();if(m.oHoveredItem&&m.indexOfItem(m.oHoveredItem)<0){m.oHoveredItem=null;}r.write("<div");r.writeAttribute("tabindex",-1);r.writeAttribute("hideFocus",true);if(m.getTooltip_AsString()){r.writeAttributeEscaped("title",m.getTooltip_AsString());}if(a){r.writeAccessibilityState(m,{disabled:null,labelledby:{value:m.getId()+"-label",append:true}});}r.addClass("sapUiMnu");if(R.bUseTopStyle){r.addClass("sapUiMnuTop");}if(R.isCozy()){r.addClass("sapUiSizeCozy");}if(m.bCozySupported){r.addClass("sapUiMnuCozySupport");}r.writeClasses();r.writeControlData(m);r.write(">");M.renderItems(r,m);if(a){r.write("<span id='"+m.getId()+"-label' class='sapUiInvisibleText' aria-hidden='true'>");r.writeEscaped(m.getAriaDescription()?m.getAriaDescription():"");r.write("</span>");}r.write("</div>");};M.renderItems=function(r,m){var I=m.getItems(),a=sap.ui.getCore().getConfiguration().getAccessibility(),h=false,H=false,n=0,b=0,i,o;r.write("<ul");r.writeAttribute("role","menu");r.addClass("sapUiMnuLst");for(i=0;i<I.length;i++){if(I[i].getIcon&&I[i].getIcon()){h=true;}if(I[i].getSubmenu()){H=true;}}if(!h){r.addClass("sapUiMnuNoIco");}if(!H){r.addClass("sapUiMnuNoSbMnu");}r.writeClasses();r.write(">");n=0;for(i=0;i<I.length;i++){if(I[i].getVisible()&&I[i].render){n++;}}for(i=0;i<I.length;i++){o=I[i];if(o.getVisible()&&o.render){b++;if(o.getStartsSection()){r.write("<li");if(a){r.writeAttribute("role","separator");}r.addClass("sapUiMnuDiv");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapUiMnuDivL");r.writeClasses();r.write(">");r.write("</div>");r.write("<hr>");r.write("<div");r.addClass("sapUiMnuDivR");r.writeClasses();r.write(">");r.write("</div>");r.write("</li>");}o.render(r,o,m,{bAccessible:a,iItemNo:b,iTotalItems:n});}}r.write("</ul>");};return M;},true);
