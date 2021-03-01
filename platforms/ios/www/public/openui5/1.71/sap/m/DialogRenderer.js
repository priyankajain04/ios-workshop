/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/ui/Device","sap/ui/core/library"],function(l,D,c){"use strict";var a=l.DialogType;var b=l.DialogRoleType;var V=c.ValueState;var d={};d._mStateClasses={};d._mStateClasses[V.None]="";d._mStateClasses[V.Success]="sapMDialogSuccess";d._mStateClasses[V.Warning]="sapMDialogWarning";d._mStateClasses[V.Error]="sapMDialogError";d._mStateClasses[V.Information]="sapMDialogInformation";d.render=function(r,C){var e=C.getId(),t=C.getType(),h=C._getAnyHeader(),s=C.getSubHeader(),m=(t===a.Message),L=C.getBeginButton(),R=C.getEndButton(),H=C.getHorizontalScrolling(),v=C.getVerticalScrolling(),S=C.getState(),f=C.getStretch(),g=C.getStretchOnPhone()&&D.system.phone,j=C.getResizable(),k=C.getDraggable(),o=C.getAggregation("_valueState");var n=C.getContentWidth()&&C.getContentWidth()!='auto'?' width: '+C.getContentWidth()+';':'';var p=C.getContentHeight()&&C.getContentHeight()!='auto'?' height: '+C.getContentHeight()+';':'';var q="style='"+n+p+"'";r.write('<div '+q);r.writeControlData(C);r.addClass("sapMDialog");r.addClass("sapMDialog-CTX");r.addClass("sapMPopup-CTX");if(C.isOpen()){r.addClass("sapMDialogOpen");}if(window.devicePixelRatio>1){r.addClass("sapMDialogHighPixelDensity");}if(C._bDisableRepositioning){r.addClass("sapMDialogTouched");}if(f||(g)){r.addClass("sapMDialogStretched");}r.addClass(d._mStateClasses[S]);var u=!C._oToolbar&&!L&&!R;var w=C._oToolbar&&C._isToolbarEmpty()&&!L&&!R;if(u||w){r.addClass("sapMDialog-NoFooter");}if(!h){r.addClass("sapMDialog-NoHeader");}var x=C.getProperty("role");if(S===V.Error||S===V.Warning){x=b.AlertDialog;}r.writeAccessibilityState(C,{role:x,modal:true});if(C._forceDisableScrolling){r.addClass("sapMDialogWithScrollCont");}if(s&&s.getVisible()){r.addClass("sapMDialogWithSubHeader");if(s.getDesign()==l.ToolbarDesign.Info){r.addClass("sapMDialogSubHeaderInfoBar");}}if(m){r.addClass("sapMMessageDialog");}if(!v){r.addClass("sapMDialogVerScrollDisabled");}if(!H){r.addClass("sapMDialogHorScrollDisabled");}if(D.system.phone){r.addClass("sapMDialogPhone");}if(k&&!f){r.addClass("sapMDialogDraggable");}if(l._bSizeCompact){r.addClass("sapUiSizeCompact");}r.writeClasses();var T=C.getTooltip_AsString();if(T){r.writeAttributeEscaped("title",T);}r.writeAttribute("tabindex","-1");r.write(">");if(D.system.desktop){if(j&&!f){r.writeIcon("sap-icon://resize-corner",["sapMDialogResizeHandler"],{"title":""});}r.write('<span id="'+C.getId()+'-firstfe" tabindex="0" class="sapMDialogFirstFE"></span>');}if(h){h._applyContextClassFor("header");r.write("<header");r.addClass("sapMDialogTitle");r.writeClasses();r.write(">");r.renderControl(h);r.write("</header>");}if(s){s._applyContextClassFor("subheader");r.write("<header");r.addClass("sapMDialogSubHeader");r.writeClasses();r.write(">");r.renderControl(s);r.write("</header>");}if(o){r.renderControl(o);}r.write('<section id="'+e+'-cont" class="sapMDialogSection">');r.write('<div id="'+e+'-scroll" class="sapMDialogScroll">');r.write('<div id="'+e+'-scrollCont" class="sapMDialogScrollCont');if(C.getStretch()||p){r.write(' sapMDialogStretchContent');}r.write('">');var y=C.getContent();for(var i=0;i<y.length;i++){r.renderControl(y[i]);}r.write("</div>");r.write("</div>");r.write("</section>");if(!(u||w)){r.write("<footer");r.addClass("sapMDialogFooter");r.writeClasses();r.write(">");C._oToolbar._applyContextClassFor("footer");r.renderControl(C._oToolbar);r.write("</footer>");}if(D.system.desktop){r.write('<span id="'+C.getId()+'-lastfe" tabindex="0" class="sapMDialogLastFE"></span>');}r.write("</div>");};return d;},true);
