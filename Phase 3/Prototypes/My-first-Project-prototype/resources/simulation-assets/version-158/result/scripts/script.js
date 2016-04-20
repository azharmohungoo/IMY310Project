rabbit.util={bind:function(_1,_2){
return function(){
try{
return _1.apply(_2,arguments);
}
catch(e){
console.error(e);
}
};
},bindSingleAndDoubleClick:function(_3,_4,_5,_6,_7){
_7=_7||500;
$(_3).click(function(_8){
var _9=$(this).attr("href");
if(!$(this).data("timer")){
$(this).data("timer",setTimeout(function(){
_4(_8);
},_7));
}
if(_6){
return false;
}
}).dblclick(function(_a){
clearTimeout($(this).data("timer"));
$(this).data("timer",null);
return _5(_a);
});
},bindInput:function(_b,_c,_d,_e){
if(_e===undefined){
_e=_c;
}
Mousetrap(_b).bind("enter",_c);
Mousetrap(_b).bind(["escape","esc"],_d,"keyup");
if(_e){
$(_b).blur(_e);
}
},emptyNode:function(_f){
var _10=this.getChildren(_f);
for(var i=_10.length-1;i>=0;i--){
_f.removeChild(_10[i]);
}
},getFirstChildNode:function(_11){
return this.getChildren(_11)[0];
},getChildren:function(_12){
if(_12.children){
return _12.children;
}else{
var _13=_12.childNodes;
var _14=[];
for(var i=0;i<_13.length;i++){
if(_13[i].nodeType===Node.ELEMENT_NODE){
_14.push(_13[i]);
}
}
return _14;
}
},scrollToRelative:function(_15,_16,_17){
var to=_15.scrollTop+_16;
this.scrollTo(_15,to,_17);
},scrollTo:function(_18,to,_19){
$(_18).animate({scrollTop:to},_19);
},xmlEncode:function(_1a){
return _1a.toString().replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
},xmlDecode:function(_1b){
return _1b.toString().replace(/&quot;/g,"\"").replace(/&lt;/g,"<").replace(/&amp;/g,"&");
},convertDate:function(_1c){
if(_1c=="7000000000000"){
return "not yet saved";
}
return Ext.util.Format.date(new Date(parseInt(_1c)),"Y-m-d G:i");
},appendVersionQuery:function(_1d){
return _1d+"?v="+rabbit.parameters.codeVersion;
},cloneObject:function(_1e){
return JSON.parse(JSON.stringify(_1e));
},Class:function(_1f,_20){
if(!_20){
_20=_1f;
_1f=function(){
};
}
var F=function(c){
if(this.init&&c!==rabbit.util.Class){
this.parent=_1f.prototype;
this.init.apply(this,arguments);
}
};
_20.call(F.prototype=new _1f(rabbit.util.Class),_1f.prototype);
return F;
},absoluteCenter:function(_21){
$(_21).css("left",$(_21).parent().width()/2-$(_21).width()/2);
$(_21).css("top",$(_21).parent().height()/2-$(_21).height()/2);
},getResolvedPromise:function(){
var _22=new jQuery.Deferred();
_22.resolve();
return _22.promise();
},addClass:function(_23,_24){
if(typeof _23==="string"){
_23=document.getElementById(_23);
}
_23.setAttribute("class",_23.getAttribute("class")+" "+_24);
},removeClass:function(_25,_26){
if(typeof _25==="string"){
_25=document.getElementById(_25);
}
_25.setAttribute("class",_25.getAttribute("class").replace(_26,""));
},stopPropagation:function(e){
e.stopPropagation();
},compareStrings:function(s1,s2){
if(s1==null){
s1="";
}
if(s2==null){
return -1;
}
return "".localeCompare.call(s1,s2);
},compareInts:function(i1,i2){
if(isNaN(i1)){
return -1;
}
if(isNaN(i2)){
return 1;
}
if(i1==i2){
return 0;
}
if(i2>i1){
return -1;
}
return 1;
},insertAtIndex:function(_27,key,_28,_29){
var tmp={};
var _2a=_.keys(_27);
for(var i=0;i<_2a.length;i++){
if(i>=_29){
tmp[_2a[i]]=_27[_2a[i]];
delete _27[_2a[i]];
}
}
_27[key]=_28;
for(var key in tmp){
_27[key]=tmp[key];
}
return _27;
},recursivelyRemoveId:function(_2b){
_2b.removeAttribute("id");
var _2c=this.getChildren(_2b);
for(var i=0;i<_2c.length;i++){
this.recursivelyRemoveId(_2c[i]);
}
},getScrollbarWidth:function(){
if(this.scrollbarWidth){
return this.scrollbarWidth;
}
var _2d=document.createElement("div");
_2d.style.visibility="hidden";
_2d.style.width="100px";
_2d.style.msOverflowStyle="scrollbar";
document.body.appendChild(_2d);
var _2e=_2d.offsetWidth;
_2d.style.overflow="scroll";
var _2f=document.createElement("div");
_2f.style.width="100%";
_2d.appendChild(_2f);
var _30=_2f.offsetWidth;
_2d.parentNode.removeChild(_2d);
this.scrollbarWidth=_2e-_30;
return this.scrollbarWidth;
}};
pidoco={console:{log:function(){
},error:function(){
},debug:function(){
},warn:function(){
},info:function(){
}}};
if(typeof console.log.bind!=="undefined"){
pidoco={console:{}};
if(typeof console.log==="function"){
pidoco.console.log=console.log.bind(console);
}
if(typeof console.error==="function"){
pidoco.console.error=console.error.bind(console);
}
if(typeof console.debug==="function"){
pidoco.console.debug=console.debug.bind(console);
}
if(typeof console.warn==="function"){
pidoco.console.warn=console.warn.bind(console);
}
if(typeof console.info==="function"){
pidoco.console.info=console.info.bind(console);
}
}else{
var illegalInvocation=true;
var testConsole=console.log;
try{
testConsole("Test console does not produce any exception.");
illegalInvocation=false;
}
catch(e){
illegalInvocation=true;
}
if(!illegalInvocation){
pidoco={console:{log:console.log,error:console.error,debug:console.debug,warn:console.warn,info:console.info}};
}
}
console.oldError=console.error;
console.error=function(e){
var _31=(e.lineNumber!=null)?e.lineNumber:e.line;
var _32=(e.fileName!=null)?e.fileName:e.sourceURL;
var _33={"errorJSON":JSON.stringify(e),"message":e.name+": "+e.message,"url":_32,"line":_31,"stack":e.stack};
if(rabbit.communication){
rabbit.communication.manager.submitError(_33);
}else{
if(rabbit.repository){
rabbit.repository.communicationMgr.submitError(_33);
}
}
if(document.URL.match(/http:\/\/localhost:.*/)||document.URL.match(/http(s)?:\/\/[^\/]*stage\.pidoco\.com.*/)){
if(typeof e.stack!=="undefined"){
console.oldError(e.stack);
}else{
console.oldError(null,arguments);
}
}
};
if((!document.URL.match(/http:\/\/localhost:.*/))&&(!document.URL.match(/http(s)?:\/\/[^\/]*stage\.pidoco\.com.*/))){
console.log=function(){
};
console.debug=function(){
};
console.warn=function(){
};
console.info=function(){
};
}
rabbit.facade={registerUserPref:function(key,_34){
rabbit.common.prefsManager.registerUserPref(key,_34);
},setUserPref:function(key,_35){
rabbit.common.prefsManager.setUserPref(key,_35);
},getUserPref:function(key){
return rabbit.common.prefsManager.getUserPref(key);
},registerPrototypePref:function(key,_36){
rabbit.common.prefsManager.registerPrototypePref(key,_36);
},setPrototypePref:function(key,_37){
rabbit.common.prefsManager.setPrototypePref(key,_37);
},getPrototypePref:function(key){
return rabbit.common.prefsManager.getPrototypePref(key);
},sendMessage:function(url,_38,_39){
if(rabbit.communication&&rabbit.communication.manager&&rabbit.communication.manager.sendMessage){
rabbit.communication.manager.sendMessage(url,_38,_39);
}
}};
rabbit.result={};
rabbit.ui={};
rabbit.data={};
rabbit.event={};
rabbit.parameters={};
rabbit.interaction={};
rabbit.logLevel="debug";
rabbit.communication={};
rabbit.plugins={};
rabbit.stencils={};
rabbit.util=_.extend(rabbit.util,{formatDate:function(_3a){
var _3b=((new Date()).getTime()-_3a)/1000/60;
var _3c=new Date(_3a);
if(_3b<2){
return t("result.discussion.time-a-minute-ago");
}else{
if(_3b<60){
return t("result.discussion.time-minutes-ago-prefix")+Math.round(_3b)+t("result.discussion.time-minutes-ago");
}else{
if(_3b<1440){
return t("result.discussion.time-at")+this.pad(_3c.getHours())+":"+this.pad(_3c.getMinutes());
}else{
return t("result.discussion.on")+_3c.toDateString();
}
}
}
},pad:function(val,len){
val=String(val);
len=len||2;
while(val.length<len){
val="0"+val;
}
return val;
},getMode:function(){
return document.getElementById("mode").firstChild.nodeValue;
},isElementChildOfSelector:function(_3d,_3e){
return $(_3d).parents(_3e).length>0;
},userRole:null});
rabbit.events={buttonClicked:"buttonClicked",buttonMouseOver:"buttonMouseOver",buttonMouseOut:"buttonMouseOut",checkBoxClicked:"checkBoxClicked",click:"click",clickAreaClicked:"clickAreaClicked",clickAreaHovered:"clickAreaHovered",iphoneSwitchClicked:"iphoneSwitchClicked",loadPage:"loadPage",pageLoaded:"pageLoaded",pageReady:"pageReady",layerStoreInserted:"layerStoreInserted",layerLoaded:"layerLoaded",showLayer:"showLayer",hideLayer:"hideLayer",propertyChange:"propertyChange",radioButtonClicked:"radioButtonClicked",svgBlur:"svgBlur",svgFocus:"svgFocus",tabButtonMouseOut:"tabButtonMouseOut",tabButtonMouseOver:"tabButtonMouseOver",showDatepicker:"showDatepicker",hideDatepicker:"hideDatepicker",changeDatepickerPage:"changeDatepickerPage",changeSlider:"changeSlider",subMenuShow:"subMenuShow",subMenuHide:"subMenuHide",sliderChangedEvent:"sliderChangedEvent",treeViewNodeClicked:"treeViewNodeClicked",treeViewScrolled:"treeViewScrolled",ratingResultChangedEvent:"ratingResultChangedEvent",ratingMouseOut:"ratingMouseOut",ratingMouseOver:"ratingMouseOver",toggleToggleSection:"toggleToggleSection",discussionStoreChanged:"discussionStoreChanged",discussionStoreAdded:"discussionStoreAdded",pageStoreLoaded:"pageStoreLoaded",folderStoreLoaded:"folderStoreLoaded",newInteractionRegistered:"newInteractionRegistered",switchOffSwitch:"switchOffSwitch",switchOnSwitch:"switchOnSwitch",pluginInitialized:"pluginInitialized"};
rabbit.event.manager=function _returnEventDispatcher(){
var _3f={};
var _40={};
return {registerOnEvent:function registerOnEvent(_41,_42,_43,_44){
if(typeof _41!=="string"||typeof _42!=="function"||typeof _43!=="object"){
throw "Invalid Arguments for registerOnEvent";
}
if(!_3f.hasOwnProperty(_41)){
_3f[_41]=[];
}
var _45={"callback":_42,"thisArg":_43,"includeEventType":false};
if(_44){
_45.includeEventType=true;
}
_3f[_41].push(_45);
},registerOnCategoryEvent:function(_46,_47,_48){
if(typeof _46!=="string"||typeof _47!=="function"||typeof _48!=="object"){
throw "Invalid Arguments for registerOnEventForCategory";
}
if(!_40.hasOwnProperty(_46)){
_40[_46]=[];
}
var _49={"callback":_47,"thisArg":_48,"includeEventType":true};
_40[_46].push(_49);
console.log("ok for "+_46);
},raiseEvent:function raiseEvent(_4a){
this._raiseCategoryEvent.apply(this,arguments);
this._raiseNormalEvent.apply(this,arguments);
},_raiseCategoryEvent:function raiseEvent(_4b){
var _4c=_4b.replace(/\..*$/,"");
if(_4c!=_4b){
console.log("Try to raise catergory "+_4c);
var _4d=_40[_4c];
if(typeof _4d==="undefined"){
console.warn("No handler category for invoked eventType "+_4b+" (category: "+_4c+")");
return;
}
for(var i=0;i<_4d.length;i++){
try{
var _4e=Array.prototype.slice.call(arguments);
this._raiseEvent(_4d[i],_4e);
}
catch(e){
console.error(e);
}
}
}
},_raiseNormalEvent:function raiseEvent(_4f){
var _50=_3f[_4f];
if(typeof _50==="undefined"){
console.warn("No handler for invoked eventType "+_4f);
return;
}
for(var i=0;i<_50.length;i++){
try{
var _51=Array.prototype.slice.call(arguments);
this._raiseEvent(_50[i],_51);
}
catch(e){
console.error(e);
}
}
},_raiseEvent:function(_52,_53){
var _54=_52.callback;
var _55=_52.thisArg;
var _56=_52.includeEventType;
if(typeof _54!=="function"){
return;
}
if(!_56){
_53.shift();
}
_54.apply(_55,_53);
}};
}();
rabbit.communication.manager={urls:{createDiscussion:"__reviewBaseUrl__/__layerId__/create",moveDiscussion:"__reviewBaseUrl__/__layerId__/move",deleteDiscussion:"__reviewBaseUrl__/__layerId__/delete",getDiscussions:"__reviewBaseUrl__/__layerId__/discussions",postEntryDiscussion:"__reviewBaseUrl__/__layerId__/post",setStateDiscussion:"__reviewBaseUrl__/__layerId__/setstate",renameDiscussion:"__reviewBaseUrl__/__layerId__/rename",loadLayerExport:"../resources/layers/__layerId____browser__-__mode__.js",loadLayer:"__baseUrl__editor-jersey/prototypes/__prototypeId__/layers/__layer__",pageLink:"__urlPattern__",rectangleExport:"../resources/overlay-rectangles/__width__-__height__-__mode__.js",rectangle:"__baseUrl__prototype/result/__prototypeId__/rect/__mode__",mp3Export:"../resources/audios/__audioId__.mp3",mp3:"__baseUrl__editor-jersey/prototypes/__prototypeId__/audios/__audioId__.mp3",error:"__baseUrl__repository/error/__prototypeId__/"},submitError:function(_57){
var url=this.getUrl("error");
if(rabbit.facade.isExport()){
return;
}
_57.userAgent=navigator.userAgent;
this.post(url,"json",_57);
},buildEditUrl:function(_58){
var _59="/rabbit/edit/"+rabbit.result.manager.currentPrototypeId+"#";
var _5a="page/"+rabbit.result.manager.currentPageNr;
var _5b="";
if(_58){
var _5c=rabbit.data.pageStore.objects[_58];
var _5d=rabbit.data.folderStore.objects[_5c.data.parentFolder];
while(_5d!==undefined){
_5b="folder/"+_5d.data.id+"/"+_5b;
_5d=rabbit.data.folderStore.objects[_5d.data.parentFolder];
}
}
return _59+_5b+_5a;
},getUrl:function(_5e,_5f){
var url=this.urls[_5e];
var _60=rabbit.result.manager.urlPattern;
url=url.replace("__baseUrl__",rabbit.common.baseUrl);
url=url.replace("__reviewBaseUrl__",rabbit.facade.getBaseUrl());
url=url.replace("__prototypeId__",rabbit.result.manager.currentPrototypeId);
if(_5e==="loadLayer"){
_60=rabbit.result.manager.urlPattern.replace("__page__","layer/__page__");
}
url=url.replace("__urlPattern__",_60);
if(_5f){
for(var key in _5f){
url=url.replace("__"+key+"__",_5f[key]);
}
}
return url;
},sendMessage:function(url,_61,_62){
this.post(rabbit.common.baseUrl+url,undefined,_61,{complete:_62});
},get:function(url,_63,_64,_65){
return this.ajax(url,"get",_63,_64,_65);
},post:function(url,_66,_67,_68){
return this.ajax(url,"post",_66,_67,_68);
},ajax:function(url,_69,_6a,_6b,_6c){
if(!url){
throw "URL not provided for ajax";
}
_69=_69||"get";
_6a=_6a||undefined;
_6b=_6b||undefined;
_6c=_6c||{};
var _6d=_.defaults({url:url,type:_69,dataType:_6a,data:_6b},_6c);
return $.ajax(_6d);
}};
rabbit.result.manager={datePickerClicked:false,customDatepickerObjects:[],init:function(_6e,_6f,_70,_71){
try{
rabbit.common.i18n.init({lang:rabbit.result.lang});
rabbit.common.prefsManager.init({lang:rabbit.result.lang});
}
catch(e){
console.error("error during i18n init",e);
}
rabbit.prototypeType=_6f;
rabbit.browser=_70;
this.initialPageId=_6e;
this.isPushStateAvailable=window.location.protocol!=="file:"&&typeof window.history.replaceState!=="undefined";
this.fromApp=_71;
try{
this._initPlugins();
rabbit.data.folderStore.init();
rabbit.data.pageStore.init();
rabbit.data.layerStore.init();
rabbit.data.discussionStore.init();
rabbit.ui.manager.init();
if(rabbit.parameters.layerIdToOpen){
rabbit.ui.manager.showLayer($("#repository"),rabbit.parameters.layerIdToOpen);
}
var _72=rabbit.data.pageStore.objects[_6e];
rabbit.event.manager.raiseEvent(rabbit.events.pageReady,_72,$("#repository"));
}
catch(e){
console.error(e);
}
rabbit.ui.manager._hackToMakeArrowsWork();
if(this.isPushStateAvailable){
window.onpopstate=function(e){
if(e.state){
if(e.state.fromRefresh){
window.history.back();
}else{
rabbit.facade.loadLayer(e.state.pageId);
this.showPage($("#"+e.state.repositoryId),e.state.pageId);
console.log("new pageid "+this.currentPageNr);
}
}
}.bind(this);
window.history.replaceState({repositoryId:"repository",pageId:rabbit.result.manager.currentPageNr},"",window.location.href);
}
},setNextPageIsARefresh:function(){
window.history.replaceState({repositoryId:"repository",pageId:rabbit.result.manager.currentPageNr,fromRefresh:true},"",window.location.href);
},goBack:function(){
window.history.back();
},_initPlugins:function(){
for(var i=0;i<rabbit.facade._availablePlugins.length;i++){
try{
var _73=rabbit.facade._availablePlugins[i];
_73.init.apply(_73,_73._initialArguments);
}
catch(e){
console.error(e);
}
}
rabbit.facade.raiseEvent(rabbit.events.pluginInitialized);
},goToPage:function(_74,_75){
var url;
var _76=rabbit.data.pageStore.objects[_74];
var _77=Boolean(_76);
if(_77){
url=_76.getUrl();
if(rabbit.facade.isExport()&&!url){
alert("Sorry, this page is not part of the export.");
return;
}else{
rabbit.mobile.trigger("pidoco:beforeGoToPage",{height:_76.data.height,width:_76.data.width});
}
}else{
if(!_74.match(/^[a-zA-Z0-9]*:\/\//)){
url="http://"+_74;
}else{
url=_74;
}
}
if(!_77&&rabbit.facade.runningInApp()&&rabbit.facade.isIOS){
window.open(url,"_system");
}else{
if(_75){
window.open(url);
}else{
location.href=url;
}
}
},showPage:function(_78,_79,_7a,_7b){
_7a=_7a||false;
var _7c=_78.attr("id");
try{
if(_79===""||_79===this.currentPageNr){
return;
}
var _7d=rabbit.data.pageStore.objects[_79];
console.log("show page repository:"+_7c+" page:"+_79,_7d);
if(_7d===undefined){
this.goToPage(_79);
return;
}
rabbit.ui.manager.showPage(_78,_79,_7b);
if(_7a===true&&this.isPushStateAvailable){
console.log("PUSH STATE",_79);
window.history.pushState({repositoryId:_7c,pageId:_79},"",_7d.getUrl());
}
this.currentPageNr=_79;
_78.data("page-id",_79);
rabbit.event.manager.raiseEvent(rabbit.events.pageLoaded,_7d,_78);
rabbit.mobile.trigger("pidoco:afterShowPage");
}
catch(e){
console.error(e);
}
},menuClick:function(a,b,_7e){
rabbit.result.manager.goToPage(_7e,false);
}};
rabbit.ui.manager={inTransition:false,init:function(){
rabbit.facade.registerOnEvent(rabbit.events.layerLoaded,this.fillWrappersWithLayer,this);
},createWrappers:function(_7f,_80,_81){
var _82=$("<div class=\"wrapper wrapper-"+_80+"\" data-layer-id=\""+_80+"\" style=\"display: none\"></div>").appendTo(_7f);
var _83=rabbit.data.pageStore.objects[_80];
if(_81===true&&_83){
for(var _84 in _83.data.layers){
if(_83.data.layers[_84]===true||_83.data.layers[_84]==="true"){
this.createWrappers(_7f,_84);
}
}
}
return _82;
},fillWrappersWithLayer:function(_85){
var _86=_85.data.id;
$(".wrapper-"+_86+"[data-fill-me=\"true\"]:empty").each(function(_87,_88){
this.fillWrapperWithLayer(_88,_85);
_88.removeAttribute("data-fill-me");
}.bind(this));
},fillWrapperWithLayer:function(_89,_8a,_8b){
var _8c=_8a.data.html;
var _8d=_89.parentNode.id;
var _8e=_8a.data.html;
if(_8e){
_8e=$(_8a.data.html.replace(/__containerId__/g,_8d));
if(_8b){
_8e.find("script").remove();
}
$(_89).append(_8e);
if(!this.inTransition){
rabbit.facade.raiseEvent(rabbit.events.layerStoreInserted,_89.children[0]);
}
}else{
_89.setAttribute("data-fill-me","true");
}
return _8e;
},getLayerWrapper:function(_8f,_90){
return _8f.find(">.wrapper-"+_90);
},showLayer:function(_91,_92){
var _93=rabbit.data.layerStore.objects[_92];
if(!_93){
_93=rabbit.data.layerStore.loadLayer(_92);
}
var _94=this.getLayerWrapper(_91,_92);
if(!_94.length){
_94=this.createWrappers(_91,_92,true);
}
if(_94[0].children.length===0){
this.fillWrapperWithLayer(_94[0],_93);
}
_94.show();
rabbit.event.manager.raiseEvent(rabbit.events.showLayer,{id:_91.attr("id")+_92,layerId:_92,repositoryId:_91.attr("id")});
},hideLayer:function(_95,_96){
var _97=this.getLayerWrapper(_95,_96);
_97.hide();
rabbit.event.manager.raiseEvent(rabbit.events.hideLayer,{id:_95.attr("id")+_96,layerId:_96,repositoryId:_95.attr("id")});
},toggleLayer:function(_98,_99){
var _9a=this.getLayerWrapper(_98,_99);
if(!_9a.length||_9a.css("display")==="none"){
return this.showLayer(_98,_99);
}else{
return this.hideLayer(_98,_99);
}
},showPage:function(_9b,_9c,_9d){
var _9e;
if(_9d==="fromRight"||_9d==="fromLeft"||_9d==="fromTop"||_9d==="fromBottom"){
_9e=this.showPageWithTranslation(_9b,_9c,_9d);
}else{
if(_9d==="opacity"){
_9e=this.showPageWithOpacity(_9b,_9c);
}else{
if(_9d==="flip"){
_9e=this.showPageWithFlip(_9b,_9c);
}else{
_9e=this.showPageWithoutTransition(_9b,_9c);
}
}
}
if(_9b.attr("id")=="repository"&&_9e){
_9e.done(function(){
$(_9b).attr("data-review-reference-id",_9c);
$(_9b).attr("data-page-id",_9c);
$("body").attr("data-current-page-id",_9c);
});
}
},showPageWithoutTransition:function(_9f,_a0){
var _a1=rabbit.data.pageStore.objects[_a0];
var _a2=new $.Deferred();
rabbit.ui.manager.showLayer(_9f,_a0);
_.each(_a1.data.layers,function(_a3,_a4){
this.showLayer(_9f,_a4);
}.bind(this));
_9f.find(">.wrapper").each(function(_a5,_a6){
var _a7=_a6.getAttribute("data-layer-id");
if((!_a1.data.layers.hasOwnProperty(_a7)||_a1.data.layers[_a7]!==true)&&_a7!=_a0){
this.hideLayer(_9f,_a7);
}
}.bind(this));
_a2.resolve();
return _a2.promise();
},showPageWithFlip:function(_a8,_a9){
var _aa=500;
var _ab=new $.Deferred();
this.startTransition(_a8);
var _ac=this.createTransitionWrapper(_a8,_a9);
var _ad=_ac.leave.find(">div");
var _ae=_ac.enter.find(">div");
_a8.find(">div").hide();
_a8.append(_ac.leave).append(_ac.enter);
_ae.hide();
_ad.transition({perspective:"0px",rotateY:"90deg",duration:_aa},function(){
_ae.transition({perspective:"0px",rotate3d:"0,1,0,270deg",duration:0},function(){
_ae.show();
this.showPageWithoutTransition(_ae,_a9);
_ae.transition({perspective:"0px",rotate3d:"0,1,0,360deg",duration:_aa},function(){
_ad.transition({perspective:"0px",rotateY:"0deg",duration:0},function(){
this.stopTransition(_a8);
this.showPageWithoutTransition(_a8,_a9);
_ac.leave.remove();
_ac.enter.remove();
_ab.resolve();
}.bind(this));
}.bind(this));
}.bind(this));
}.bind(this));
return _ab.promise();
},showPageWithOpacity:function(_af,_b0){
var _b1=500;
var _b2=new $.Deferred();
this.startTransition(_af);
var _b3=this.createTransitionWrapper(_af,_b0);
var _b4=_b3.leave.find(">div");
var _b5=_b3.enter.find(">div");
_af.find(">div").hide();
_af.append(_b3.leave).append(_b3.enter);
_b5.css({opacity:0});
_b4.transition({opacity:0,duration:_b1},function(){
this.showPageWithoutTransition(_b5,_b0);
_b5.transition({opacity:1,duration:_b1},function(){
this.stopTransition(_af);
this.showPageWithoutTransition(_af,_b0);
_b3.leave.remove();
_b3.enter.remove();
_b2.resolve();
}.bind(this));
}.bind(this));
return _b2.promise();
},showPageWithTranslation:function(_b6,_b7,_b8){
var _b9=_b6.width();
var _ba=_b6.height();
var _bb=500;
var _bc=new $.Deferred();
this.startTransition(_b6);
var _bd=this.createTransitionWrapper(_b6,_b7);
var _be=_bd.leave.find(">div");
var _bf=_bd.enter.find(">div");
if(_b8==="fromLeft"){
_bf.css("left",-1*_b9);
}else{
if(_b8==="fromTop"){
_bf.css("top",-1*_ba);
}else{
if(_b8==="fromBottom"){
_bf.css("top",_ba);
}else{
_bf.css("left",_b9);
}
}
}
_bf.find(">div").show();
_b6.find(">div").hide();
_b6.append(_bd.leave).append(_bd.enter);
var _c0=function(){
this.stopTransition(_b6);
this.showPageWithoutTransition(_b6,_b7);
_bd.leave.remove();
_bd.enter.remove();
_bc.resolve();
}.bind(this);
if(_b8==="fromLeft"){
_be.transition({x:_b9+"px",duration:_bb});
_bf.transition({x:_b9+"px",duration:_bb},_c0);
}else{
if(_b8==="fromTop"){
_be.transition({y:_ba+"px",duration:_bb});
_bf.transition({y:_ba+"px",duration:_bb},_c0);
}else{
if(_b8==="fromBottom"){
_be.transition({y:"-"+_ba+"px",duration:_bb});
_bf.transition({y:"-"+_ba+"px",duration:_bb},_c0);
}else{
_be.transition({x:"-"+_b9+"px",duration:_bb});
_bf.transition({x:"-"+_b9+"px",duration:_bb},_c0);
}
}
}
return _bc.promise();
},createTransitionWrapper:function(_c1,_c2){
var _c3=_c1.data("page-id");
var _c4=rabbit.data.pageStore.objects[_c2];
var _c5=rabbit.data.pageStore.objects[_c3];
var _c6,_c7;
var _c8=$("<div class=\"transition-wrapper transition-enter\" data-page-id=\""+_c2+"\"><div class=\"layer-container\"></div></div>");
var _c9=$("<div class=\"transition-wrapper transition-leave\" data-page-id=\""+_c3+"\"><div class=\"layer-container\"></div></div>");
var _ca=_c9.find(">div");
var _cb=_c8.find(">div");
var _cc=_c1.find(".wrapper-"+_c3).clone().remove("script");
var _cd=_c1.find(".wrapper-"+_c2).clone().remove("script");
for(_c6 in _c4.data.layers){
_c7=_c4.data.layers[_c6];
if(_c7===true||_c7==="true"){
this.createWrappers(_cb,_c6,false);
this.showLayer(_cb,_c6);
}
}
for(_c6 in _c5.data.layers){
_c7=_c5.data.layers[_c6];
if(_c7===true||_c7==="true"){
this.createWrappers(_ca,_c6,false);
this.showLayer(_ca,_c6);
}
}
_ca.append(_cc);
if(_cd.length===0){
_cd=this.createWrappers(_cb,_c2,true);
}else{
_cb.append(_cd);
}
if(_cd.children().length===0){
this.fillWrapperWithLayer(_cd[0],rabbit.data.layerStore.objects[_c2],true);
}
return {enter:_c8,leave:_c9};
},startTransition:function(_ce){
this.inTransition=true;
$("body").addClass("disable-pointer-events");
$(_ce).addClass("during-transition");
},stopTransition:function(_cf){
this.inTransition=false;
$("body").removeClass("disable-pointer-events");
$(_cf).removeClass("during-transition");
},_forceRedraw:function(){
var _d0=navigator.userAgent.toLowerCase().indexOf("chrome")>-1;
var _d1=navigator.userAgent.toLowerCase().indexOf("safari")>-1;
if(_d0||_d1){
document.body.style.webkitTransform="scale(1)";
}else{
if(window.resizeTo&&window.outerWidth&&window.outerHeight){
window.resizeTo(window.outerWidth+1,window.outerHeight+1);
window.resizeTo(window.outerWidth-1,window.outerHeight-1);
}
}
},_hackToMakeArrowsWork:function(){
window.setTimeout(this._forceRedraw,1000);
}};
rabbit.interaction.manager={tmp:{},actions:{click:{makeableOnDesktop:function(_d2){
return !_d2.numberOfFinger||_d2.numberOfFinger=="1"||_d2.numberOfFinger=="any";
},render:function(_d3){
if(parseInt(_d3.data.action.numberOfFinger,10)>1){
return t("interaction.action.multiFingerClick.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_d3));
}else{
return t("interaction.action.click.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_d3));
}
},defineEvent:function(_d4){
var _d5=document.getElementById(_d4.data.stencilId);
if(_d4.data.action.button=="right"){
$(_d5).on("contextmenu",function(e){
rabbit.interaction.manager.raiseInteraction(_d4,rabbit.interaction.manager.serializeEvent(e));
return false;
});
}else{
if(false){
var _d6;
var _d7;
var _d8=200;
var _d9=500;
_d5.addEventListener("touchstart",function(e){
if(!_d4.data.action.numberOfFinger||(_d4.data.action.numberOfFinger&&(_d4.data.action.numberOfFinger==="any"||parseInt(_d4.data.action.numberOfFinger,10)===e.touches.length))){
_d6=new Date().getTime();
}
e.preventDefault();
},false);
_d5.addEventListener("touchend",function(e){
if(_d6){
var end=new Date().getTime();
if(_d8>(end-_d6)){
rabbit.interaction.manager.raiseInteraction(_d4,rabbit.interaction.manager.serializeEvent(e));
_d6=null;
}
}
e.preventDefault();
},false);
}else{
if(rabbit.interaction.manager.actions.click.makeableOnDesktop(_d4.data.action)){
_d5.addEventListener("click",function(e){
rabbit.interaction.manager.raiseInteraction(_d4,rabbit.interaction.manager.serializeEvent(e));
});
}
}
}
}},doubleClick:{makeableOnDesktop:true,render:function(_da){
return t("interaction.action.doubleClick.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_da));
},defineEvent:function(_db){
var _dc=document.getElementById(_db.data.stencilId);
if(_db.data.action.button=="right"){
$(_dc).on("contextmenu",function(e){
rabbit.interaction.manager.raiseInteraction(_db,rabbit.interaction.manager.serializeEvent(e));
return false;
});
}else{
if(false){
var _dd;
var _de;
var _df=200;
var _e0=500;
_dc.addEventListener("touchstart",function(e){
_dd=new Date().getTime();
if(_e0<(_dd-_de)){
_de=null;
}
e.preventDefault();
},false);
_dc.addEventListener("touchend",function(e){
if(_dd){
var end=new Date().getTime();
if(_df>(end-_dd)){
if(!_de){
_de=end;
}else{
if(_e0>(end-_de)){
rabbit.interaction.manager.raiseInteraction(_db,rabbit.interaction.manager.serializeEvent(e));
_dd=null;
_de=null;
}
_de=null;
}
}
}
e.preventDefault();
},false);
}else{
_dc.addEventListener("dblclick",function(e){
rabbit.interaction.manager.raiseInteraction(_db,rabbit.interaction.manager.serializeEvent(e));
});
}
}
}},hover:{makeableOnDesktop:true,render:function(_e1){
return t("interaction.action.hover.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_e1));
},defineEvent:function(_e2){
if(!_e2.data.action.trigger){
_e2.data.action.trigger="enter";
}
if(_e2.data.action.trigger=="both"||_e2.data.action.trigger=="enter"){
$("#"+_e2.data.stencilId).on("mouseenter",function(e){
rabbit.interaction.manager.raiseInteraction(_e2,rabbit.interaction.manager.serializeEvent(e));
});
}
if(_e2.data.action.trigger=="both"||_e2.data.action.trigger=="leave"){
$("#"+_e2.data.stencilId).on("mouseleave",function(e){
rabbit.interaction.manager.raiseInteraction(_e2,rabbit.interaction.manager.serializeEvent(e));
});
}
}},swipe:{makeableOnDesktop:false,render:function(_e3){
return t("interaction.action.swipe.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_e3));
},defineEvent:function(_e4){
var _e5=Hammer(document.getElementById(_e4.data.stencilId),{swipe_max_touches:5,drag_block_horizontal:true,drag_block_vertical:true,swipe_velocity:0.4});
_e5.on("swipe",function(e){
if(_e4.data.action.direction==="any"||e.gesture.direction===_e4.data.action.direction){
rabbit.facade.markHighlightTouchesAsSuccessful();
rabbit.interaction.manager.raiseInteraction(_e4,rabbit.interaction.manager.serializeEvent(e));
}
});
}},pinch:{makeableOnDesktop:false,render:function(_e6){
return t("interaction.action.pinch.userDescription").replace("__element__",rabbit.interaction.manager.getElementTitle(_e6));
},defineEvent:function(_e7){
var _e8=Hammer(document.getElementById(_e7.data.stencilId),{prevent_default:true});
var _e9=null;
var _ea=false;
if(_e7.data.action.direction==="in"){
_e9="pinchin";
}else{
if(_e7.data.action.direction==="out"){
_e9="pinchout";
}else{
_e9="pinch";
}
}
_e8.on("transformstart",function(e){
_ea=false;
});
_e8.on("transformend",function(e){
if(_ea){
rabbit.facade.markHighlightTouchesAsSuccessful();
rabbit.interaction.manager.raiseInteraction(_e7,rabbit.interaction.manager.serializeEvent(e));
}
});
_e8.on(_e9,function(e){
_ea=true;
});
}}},getInterinteractionEventId:function(_eb){
return "interaction."+_eb;
},raiseInteraction:function(_ec,e){
if(this.isInteractionExecutable(_ec)){
rabbit.facade.raiseEvent(_ec.data.uniqueId,e);
return true;
}else{
return false;
}
},isLayerHidden:function(_ed){
return $(_ed).css("display")==="none";
},isInteractionExecutable:function(_ee){
var _ef=$("#"+_ee.data.stencilId);
var _f0=_ef.parents(".layer");
for(var i=0;i<_f0.length;i++){
if(this.isLayerHidden(_f0.get(i))){
return false;
}
}
if(_ef.length===0||_ef.hasClass("layer")&&this.isLayerHidden(_ef)){
return false;
}
return true;
},renderAction:function(_f1){
return rabbit.interaction.manager.actions[_f1.data.action.type].render(_f1);
},getElementTitle:function(_f2){
var _f3=$("#"+_f2.data.stencilId).data("interactive-element-type");
return t("stencils."+_f3+"-palette");
},registerAction:function(_f4,_f5){
if(_.has(rabbit.interaction.manager.actions,_f4)){
throw "Action with name "+_f4+" already exists.";
}else{
rabbit.interaction.manager.actions[_f4]=_f5;
}
},registerReaction:function(_f6,_f7){
if(_.has(rabbit.interaction.manager.reactions,_f6)){
throw "Action with name "+_f6+" already exists.";
}else{
rabbit.interaction.manager.reactions[_f6]=_f7;
}
},reactions:{showPage:{init:function(_f8,_f9){
var _fa=rabbit.interaction.manager.reactions.showPage.getOpeningMethod(_f9);
if(rabbit.data.pageStore.objects[_f9.target]&&(_fa==="withoutReloadOnly"||_fa==="withoutReloadIframe")){
rabbit.facade.loadLayer(_f9.target);
}
},getOpeningMethod:function(_fb){
var _fc=_fb.options;
if(!_fc){
if(_fb.inNewTab==="true"){
_fc="reloadNewTab";
}else{
if(_fb.withoutReload=="true"){
_fc="withoutReloadOnly";
}else{
if(_fb.withoutReload!==undefined){
_fc="reloadOnly";
}
}
}
}
return _fc;
},callback:function(_fd,_fe,_ff){
var _100=_ff.target;
if(!_100){
return;
}
var _101=rabbit.interaction.manager.reactions.showPage.getOpeningMethod(_ff);
if(_101==="reloadNewTab"){
rabbit.result.manager.goToPage(_100,true);
}else{
if(_101==="withoutReloadOnly"){
rabbit.facade.showPage($("#repository"),_100,true,_ff.transition);
}else{
if(_101==="withoutReloadIframe"){
var _102=document.getElementById(_fe.data.stencilId);
var _103=rabbit.facade.getRepositoryFromStencil(_102);
var _104=false;
if(_103.attr("id")==="repository"){
_104=true;
}
rabbit.facade.showPage(_103,_100,_104,_ff.transition);
}else{
rabbit.result.manager.goToPage(_100);
}
}
}
}},toggleLayer:{init:function(_105,_106){
rabbit.facade.loadLayer(_106.layer);
},callback:function(_107,_108,_109){
var _10a=document.getElementById(_108.data.stencilId);
var _10b=rabbit.facade.getRepositoryFromStencil(_10a);
if(_109.visibility==="toggle"){
rabbit.facade.toggleLayer(_10b,_109.layer);
}else{
if(_109.visibility==="show"){
rabbit.facade.showLayer(_10b,_109.layer);
}else{
if(_109.visibility==="hide"){
rabbit.facade.hideLayer(_10b,_109.layer);
}
}
}
}},vibrate:{callback:function(_10c,_10d,_10e){
navigator.vibrate=navigator.vibrate||navigator.mozVibrate||navigator.webkitVibrate||undefined;
if(navigator.vibrate){
navigator.vibrate(_10e.duration);
}else{
if(window.parentBody){
window.parentBody.trigger("pidoco:vibrate",[{duration:_10e.duration}]);
}else{
}
}
}},browserBack:{callback:function(_10f,_110,_111){
rabbit.facade.browserBack();
}},browserForward:{callback:function(_112,_113,_114){
rabbit.facade.browserForward();
}},closeBrowserWindow:{callback:function(_115,_116,_117){
rabbit.facade.closeBrowserWindow();
}}},registerInteraction:function(_118,_119,_11a,_11b){
if(_118[0]==="-"){
return;
}
if(!_.isArray(_11b)){
_11b=[_11b];
}
var _11c=new rabbit.data.Interaction(_118,_119,_11a,_11b);
_11c.initializeAction();
_11c.initializeReactions();
rabbit.facade.raiseEvent(rabbit.events.newInteractionRegistered,_11c);
},serializeEvent:function(e){
return {};
}};
rabbit.mobile={bind:function(_11d,_11e){
if(rabbit.facade.runningInApp()){
document.addEventListener(_11d,_11e);
}
},unbind:function(_11f,_120){
if(rabbit.facade.runningInApp()){
document.removeEventListener(_11f,_120);
}
},trigger:function(_121,data){
if(rabbit.facade.runningInApp()){
window.parentBody.trigger(_121,data);
}
}};
rabbit.facade=_.extend(rabbit.facade,function _returnFacade(){
var _122=rabbit.event.manager;
return {_availablePlugins:[],vml:false,isIOS:navigator.userAgent.match(/iPad|iPhone/),isAndroid:navigator.userAgent.match(/Android/),scaleFactor:1,registerPlugin:function registerPlugin(_123,_124){
try{
var _125=Array.prototype.slice.call(arguments);
_125.shift();
_123._initialArguments=_125;
this._availablePlugins.push(_123);
}
catch(e){
console.log(e);
}
},setScaleFactor:function(_126){
this.scaleFactor=_126;
},getScaleFactor:function(){
return this.scaleFactor;
},isFrameDisplayed:false,registerOnEvent:function registerOnEvent(_127,_128,_129){
try{
if(_.isArray(_127)){
for(var i=0;i<_127.length;i++){
console.debug("Registering a handler for "+_127[i]);
_122.registerOnEvent(_127[i],_128,_129,true);
}
}else{
if(_.isString(_127)){
console.debug("Registering a handler for "+arguments[0]);
_122.registerOnEvent(_127,_128,_129,false);
}
}
}
catch(e){
console.error(e);
return undefined;
}
},registerOnCategoryEvent:function(_12a,_12b,_12c){
try{
_122.registerOnCategoryEvent(_12a,_12b,_12c,true);
}
catch(e){
console.error(e);
return undefined;
}
},raiseEvent:function raiseEvent(_12d){
console.debug("Raising a "+arguments[0]+" event");
try{
return _122.raiseEvent.apply(_122,arguments);
}
catch(e){
console.error(e);
return undefined;
}
},fireMouseOn:function fireMouseOn(_12e){
var _12f=document.getElementById(_12e);
if(_12f===null){
return;
}
console.debug("Forwarding a click event to "+_12e);
_12f.click();
_12f.focus();
},showPage:function(){
return rabbit.result.manager.showPage.apply(rabbit.result.manager,arguments);
},getBaseUrl:function getBaseUrl(){
return rabbit.result.manager.baseUrl;
},getPageUrl:function getPageUrl(){
return this.getBaseUrl()+"/"+rabbit.result.manager.currentPageNr;
},getRole:function getRole(){
return rabbit.result.manager.currentRole;
},getUrlPattern:function(){
return rabbit.result.manager.urlPattern;
},getCurrentPageId:function(){
return rabbit.result.manager.currentPageNr;
},getCurrentPage:function(){
return rabbit.data.pageStore.objects[rabbit.result.manager.currentPageNr];
},loadLayer:function(){
return rabbit.data.layerStore.loadLayer.apply(rabbit.data.layerStore,arguments);
},getLayer:function(){
return rabbit.ui.manager.getLayer.apply(rabbit.ui.manager,arguments);
},showLayer:function(){
return rabbit.ui.manager.showLayer.apply(rabbit.ui.manager,arguments);
},hideLayer:function(){
return rabbit.ui.manager.hideLayer.apply(rabbit.ui.manager,arguments);
},toggleLayer:function(){
return rabbit.ui.manager.toggleLayer.apply(rabbit.ui.manager,arguments);
},getMode:function(){
return document.getElementById("mode").firstChild.nodeValue;
},getInteractionsAvailableForToolbar:function(){
return rabbit.interaction.manager.interactionsAvailableForToolbar;
},raiseInteraction:function(){
return rabbit.interaction.manager.raiseInteraction.apply(rabbit.interaction.manager,arguments);
},renderAction:function(_130){
return rabbit.interaction.manager.renderAction.apply(rabbit.interaction.manager,arguments);
},registerAction:function(){
return rabbit.interaction.manager.registerAction.apply(rabbit.interaction.manager,arguments);
},registerReaction:function(){
return rabbit.interaction.manager.registerReaction.apply(rabbit.interaction.manager,arguments);
},goBack:function(){
return rabbit.result.manager.goBack.apply(rabbit.result.manager,arguments);
},setNextPageIsARefresh:function(){
return rabbit.result.manager.setNextPageIsARefresh.apply(rabbit.result.manager,arguments);
},runningInApp:function(){
return rabbit.result.manager.fromApp;
},browserBack:function(){
history.go(-1);
},browserForward:function(){
history.go(1);
},closeBrowserWindow:function(){
window.close();
},getLayerFromStencil:function(_131){
return $(_131).closest(".layer");
},getRepositoryFromStencil:function(_132){
return $(_132).closest(".repository");
},isExport:function(){
return rabbit.result.manager.isExport;
},isPhantomJS:function(){
return $("body").hasClass("phantom-js");
},isApi:function(){
return $("body").hasClass("api-call");
},isSketched:function(){
return $("body").hasClass("sketched");
},isPlain:function(){
return !rabbut.facade.isSketched();
},mobile:{bind:function(_133){
return rabbit.mobile.bind.apply(rabbit.mobile,arguments);
},unbind:function(_134){
return rabbit.mobile.unbind.apply(rabbit.mobile,arguments);
},trigger:function(_135){
return rabbit.mobile.trigger.apply(rabbit.mobile,arguments);
}},markHighlightTouchesAsSuccessful:function(){
return rabbit.plugins.gestureHighlight.markHighlightTouchesAsSuccessful.apply(rabbit.plugins.gestureHighlight,arguments);
},"alert":function(_136,text,_137){
rabbit.plugins.systemAlert.alert(_136,text,_137);
}};
}());
rabbit.data.Base=rabbit.util.Class(function(){
this.init=function(){
this.data={};
};
this.getData=function(){
return this.data;
};
this.setData=function(data){
this.data=data;
return this;
};
});
rabbit.data.layerStore={objects:{},init:function(){
},loadLayer:function(_138){
if(typeof this.objects[_138]==="undefined"){
var url=null;
if(rabbit.result.manager.isExport){
var _139=(rabbit.browser==="ie")?"-ie":"";
url=rabbit.communication.manager.getUrl("loadLayerExport",{layerId:_138,browser:_139,mode:rabbit.util.getMode()});
}else{
url=rabbit.communication.manager.getUrl("loadLayer",{prototypeId:rabbit.result.manager.currentPrototypeId,layer:_138});
}
var _13a=(rabbit.result.manager.isExport)?"jsonp":"html";
var ajax=rabbit.communication.manager.get(url,_13a,{containerId:"__containerId__",mode:rabbit.util.getMode(),viewMode:rabbit.parameters.viewMode,fontFamily:rabbit.parameters.fontFamily},{crossDomain:rabbit.result.manager.isExport});
if(!rabbit.result.manager.isExport){
ajax.done(this.addLayerFromHtml.bind(this));
}
this.objects[_138]=new rabbit.data.Layer(_138,null,null);
}
return this.objects[_138];
},addLayerFromHtml:function(html){
layerElements=$($.trim(html));
$(layerElements).children().each(function(_13b,_13c){
_13c=$(_13c);
var _13d=_13c.data("layer-id");
var _13e=_13c.data("layer-type");
var html=$.trim(_13c[0].outerHTML);
if(this.objects[_13d]){
this.objects[_13d].data.id=_13d;
this.objects[_13d].data.layerType=_13e;
this.objects[_13d].data.html=html;
}else{
this.objects[_13d]=new rabbit.data.Layer(_13d,_13e,html);
}
rabbit.facade.raiseEvent(rabbit.events.layerLoaded,this.objects[_13d]);
}.bind(this));
}};
rabbit.data.Layer=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(id,_13f,html){
this.data={id:id,layerType:_13f,html:html};
};
});
rabbit.data.pageStore={objects:{},init:function(){
var _140=$("#pageNames").html();
if((_140!==null)&&(_140!=="__pageNames__")){
_140=JSON.parse(_140);
}
var _141=rabbit.data.raw.pages;
for(var id in _141){
this.objects[id]=new rabbit.data.Page(_.extend(_141[id],{id:id}));
this.objects[id].data.pageName=_140[id];
}
rabbit.event.manager.raiseEvent(rabbit.events.pageStoreLoaded);
}};
rabbit.data.Page=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(data){
sup.init.apply(this);
this.data=data||{};
};
this.getUrl=function(){
if(rabbit.result.manager.isExport){
return this.data.pageName;
}else{
return rabbit.communication.manager.getUrl("pageLink",{page:this.data.id});
}
};
});
rabbit.data.folderStore={objects:{},init:function(){
var _142=rabbit.data.raw.folders;
for(var id in _142){
this.objects[id]=new rabbit.data.Folder(_.extend(_142[id],{id:id}));
}
rabbit.event.manager.raiseEvent(rabbit.events.folderStoreLoaded);
}};
rabbit.data.Folder=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(data){
sup.init.apply(this);
this.data=data||{};
};
});
rabbit.data.Interaction=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(_143,_144,_145,_146){
this.data={stencilId:_143,interactionId:_144,uniqueId:_143+"-"+_144,action:_145,reactions:_146};
};
this.initializeAction=function(){
if(!_.has(rabbit.interaction.manager.actions,this.data.action.type)){
console.error("Action \""+this.data.action.type+"\" is not supported");
return;
}
var init=rabbit.interaction.manager.actions[this.data.action.type].init;
if(typeof init==="function"){
init(this);
}
rabbit.interaction.manager.actions[this.data.action.type].defineEvent(this);
};
this.initializeReactions=function(){
_.each(this.data.reactions,function(_147){
if(!_.has(rabbit.interaction.manager.reactions,_147.type)){
console.error("Reaction \""+_147.type+"\" is not supported");
return;
}
var init=rabbit.interaction.manager.reactions[_147.type].init;
if(typeof init==="function"){
init(this,_147);
}
}.bind(this));
rabbit.facade.registerOnEvent(this.data.uniqueId,function(e){
_.each(this.data.reactions,function(_148){
var _149=parseInt(_148.delay,10)||0;
setTimeout(function(){
rabbit.interaction.manager.reactions[_148.type].callback(e,this,_148);
}.bind(this),_149);
}.bind(this));
},this,this.data.stencilId);
};
});
rabbit.data.discussionStore={writeAccess:false,name:"discussion",objects:{},init:function(){
},createDiscussion:function(_14a,_14b,x,y,data){
var url=rabbit.communication.manager.getUrl("createDiscussion",{layerId:_14a});
data=data||{};
data=_.defaults(data,{title:_14b,x:x,y:y,pageX:x,pageY:y,referenceId:rabbit.facade.getCurrentPageId(),pageId:rabbit.facade.getCurrentPageId(),layerContainerId:rabbit.facade.getCurrentPageId()});
return rabbit.data.discussionStore.callAjax(url,data);
},deleteDiscussion:function(_14c){
delete this.objects[_14c.data.id];
var url=rabbit.communication.manager.getUrl("deleteDiscussion",{layerId:_14c.data.layerId});
return this.callAjax(url,{discussion:_14c.data.id});
},flush:function(){
this.objects={};
rabbit.event.manager.raiseEvent(rabbit.events.discussionStoreChanged);
},getFromLayer:function(_14d){
var url=rabbit.communication.manager.getUrl("getDiscussions",{layerId:_14d});
return rabbit.data.discussionStore.callAjax(url);
},callAjax:function(url,data){
var ajax=rabbit.communication.manager.post(url,"json",data);
ajax.done(function(data){
for(var id in data.discussions){
var _14e=this.objects[id];
if(_14e){
_14e.setData(data.discussions[id]);
}else{
_14e=new rabbit.data.Discussion();
_14e.setData(data.discussions[id]);
this.objects[id]=_14e;
}
}
this.writeAccess=data.writeAccess;
if(data.newdiscussion){
rabbit.event.manager.raiseEvent(rabbit.events.discussionStoreAdded,this.objects[data.newdiscussion]);
}
rabbit.event.manager.raiseEvent(rabbit.events.discussionStoreChanged);
}.bind(this));
return ajax;
}};
rabbit.data.Discussion=rabbit.util.Class(rabbit.data.Base,function(sup){
this.init=function(){
sup.init.apply(this);
this.data.title="";
this.data.entries=[];
this.data.status="";
};
this.move=function(x,y,_14f,_150,_151,_152,_153,_154){
this.data.x=x;
this.data.y=y;
this.data.pageX=_14f;
this.data.pageY=_150;
this.data.referenceId=_151;
this.data.pageId=_152;
this.data.layerId=_153;
this.data.layerContainerId=_154;
var url=rabbit.communication.manager.getUrl("moveDiscussion",{layerId:this.data.layerId});
return rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,x:Math.floor(x),y:Math.floor(y),pageX:Math.floor(_14f),pageY:Math.floor(_150),referenceId:_151,pageId:_152,layerId:_153,layerContainerId:_154});
};
this.rename=function(_155){
if(this.data.title===_155){
return;
}
var _156=this.data.title;
this.data.title=_155;
var url=rabbit.communication.manager.getUrl("renameDiscussion",{layerId:this.data.layerId});
var ajax=rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,title:this.data.title});
var _157=t("result.discussion.title-changed").replace("__oldTitle__",_156).replace("__newTitle__",_155);
this.addEntry(_157);
return ajax;
};
this.addEntry=function(text){
var url=rabbit.communication.manager.getUrl("postEntryDiscussion",{layerId:this.data.layerId});
return rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,text:text});
};
this.setState=function(_158){
var url=rabbit.communication.manager.getUrl("setStateDiscussion",{layerId:this.data.layerId});
return rabbit.data.discussionStore.callAjax(url,{discussion:this.data.id,state:_158});
};
});
if(typeof console.debug==="undefined"){
console.warn=console.log;
console.debug=console.log;
}else{
if(rabbit.logLevel==="error"){
console.warn=function(){
};
console.log=function(){
};
console.debug=function(){
};
}else{
if(rabbit.logLevel==="warn"){
console.log=function(){
};
console.debug=function(){
};
}else{
if(rabbit.logLevel==="log"){
console.debug=function(){
};
}
}
}
}
rabbit.plugins.background=function(){
var _159=rabbit.facade;
return {init:function init(){
},adjustBackgroundImage:function adjustBackgroundImage(_15a){
var _15b=document.getElementById("borderDiv");
_15b.style.width=_15a.data.width+"px";
_15b.style.height=_15a.data.height+"px";
var _15c=document.getElementById("repositorybackground");
_15c.setAttribute("width",_15a.data.width);
_15c.setAttribute("height",_15a.data.height);
_15c.setAttribute("style","width:"+_15a.data.width+"px;height:"+_15a.data.height+"px;");
this._replaceBackgroundImage(_15a);
},_replaceBackgroundImage:function _replaceBackgroundImage(_15d){
var _15e,_15f;
if(!_159.vml){
_15e=document.getElementById("repositorybackground");
_15f=_15e.getElementsByTagNameNS("http://www.w3.org/2000/svg","image")[0];
_15f.setAttribute("width",_15d.data.width);
_15f.setAttribute("height",_15d.data.height);
if(_15d.data.image!==""){
_15f.setAttribute("display","inherit");
_15f.setAttributeNS("http://www.w3.org/1999/xlink","href",_15d.data.image);
}else{
_15f.setAttribute("display","none");
_15f.removeAttributeNS("http://www.w3.org/1999/xlink","href");
}
}else{
_15e=document.getElementById("repositorybackground");
_15f=document.createElement("img");
_15f.style.width="";
_15f.style.height="";
_15f.setAttribute("src",_15d.data.image.replace(/_(\d)+\Z/,""));
_15e.replaceChild(_15f,_15e.firstChild);
if(_15d.data.image===""){
_15f.style.display="none";
}else{
_15f.style.display="inline";
this._adjustBackgroundImgSize(_15d.data.width,_15d.data.height);
}
}
},_adjustBackgroundImgSize:function _adjustBackgroundImgSize(_160,_161){
if(!document.images[0].complete){
window.setTimeout("rabbit.plugins.background._adjustBackgroundImgSize("+_160+", "+_161+");",100);
return;
}
var _162=document.images[0].width;
var _163=document.images[0].height;
if(_162/_163>_160/_161){
document.images[0].width=_160;
document.images[0].height=_163*_160/_162;
}else{
document.images[0].width=_162*_161/_163;
document.images[0].height=_161;
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.background);
rabbit.plugins.gps=function(){
var _164=rabbit.facade;
var _165={};
var _166=[];
var _167={nyc:{latitude:40.714353,longitude:-74.005973},paris:{latitude:48.856614,longitude:2.352222},pidoco:{latitude:52.509561,longitude:13.451579},warschauer60:{latitude:52.509754,longitude:13.451715},alexanderplatz:{latitude:52.521832,longitude:13.413168}};
return {trackPositionWithJavaScript:true,trackPosition:false,init:function init(){
this.startTrackPositon();
_164.registerOnEvent("positionChanged",this.positionChanged,this);
_164.registerAction("gps",{availableOnDesktop:false,init:function(){
rabbit.plugins.gps.trackPosition=true;
},render:function(_168){
if(_168.trigger==="both"){
return t("interaction.action.gps.userDescription.both");
}else{
if(_168.trigger==="enter"){
return t("interaction.action.gps.userDescription.enter");
}else{
if(_168.trigger==="leave"){
return t("interaction.action.gps.userDescription.leave");
}
}
}
},defineEvent:function(_169){
var area=JSON.parse(_169.data.action.area);
rabbit.plugins.gps.registerMoveInOutZone(area.latitude,area.longitude,area.distance,_169.data.action.trigger,function(e){
rabbit.interaction.manager.raiseInteraction(_169,e);
});
}});
},startTrackPositon:function(){
var _16a=null;
var _16b=5000;
if(navigator.geolocation){
var _16c=function(){
if(rabbit.plugins.gps.trackPosition){
if(rabbit.plugins.gps.trackPositionWithJavaScript){
navigator.geolocation.getCurrentPosition(function(_16d){
rabbit.plugins.gps.positionChanged(_16d.coords);
_16a=setInterval(_16c,_16b);
},function(){
console.log("ERROR GPS!");
},{maximumAge:_16b,enableHighAccuracy:true,timeout:10000});
}
clearInterval(_16a);
}
};
_16a=setInterval(_16c,_16b);
}
},moveToDummyPosition:function(name){
if(!_.has(_167,name)){
throw "Dummy position "+name+" not found.";
}
this.positionChanged({latitude:_167[name].latitude,longitude:_167[name].longitude});
},registerMoveInOutZone:function(_16e,_16f,_170,_171,_172){
_166.push({latitude:_16e,longitude:_16f,distance:_170,callback:_172,trigger:_171,wasInArea:false});
},positionChanged:function(_173){
for(var i=0;i<_166.length;i++){
var area=_166[i];
var _174=this.isPositionInArea(_173,area);
if(_174&&!area.wasInArea&&area.trigger==="enter"||!_174&&area.wasInArea&&area.trigger==="leave"||_174!==area.wasInArea&&area.trigger==="both"){
area.callback();
}
area.wasInArea=_174;
}
},isPositionInArea:function(_175,area){
return this.calculateDistance(_175.latitude,_175.longitude,area.latitude,area.longitude)<area.distance;
},calculateDistance:function(lat1,lon1,lat2,lon2){
var _176=function(deg){
return deg*(Math.PI/180);
};
var R=6371;
var dLat=_176(lat2-lat1);
var dLon=_176(lon2-lon1);
var a=Math.sin(dLat/2)*Math.sin(dLat/2)+Math.cos(_176(lat1))*Math.cos(_176(lat2))*Math.sin(dLon/2)*Math.sin(dLon/2);
var c=2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
var d=R*c;
return d*1000;
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.gps);
rabbit.plugins.keypress=function(){
var _177=rabbit.facade;
return {init:function(){
_177.registerAction("keypress",{makeableOnDesktop:true,render:function(_178){
return t("interaction.action.keypress.userDescription");
},defineEvent:function(_179){
var _17a=_179.data.action.sequence;
if(_17a){
Mousetrap.bind(_17a,function(){
rabbit.interaction.manager.raiseInteraction(_179,{});
});
}
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.keypress);
rabbit.plugins.sound=function(){
var _17b=rabbit.facade;
return {audiofiles:{},audios:{},init:function(){
_17b.registerReaction("sound",{init:function(_17c,_17d){
var id=_17d.soundUploader;
if(rabbit.result&&rabbit.result.manager.isExport){
url=rabbit.communication.manager.getUrl("mp3Export",{audioId:id});
}else{
url=rabbit.communication.manager.getUrl("mp3",{prototypeId:rabbit.result.manager.currentPrototypeId,audioId:id});
}
rabbit.plugins.sound.audiofiles[id]=new Audio(url);
},callback:function(_17e,_17f,_180){
rabbit.plugins.sound.audiofiles[_180.soundUploader].play();
if(_180.duration!==""){
setTimeout(function(){
rabbit.plugins.sound.audiofiles[_180.soundUploader].pause();
rabbit.plugins.sound.audiofiles[_180.soundUploader].currentTime=0;
},_180.duration);
}
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.sound);
rabbit.plugins.systemAlert=function(){
var _181=rabbit.facade;
return {init:function(){
_181.registerReaction("systemAlert",{callback:function(_182,_183,_184){
this.alert(_184.title,_184.text,_184.buttonName);
}.bind(this)});
},alert:function(_185,text,_186){
if(_181.runningInApp()){
rabbit.facade.mobile.trigger("pidoco:systemAlert",{title:_185,text:text,buttonName:_186});
}else{
alert(text);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.systemAlert);
rabbit.plugins.flip=function(){
var _187=rabbit.facade;
return {init:function(){
_187.registerAction("flip",{makeableOnDesktop:false,render:function(_188){
return t("interaction.action.flip.userDescription");
},defineEvent:function(_189){
new Fliptiltshake("flip",function(){
rabbit.interaction.manager.raiseInteraction(_189,{});
});
Fliptiltshake.start();
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.flip);
rabbit.plugins.tilt=function(){
var _18a=rabbit.facade;
return {paused:false,init:function(){
_18a.registerAction("tilt",{makeableOnDesktop:false,render:function(_18b){
return t("interaction.action.tilt.userDescription");
},defineEvent:function(_18c){
new Fliptiltshake("tilt",{rotation:_18c.data.action.rotation,direction:(_18c.data.action.direction==="both")?null:_18c.data.action.direction,angle:_18c.data.action.angle,callback:function(){
if(rabbit.plugins.tilt.paused){
return;
}
var _18d=rabbit.interaction.manager.raiseInteraction(_18c,{});
if(_18d){
rabbit.plugins.tilt.paused=true;
setTimeout(function(){
rabbit.plugins.tilt.paused=false;
},500);
}
}});
Fliptiltshake.start();
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.tilt);
rabbit.plugins.shake=function(){
var _18e=rabbit.facade;
return {init:function(){
_18e.registerAction("shake",{makeableOnDesktop:false,render:function(_18f){
return t("interaction.action.shake.userDescription");
},defineEvent:function(_190){
var _191=(_18e.isIOS)?_190.data.action.intensity:_190.data.action.intensity*10;
new Fliptiltshake("shake",{threshold:_191,durationMin:_190.data.action.duration,callback:function(){
rabbit.interaction.manager.raiseInteraction(_190,{});
}});
Fliptiltshake.start();
}});
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.shake);
rabbit.plugins.orientation=function(){
var _192=rabbit.facade;
var _193=null;
return {trackPositionWithJavaScript:true,trackPosition:false,init:function(){
rabbit.facade.mobile.bind("pidoco:orientationchange",function(e){
rabbit.plugins.orientation.orientationChanged(e.data.orientation);
});
window.addEventListener("orientationchange",function(){
rabbit.plugins.orientation.orientationChanged(window.orientation);
});
_192.registerAction("orientation",{makeableOnDesktop:false,render:function(_194){
var _195=_194.data.action;
if(_195.direction==="portrait"){
return t("interaction.action.orientation.userDescription.portrait");
}else{
return t("interaction.action.orientation.userDescription.landscape");
}
},defineEvent:function(_196){
_192.registerOnEvent("orientationChanged",function(_197){
if(_196.data.action.direction==_197){
rabbit.interaction.manager.raiseInteraction(_196,{});
}
},this);
}});
},orientationChanged:function(_198){
var _199=(_198===90||_198===-90)?"landscape":"portrait";
if(_193!=_199){
_193=_199;
_192.raiseEvent("orientationChanged",_199);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.orientation);
rabbit.plugins.mobileInteractionTrigger={groupTopOffset:30,template:"<div class=\"trigger-container\">"+"</div>",interactions:{},triggerGroups:{},init:function(){
if(rabbit.facade.runningInApp()){
return;
}
this.container=$(this.template).appendTo("#borderDiv");
rabbit.facade.registerOnEvent(rabbit.events.newInteractionRegistered,this.newInteractionRegistered,this);
rabbit.facade.registerOnEvent(rabbit.events.showLayer,this.showLayerListener,this);
rabbit.facade.registerOnEvent(rabbit.events.hideLayer,this.hideLayerListener,this);
},newInteractionRegistered:function(_19a){
var _19b=_19a.data.action;
var _19c=typeof rabbit.interaction.manager.actions[_19b.type].makeableOnDesktop==="function"?rabbit.interaction.manager.actions[_19b.type].makeableOnDesktop(_19b):rabbit.interaction.manager.actions[_19b.type].makeableOnDesktop;
if(_19c){
return;
}
if(this.interactions[_19a.data.uniqueId]){
return;
}
var _19d=_19a.data.stencilId;
var _19e=document.getElementById(_19d);
if($(_19e).parents(".transition-wrapper:first").length){
return;
}
var _19f=$(_19e).closest(".mobile-interaction-potential-trigger");
var _1a0=_19f.attr("id");
var _1a1=$(_19f).position();
var _1a2=true;
if($(_19e).hasClass("layer")){
_1a2=false;
}
var _1a3=this.triggerGroups[_1a0];
if(!_1a3){
_1a3=$("<div class=\"mobile-interactions-trigger-group-"+_1a0+" mobile-interactions-trigger-group\" data-trigger-id=\""+_1a0+"\"></div>");
this.triggerGroups[_1a0]=_1a3;
$(_19f).mouseenter(function(e){
this.displayInteractions(_1a3);
return false;
}.bind(this)).mouseleave(function(e){
this.hideAllInteractions();
if(_1a2){
var id=$(_19e).closest(".repository").attr("id");
this.displayInteractions($(".mobile-interactions-trigger-group-"+id));
}
return false;
}.bind(this));
_1a3.css({left:_1a1.left/rabbit.facade.getScaleFactor(),top:_1a1.top/rabbit.facade.getScaleFactor()-this.groupTopOffset});
this.container.append(_1a3);
$(_1a3).mouseenter(function(e){
this.displayInteractions(_1a3);
return false;
}.bind(this)).mouseleave(function(e){
this.hideAllInteractions();
if(_1a2){
var id=$(_19e).closest(".repository").attr("id");
this.displayInteractions($(".mobile-interactions-trigger-group-"+id));
}
return false;
}.bind(this));
}
var _1a4=$("<div class=\"active interaction-trigger interaction-trigger-"+_19a.data.uniqueId+" interaction-trigger-"+_19b.type+"\" title=\""+t("interaction-trigger-"+_19a.data.action.type+"-tooltip")+"\">"+t("trigger-label-"+_19b.type)+"</div>");
if(!_1a2){
_1a4.addClass("interaction-trigger-layer-"+_19d.replace("-layer",""));
}
_1a4.click(function(){
rabbit.facade.raiseInteraction(_19a);
this.hideAllInteractions();
}.bind(this));
_1a3.append(_1a4);
this.interactions[_19a.data.uniqueId]=_19a;
},hideAllInteractions:function(){
$(".mobile-interactions-trigger-group").removeClass("visible");
},displayInteractions:function(_1a5){
$(".mobile-interactions-trigger-group").removeClass("visible");
this.updateTriggerGroupPosition(_1a5);
$(_1a5).addClass("visible");
},showLayerListener:function(data){
if(data.repositoryId==="repository"){
$(".interaction-trigger-layer-"+data.repositoryId+data.layerId).addClass("active");
$(".mobile-interactions-trigger-group").each(function(_1a6,_1a7){
this.updateTriggerGroupPosition($(_1a7));
}.bind(this));
}
},hideLayerListener:function(data){
if(data.repositoryId==="repository"){
$(".interaction-trigger-layer-"+data.repositoryId+data.layerId).removeClass("active");
}
},updateTriggerGroupPosition:function(_1a8){
var _1a9=$("#"+_1a8.data("trigger-id"));
if(_1a9.length){
var _1aa=_1a9.position();
$(_1a8).css({left:_1aa.left/rabbit.facade.getScaleFactor(),top:_1aa.top/rabbit.facade.getScaleFactor()-this.groupTopOffset});
}
},updateAllTriggerGroupPosition:function(){
for(var _1ab in this.triggerGroups){
this.updateTriggerGroupPosition(this.triggerGroups[_1ab]);
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.mobileInteractionTrigger);
rabbit.plugins.toolbar={template:"<div class=\"toolbar\">"+"<div class=\"left\">"+"<a class=\"edit-btn btn\" href=\"#\"><span class=\"icon\" /><%= t('toolbar.edit') %></a>"+"<a class=\"sketched-btn btn\" href=\"#\"><%= t('toolbar.sketched') %></a> "+"<a class=\"sketched-arial-btn btn\" href=\"#\"><%= t('toolbar.sketchedArial') %></a> "+"<a class=\"plain-btn btn\" href=\"#\"><%= t('toolbar.plain') %></a>"+"<a class=\"orginal-size-btn btn\" href=\"#\"><%= t('toolbar.originalSize') %></a>"+"<a class=\"fit-screen-btn btn\" href=\"#\"><%= t('toolbar.fitScreen') %></a>"+"<a class=\"show-frame-btn btn\" href=\"#\"><%= t('toolbar.showFrame') %></a>"+"<a class=\"hide-frame-btn btn\" href=\"#\"><%= t('toolbar.hideFrame') %></a>"+"<a class=\"left-align-btn btn alignment-btn\" href=\"#\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-glyph-e111\"/></svg></a>"+"<a class=\"center-align-btn btn alignment-btn\" href=\"#\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-glyph-e112\"/></svg></a>"+"<a class=\"right-align-btn btn alignment-btn\" href=\"#\"><svg xmlns=\"http://www.w3.org/2000/svg\" class=\"icon\"><use xmlns:xlink=\"http://www.w3.org/1999/xlink\" xlink:href=\"#icon-glyph-e113\"/></svg></a>"+"</div>"+"<div class=\"center\">"+"</div>"+"</div>",init:function(){
if(rabbit.facade.runningInApp()){
return;
}
this.toolbar=$($.trim(_.template(this.template)())).appendTo(".toolbar-wrapper>.container");
rabbit.facade.registerOnEvent(rabbit.events.pageStoreLoaded,this.pageStoreLoaded,this);
rabbit.facade.registerOnEvent(rabbit.events.pageLoaded,this.pageLoaded,this);
rabbit.facade.registerOnEvent(rabbit.events.pluginInitialized,this.pluginInitialized,this);
if(rabbit.facade.getRole()!="EDITOR"){
this.toolbar.find(".edit-btn").hide();
}
this.originalSizeButton=this.toolbar.find(".orginal-size-btn");
this.fitScreenButton=this.toolbar.find(".fit-screen-btn");
this.showFrameButton=this.toolbar.find(".show-frame-btn");
this.hideFrameButton=this.toolbar.find(".hide-frame-btn");
this.leftAlignButton=this.toolbar.find(".left-align-btn");
this.centerAlignButton=this.toolbar.find(".center-align-btn");
this.rightAlignButton=this.toolbar.find(".right-align-btn");
},pluginInitialized:function(){
if(rabbit.facade.getUserPref("hidePageFrame")){
this.hideFrameButton.hide();
this.showFrameButton.show();
}else{
this.hideFrameButton.show();
this.showFrameButton.hide();
}
if(rabbit.facade.getUserPref("simulationFitScreen")){
this.originalSizeButton.show();
this.fitScreenButton.hide();
}else{
this.originalSizeButton.hide();
this.fitScreenButton.show();
}
this.originalSizeButton.click(function(){
this.originalSizeButton.hide();
this.fitScreenButton.show();
rabbit.plugins.frame.setOriginalSize();
return false;
}.bind(this));
this.fitScreenButton.click(function(){
this.originalSizeButton.show();
this.fitScreenButton.hide();
rabbit.plugins.frame.setFitScreen();
return false;
}.bind(this));
this.hideFrameButton.click(function(){
this.showFrameButton.show();
this.hideFrameButton.hide();
rabbit.plugins.frame.hideFrame();
return false;
}.bind(this));
this.showFrameButton.click(function(){
this.showFrameButton.hide();
this.hideFrameButton.show();
rabbit.plugins.frame.showFrame();
return false;
}.bind(this));
this.leftAlignButton.click(function(){
rabbit.plugins.prototypeAlignment.left();
return false;
});
this.centerAlignButton.click(function(){
rabbit.plugins.prototypeAlignment.center();
return false;
});
this.rightAlignButton.click(function(){
rabbit.plugins.prototypeAlignment.right();
return false;
});
},pageStoreLoaded:function(){
this.mode=document.getElementById("mode").innerHTML;
this.changeLinks(rabbit.result.manager.currentPageNr);
},pageLoaded:function(page,_1ac){
this.changeLinks(page.data.id);
},changeLinks:function(_1ad){
var _1ae=rabbit.communication.manager.buildEditUrl(rabbit.result.manager.currentPageNr);
var _1af=rabbit.facade.getUrlPattern().replace("__page__",_1ad);
var _1b0=_1af.replace(this.mode,"sketched").replace("?fontFamily=arial","");
var _1b1=_1af.replace(this.mode,"sketchedArial");
var _1b2=_1af.replace(this.mode,"plain").replace("?fontFamily=arial","");
this.toolbar.find(".edit-btn").attr("href",_1ae);
this.toolbar.find(".sketched-btn").attr("href",_1b0);
this.toolbar.find(".sketched-arial-btn").attr("href",_1b1);
this.toolbar.find(".plain-btn").attr("href",_1b2);
}};
rabbit.facade.registerPlugin(rabbit.plugins.toolbar);
rabbit.plugins.overlay={shownOverlays:[],rectangles:{},init:function(){
$("#borderDiv").append("<div class=\"overlay-background\"></div>");
rabbit.facade.registerReaction("showOverlay",{init:function(_1b3,_1b4){
this.prepareOverlay(_1b3.data.uniqueId,_1b4.target);
}.bind(this),callback:function(_1b5,_1b6,_1b7){
this.showOverlay(_1b6.data.uniqueId,_1b7.target);
}.bind(this)});
rabbit.facade.registerReaction("hideOverlay",{callback:function(_1b8,_1b9,_1ba){
this.hideOverlay();
}.bind(this)});
},prepareOverlay:function(_1bb,_1bc){
var _1bd=$("<div></div>");
var id="overlay-"+_1bb;
var page=rabbit.data.pageStore.objects[_1bc];
var url,ajax;
if(page){
_1bd.addClass("overlay").addClass("repository").attr("id",id).attr("data-original-layer-id",_1bc).attr("data-page-id",_1bc).attr("data-apply-scale-factor","").appendTo("body").css({width:page.data.width+"px",height:page.data.height+"px"}).data("has-rectangle",false);
this.loadRectangle(page.data.width,page.data.height);
rabbit.ui.manager.createWrappers(id,_1bc,true);
rabbit.facade.loadLayer(_1bc);
}
},loadRectangle:function(_1be,_1bf){
if(this.hasRectangle(_1be,_1bf)){
return;
}
if(rabbit.result.manager.isExport){
var _1c0=(rabbit.browser==="ie")?"-ie":"";
url=rabbit.communication.manager.getUrl("rectangleExport",{height:_1bf,width:_1be,mode:rabbit.util.getMode()});
ajax=rabbit.communication.manager.get(url,"jsonp",{},{crossDomain:rabbit.result.manager.isExport});
}else{
url=rabbit.communication.manager.getUrl("rectangle",{prototypeId:rabbit.result.manager.currentPrototypeId,mode:rabbit.facade.getMode()});
ajax=rabbit.communication.manager.get(url,"html",{height:_1bf,width:_1be});
ajax.success(function(html){
var _1c1=$(html).children().first();
this.setRectangle(_1be,_1bf,_1c1);
}.bind(this));
}
},setRectangle:function(_1c2,_1c3,html){
this.rectangles[_1c2+"x"+_1c3]=html;
},getRectangle:function(_1c4,_1c5){
return $(this.rectangles[_1c4+"x"+_1c5]).clone();
},hasRectangle:function(_1c6,_1c7){
return typeof this.rectangles[_1c6+"x"+_1c7]!=="undefined";
},showOverlayBackground:function(){
$(".overlay-background").show();
},hideOverlayBackground:function(){
$(".overlay-background").hide();
},showOverlay:function(_1c8,_1c9){
var id="overlay-"+_1c8;
var page=rabbit.data.pageStore.objects[_1c9];
var _1ca=rabbit.facade.getCurrentPage();
var _1cb=$("#"+id);
if(page){
var _1cc=page.data.width;
var _1cd=page.data.height;
if(!_1cb.data("has-rectangle")){
_1cb.append(this.getRectangle(_1cc,_1cd));
_1cb.data("has-rectangle",true);
}
var _1ce=$("#repository").offset();
var _1cf=$(document).height()>$(window).height();
var top,left;
if(_1cf){
top=(window.innerHeight-parseInt(_1cd))/2;
left=(rabbit.facade.getMode()==="plain")?(_1ca.data.width-parseInt(_1cc))/2:(window.innerWidth-parseInt(_1cc))/2;
}else{
top=_1ce.top+(_1ca.data.height*rabbit.facade.getScaleFactor()-parseInt(_1cd))/2;
left=_1ce.left+(_1ca.data.width*rabbit.facade.getScaleFactor()-parseInt(_1cc))/2;
}
_1cb.show().css({top:top,left:left,transform:"scale("+rabbit.facade.getScaleFactor()+", "+rabbit.facade.getScaleFactor()+")"});
rabbit.ui.manager.showPage($("#"+id),_1c9);
this.showOverlayBackground();
this.shownOverlays.push(_1cb);
}else{
}
},hideOverlay:function(){
var _1d0=this.shownOverlays.pop();
_1d0.hide();
this.hideOverlayBackground();
}};
rabbit.facade.registerPlugin(rabbit.plugins.overlay);
rabbit.plugins.scrollTo=function(){
var _1d1=rabbit.facade;
return {init:function(){
_1d1.registerReaction("scrollTo",{callback:function(_1d2,_1d3,_1d4){
this.scrollTo(_1d4.position,_1d4.duration);
}.bind(this)});
},scrollTo:function(_1d5,_1d6){
var _1d7=$("html, body");
var _1d8=$(".border-wrapper");
if(rabbit.facade.isFrameDisplayed&&_1d8[0].scrollHeight>_1d8.height()){
_1d7=_1d8;
}
if(_1d5==="bottom"){
_1d7.animate({scrollTop:_1d7[0].scrollHeight},parseInt(_1d6));
}else{
_1d7.animate({scrollTop:0},parseInt(_1d6));
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.scrollTo);
rabbit.plugins.startDialer={shownOverlays:[],rectangles:{},init:function(){
rabbit.facade.registerReaction("startDialer",{callback:function(_1d9,_1da,_1db){
this.startDialer(_1db.phoneNumber);
}.bind(this)});
},startDialer:function(_1dc){
window.location.href="tel:"+_1dc;
}};
rabbit.facade.registerPlugin(rabbit.plugins.startDialer);
rabbit.plugins.gestureHighlight=function(){
return {init:function(){
},touchListener:function(e){
this.emptyTouches();
for(var i=0;i<e.targetTouches.length;i++){
var _1dd=e.targetTouches[i];
var _1de=this.makeCircle(_1dd.pageX-this.offset.left,_1dd.pageY-this.offset.top);
this.touchViewer[0].appendChild(_1de);
}
e.preventDefault();
},touchEndListener:function(){
setTimeout(function(){
var _1df=this.touchViewer.find("div");
_1df.each(function(){
if(!$(this).hasClass("touch-success")){
$(this).addClass("touch-fail");
}
});
setTimeout(function(){
_1df.fadeOut();
},500);
}.bind(this),300);
},touchSuccess:function(){
var _1e0=this.touchViewer.find("div");
_1e0.each(function(){
$(this).removeClass("touch-fail");
$(this).addClass("touch-success");
});
setTimeout(function(){
_1e0.fadeOut();
},500);
},makeCircle:function(cx,cy){
var el=document.createElement("div");
el.setAttribute("class","touch");
el.style.left=cx+"px";
el.style.top=cy+"px";
return el;
},emptyTouches:function(){
this.touchViewer[0].innerHTML="";
},markHighlightTouchesAsSuccessful:function(){
var _1e1=document.getElementsByClassName("touch");
for(var i=0;i<_1e1.length;i++){
_1e1[i].setAttribute("class",_1e1[i].getAttribute("class")+" touch-success");
}
}};
}();
rabbit.facade.registerPlugin(rabbit.plugins.gestureHighlight);
rabbit.plugins.hold={init:function(){
rabbit.facade.registerAction("hold",{makeableOnDesktop:true,render:function(_1e2){
return t("interaction.action.hold.userDescription");
},defineEvent:function(_1e3){
var _1e4=Hammer(document.getElementById(_1e3.data.stencilId),{hold_timeout:_1e3.data.action.timeout});
_1e4.on("hold",function(e){
rabbit.interaction.manager.raiseInteraction(_1e3,{});
});
}});
}};
rabbit.facade.registerPlugin(rabbit.plugins.hold);
rabbit.plugins.valueChanged={listenedGroups:{},init:function(){
rabbit.facade.registerAction("booleanValueChanged",{makeableOnDesktop:true,render:function(_1e5){
return t("interaction.action.booleanValueChanged.userDescription");
},defineEvent:function(_1e6){
var _1e7=_1e6.data.stencilId;
var _1e8=$("#"+_1e7);
if(_1e8.hasClass("radiobutton")){
var _1e9=_1e8.find("input:first").attr("name");
if(!_.has(rabbit.plugins.valueChanged.listenedGroups,_1e9)){
rabbit.plugins.valueChanged.listenedGroups[_1e9]=[];
$("input[name=\""+_1e9+"\"]").change(function(e){
var _1ea=$(e.target).val();
var _1eb=$(e.target).data("old-selected-radiobutton-id");
for(var i=0;i<rabbit.plugins.valueChanged.listenedGroups[_1e9].length;i++){
var _1ec=rabbit.plugins.valueChanged.listenedGroups[_1e9][i];
var _1ed=_1ec.data.stencilId;
var _1ee=_1ec.data.action.selected;
if(_1ea===_1ed&&_1ee==="yes"||_1eb===_1ed&&_1ee==="no"||(_1ea===_1ed||_1eb===_1ed)&&_1ee==="toggle"){
rabbit.interaction.manager.raiseInteraction(_1ec,rabbit.interaction.manager.serializeEvent(e));
}
}
$("input[name=\""+_1e9+"\"]").data("old-selected-radiobutton-id",_1ea);
});
}
rabbit.plugins.valueChanged.listenedGroups[_1e9].push(_1e6);
}else{
if(_1e8.hasClass("checkbox")){
$("#"+_1e6.data.stencilId+" input:first").change(function(e){
if($(e.target).is(":checked")===(_1e6.data.action.selected==="yes")||_1e6.data.action.selected==="toggle"){
rabbit.interaction.manager.raiseInteraction(_1e6,rabbit.interaction.manager.serializeEvent(e));
}
});
}else{
if(_1e8.hasClass("iphoneSwitch")){
var _1ef=function(id){
if(_1e6.data.stencilId===id){
rabbit.interaction.manager.raiseInteraction(_1e6);
}
};
if(_1e6.data.action.selected==="yes"||_1e6.data.action.selected==="toggle"){
rabbit.facade.registerOnEvent(rabbit.events.switchOffSwitch,_1ef,this);
}
if(_1e6.data.action.selected==="no"||_1e6.data.action.selected==="toggle"){
rabbit.facade.registerOnEvent(rabbit.events.switchOnSwitch,_1ef,this);
}
}
}
}
}});
rabbit.facade.registerAction("stringValueChanged",{makeableOnDesktop:true,render:function(_1f0){
return t("interaction.action.stringValueChanged.userDescription");
},defineEvent:function(_1f1){
$("#"+_1f1.data.stencilId).change(function(e){
if(e.target.value===_1f1.data.action.value){
rabbit.interaction.manager.raiseInteraction(_1f1,rabbit.interaction.manager.serializeEvent(e));
}
});
}});
}};
rabbit.facade.registerPlugin(rabbit.plugins.valueChanged);
rabbit.plugins.footnote={name:"export",detailFootnotes:{},discussionFootnotes:{},counterDetailFootnotes:0,counterDiscussionFootnotes:0,placedMarkers:[],placedMarkersInPageCoordinateSystem:[],markerSize:20,init:function(){
rabbit.facade.registerOnEvent(rabbit.events.newInteractionRegistered,function(_1f2){
var _1f3=document.getElementById(_1f2.getData().stencilId);
var _1f4=_1f3.hasAttribute("data-stencil-id");
var _1f5=_1f3.hasAttribute("data-layer-id");
var id=_1f2.getData().stencilId;
if(!_1f4&&!_1f5&&!this.detailFootnotes[id]){
this.detailFootnotes[id]=_.size(this.detailFootnotes)+1;
}
},this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,function(){
$(".has-footnote").each(function(_1f6,_1f7){
var _1f8=_1f7.getAttribute("data-stencil-id");
if(!_1f8){
_1f8=_1f7.getAttribute("data-layer-id");
}
if(!this.detailFootnotes[_1f8]){
this.detailFootnotes[_1f8]=_.size(this.detailFootnotes)+1;
}
}.bind(this));
},this);
},showAllFootnotes:function(){
this.hideFootnotes();
this.showDiscussionFootnotes();
this.showDetailFootnotes();
},showFootnote:function(_1f9,x,y,type,_1fa,_1fb,_1fc,_1fd,text,_1fe){
var _1ff=_1f9.offset();
var _200=x;
var _201=y;
if(!_1fc){
_200-=_1ff.left;
_201-=_1ff.top;
}
var _202,_203;
if(!_1fb){
if(type=="detail"){
_202=(this.counterDetailFootnotes++)+1;
}else{
if(type=="discussion"){
_202=this.getDiscussionLetters(this.counterDiscussionFootnotes++);
}
}
_203=$("<div class=\"footnote-marker footnote-marker-"+type+"\">"+_202+"</div>").css({left:_200,top:_201});
_1f9.append(_203);
}
this.placedMarkers.push({stencilOrLayerId:_1fa,stencilUniqueId:_1f9.attr("id"),type:type,index:_202,x:x,y:y,outsideOfPage:_1fb,inStencilInteraction:_1fc,target:_1fd,text:text,footnoteId:_1fe,footnoteElement:_203});
},getShownFootnoteIndexes:function(type){
var _204={};
for(var i=0;i<this.placedMarkers.length;i++){
var _205=this.placedMarkers[i];
if(!type||_205.type==type){
_204[_205.index]={index:_205.index,stencilUniqueId:_205.stencilUniqueId,outsideOfPage:_205.outsideOfPage,inStencilInteraction:_205.inStencilInteraction,stencilOrLayerId:_205.stencilOrLayerId,target:_205.target,text:_205.text,footnoteId:_205.footnoteId};
}
}
return _204;
},hideFootnotes:function(){
this.counterDetailFootnotes=0;
this.counterDiscussionFootnotes=0;
this.placedMarkers=[];
$(".footnote-marker, .footnote-marker-line").remove();
},showDetailFootnotes:function(_206){
for(var _207 in this.detailFootnotes){
var _208=false;
var _209=$("[data-stencil-id=\""+_207+"\"], .wrapper[data-layer-id=\""+_207+"\"][data-layer-id=\""+_206+"\"]");
var _20a=null,text=null;
if(!_209.length){
_209=$("#"+_207);
_208=true;
_20a=_209.attr("data-href");
text=_.str.clean(_209.text());
text=_.str.truncate(text,20);
_207=null;
}
for(var i=0;i<_209.length;i++){
var _20b=$(_209.get(i));
if(!_20b.closest(".wrapper[data-layer-id=\""+_206+"\"]").length){
continue;
}
var _20c=_20b.offset();
var _20d=_20b.width();
if(_208){
_20d=_20b.width()/2;
}
var x=_20c.left+_20d;
var y=_20c.top-20;
var _20e=this.findPosition(x,y,"x",1);
this.placedMarkersInPageCoordinateSystem.push({x:_20e.x,y:_20e.y});
if(_208){
var _20f=_20b.position();
_20e.x=_20f.left+_20d+(x-_20e.x);
_20e.y=_20f.top-20+(y-_20e.y);
}
this.showFootnote(_20b,_20e.x,_20e.y,"detail",_207,_20e.outsideOfPage,_208,_20a,text);
}
}
this.sortFootenotes();
},sortFootenotes:function(){
this.placedMarkers=_.sortBy(this.placedMarkers,function(_210){
return ($(_210.footnoteElement).offset())?$(_210.footnoteElement).offset().left:100000;
});
for(var i=0;i<this.placedMarkers.length;i++){
var _211=this.placedMarkers[i].footnoteElement;
$(_211).text(i+1);
this.placedMarkers[i].index=i+1;
}
},getShownDetailFootnotes:function(){
return this.getShownFootnoteIndexes("detail");
},getDiscussionLetters:function(_212){
var v="abcdefghijklmnopqrstuvwxyz".split("");
var _213="";
var nr=Math.floor(_212/26);
var mod=_212%26;
for(var j=1,jj=1;j<=nr;j=Math.pow(26,jj)+1,jj++){
_213+=v[(nr-1)%26];
}
_213+=v[mod];
return _213;
},showDiscussionFootnotes:function(_214){
var _215="abcdefghijklmopqrestuvwxyz".split("");
var _216=$("#repository").offset();
var _217=this.discussionFootnotes[_214];
if(_.isArray(_217)){
for(var i=0;i<_217.length;i++){
var _218=_217[i];
var _219=_218.referenceId;
var _21a=$(".wrapper-"+_214+">.layer [data-stencil-id=\""+_219+"\"]");
if(_21a.length===0){
_21a=$("[data-page-id=\"page0001\"]");
}
for(var j=0;j<_21a.length;j++){
var _21b=$(_21a.get(j));
var _21c=_21b.offset();
var x=_21c.left+_218.x;
var y=_21c.top+_218.y;
var _21d=this.findPosition(x,y,"x",1);
this.placedMarkersInPageCoordinateSystem.push({x:_21d.x,y:_21d.y});
this.showFootnote(_21b,_21d.x,_21d.y,"discussion",_218.id,_21d.outsideOfPage,null,null,null,_218.id);
}
}
}
},getShownDiscussionFootnotes:function(){
return this.getShownFootnoteIndexes("discussion");
},findPosition:function(x,y,_21e,deep){
deep=deep||1;
var xMin=0-2*this.markerSize;
var yMin=0-2*this.markerSize;
var xMax=$("#repository").width()+2*this.markerSize;
var yMax=$("#repository").height()+2*this.markerSize;
if(x<xMin||x>xMax||y<yMin||y>yMax){
return {outsideOfPage:true};
}else{
return this._findPosition(x,y,_21e,deep);
}
},_findPosition:function(x,y,_21f,deep){
var _220={x:x,y:y,outsideOfPage:false};
var _221=false;
var _222=null;
var _223=null;
var _224=null;
var _225=null;
var xMax=$("#repository").width()-this.markerSize;
var yMax=$("#repository").height()-this.markerSize;
if(x<0){
_21f="x";
_221=true;
}else{
if(y<0){
_21f="y";
_221=true;
}else{
if(x>xMax){
_21f="x";
_221=true;
}else{
if(y>yMax){
_21f="y";
_221=true;
}else{
for(var i=0;i<this.placedMarkers.length;i++){
var _226=true;
var _227=true;
var _228=this.placedMarkersInPageCoordinateSystem[i];
var _229=x-_228.x;
if(Math.abs(_229)<this.markerSize){
_226=false;
if(_229>0){
_222=Math.abs(_229);
}else{
_223=Math.abs(_229);
}
}
var _22a=y-_228.y;
if(Math.abs(_22a)<this.markerSize){
_227=false;
if(_22a>0){
_224=Math.abs(_22a);
}else{
_225=Math.abs(_22a);
}
}
if(!_226&&!_227){
_221=true;
break;
}
}
}
}
}
}
_220.x=Math.min(_220.x,$("#repository").width()-2*this.markerSize);
_220.y=Math.min(_220.y,$("#repository").height()-2*this.markerSize);
if(_221&&deep<100){
if(_21f=="x"){
var _22b=true;
if(_223===null&&x<xMax||_222!==null&&_223<_222||x<0){
_22b=false;
}
if(_22b){
_220.x=x-this.markerSize;
}else{
_220.x=x+this.markerSize;
}
}
if(_21f=="y"){
var _22c=true;
if(_225===null&&y<yMax||_224!==null&&_225<_224||y<0){
_22c=false;
}
if(_22c){
_220.y=y-this.markerSize;
}else{
_220.y=y+this.markerSize;
}
}
return this.findPosition(_220.x,_220.y,(_21f==="x")?"y":"x",++deep);
}else{
return _220;
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.footnote);
rabbit.plugins.stencilHighlighter={init:function(){
},highlightStencil:function(_22d){
var _22e=$("<div class=\"stencil-highlighter-highlighted\"></div>");
_22d.append(_22e);
},hideHighlightLayer:function(_22f){
$(".layer[data-layer-id=\""+_22f+"\"] .stencil .stencil-highlighter-highlighted").remove();
},showHighlightLayer:function(_230){
this.hideHighlightLayer(_230);
var _231=$(".layer[data-layer-id=\""+_230+"\"] .stencil");
for(var i=0;i<_231.length;i++){
this.highlightStencil($(_231.get(i)));
}
},deopacify:function(){
$(".stencil-highlighter-opacifyied").removeClass("stencil-highlighter-opacifyied");
},opacifyExceptLayer:function(_232){
this.deopacify();
var _233=$(".stencil");
for(var i=0;i<_233.length;i++){
var _234=$(_233.get(i));
if(!_234.closest(".layer[data-layer-id=\""+_232+"\"]").length){
_234.addClass("stencil-highlighter-opacifyied");
}
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.stencilHighlighter);
rabbit.plugins.tinymcelinks={init:function(){
rabbit.facade.registerOnEvent("pageReady",function(){
var _235=document.querySelectorAll(".layer");
for(var i=0;i<_235.length;i++){
this.activateLinksForLayer(_235[i]);
}
},this);
rabbit.facade.registerOnEvent("layerStoreInserted",this.activateLinksForLayer,this);
},activateLinksForLayer:function(_236){
var _237=_236.querySelectorAll(".default-text2-container a[href]");
for(var i=0;i<_237.length;i++){
var link=_237[i];
if(!link.id){
link.id=Math.floor(Math.random()*1000000000);
}
var id=link.id;
var _238=link.getAttribute("href");
rabbit.interaction.manager.registerInteraction(id,"tinymce-interaction-"+id,{"button":"left","id":"tinymce-action-"+id,"numberOfFinger":"1","type":"click"},[{"delay":"0","id":"tinymce-reaction-"+id,"options":"reloadOnly","target":_238,"transition":"none","type":"showPage"}]);
link.className=link.className+" pidoco-clickable-element";
link.setAttribute("data-href",_238);
link.removeAttribute("href");
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.tinymcelinks);
rabbit.plugins.fonticon={init:function(){
if(rabbit.facade.isExport()){
return;
}
$.ajax({url:rabbit.common.baseUrl+rabbit.util.appendVersionQuery("common/stencil-icons.svg"),method:"GET",success:function(data,_239,_23a){
var body=document.body;
body.insertBefore(data.firstChild,body.firstChild);
}});
}};
rabbit.facade.registerPlugin(rabbit.plugins.fonticon);
rabbit.plugins.frame={fitScreen:true,framesLoaded:false,pageTooSmallForCustom:false,init:function(){
if(rabbit.facade.isExport()){
rabbit.parameters.showFrame=false;
$("body").addClass("no-frame");
}else{
$.ajax({url:rabbit.common.baseUrl+rabbit.util.appendVersionQuery("common/frames.svg"),method:"GET",success:function(data,_23b,_23c){
var body=document.body;
body.insertBefore(data.firstChild,body.firstChild);
this.framesLoaded=true;
this.pageLoaded(this.lastPage,this.lastRepository);
}.bind(this)});
}
rabbit.facade.registerOnEvent(rabbit.events.pageReady,this.pageReady,this);
rabbit.facade.registerOnEvent(rabbit.events.pageLoaded,this.pageLoaded,this);
this.simulationContainer=$(".simulation-container");
this.frame=this.simulationContainer[0].querySelector(".frame");
this.borderWrapper=this.simulationContainer.find(".border-wrapper");
this.simulationScaled=this.simulationContainer.find(".simulation-scaled");
var _23d=true;
if(rabbit.parameters.isApi){
_23d=false;
}else{
if(rabbit.parameters.isInvitation){
_23d=rabbit.parameters.fitScreen;
}
}
var _23e=false;
if(rabbit.parameters.isApi){
_23e=true;
}else{
if(rabbit.parameters.isAnonymous){
_23e=!rabbit.parameters.showFrame;
}
}
rabbit.facade.registerUserPref("simulationFitScreen",_23d);
rabbit.facade.registerUserPref("hidePageFrame",_23e);
},setFitScreen:function(){
rabbit.facade.setUserPref("simulationFitScreen",true);
this.pageLoaded(this.lastPage,this.lastRepository);
return false;
},setOriginalSize:function(){
rabbit.facade.setUserPref("simulationFitScreen",false);
this.pageLoaded(this.lastPage,this.lastRepository);
return false;
},hideFrame:function(){
rabbit.facade.setUserPref("hidePageFrame",true);
$("body").addClass("no-frame");
$("body").removeClass("has-frame");
this.frame.parentElement.style.display="none";
this.simulationContainer[0].style.removeProperty("height");
this.borderWrapper[0].style.removeProperty("width");
this.borderWrapper[0].style.removeProperty("height");
this.pageLoaded(this.lastPage,this.lastRepository);
},showFrame:function(){
rabbit.facade.setUserPref("hidePageFrame",false);
$("body").removeClass("no-frame");
$("body").addClass("has-frame");
this.frame.parentElement.style.display="block";
this.pageLoaded(this.lastPage,this.lastRepository);
},frameReset:function(page,_23f){
this.simulationScaled.css({transform:"scale(1)"});
this.borderWrapper[0].style.removeProperty("width");
this.borderWrapper[0].style.removeProperty("height");
},pageReady:function(page,_240){
this.lastPage=page;
this.lastRepository=_240;
this.pageLoaded(page,_240);
if(rabbit.facade.getUserPref("hidePageFrame")){
this.hideFrame();
}
setTimeout(function(){
this.frame.firstElementChild.setAttribute("xlink:href",this.frame.firstElementChild.getAttribute("xlink:href"));
}.bind(this),50);
},pageLoaded:function(page,_241,_242){
this.lastPage=page;
this.lastRepository=_241;
if(!this.framesLoaded){
return;
}
var _243=true;
if(!_242){
this.frameReset(page,_241);
_243=false;
}
var _244=page.getData().frame;
var _245=page.getData().frameOrientation;
var _246=rabbit.common.frames.none;
var _247=page.getData().width;
var _248=page.getData().height;
var _249=0;
var _24a=0;
var _24b=_244=="custom"&&(_247<rabbit.common.frames.custom.sideMinLength||_248<rabbit.common.frames.custom.sideMinLength);
if(!this.pageTooSmallForCustom&&_24b){
this.pageTooSmallForCustom=true;
this.hideFrame();
return;
}else{
if(this.pageTooSmallForCustom&&!_24b){
this.pageTooSmallForCustom=false;
this.showFrame();
return;
}
}
if(!rabbit.facade.getUserPref("hidePageFrame")){
_246=rabbit.common.frames[_244];
if(_244=="custom"){
_245="custom";
}else{
_247=_246[_245].innerWidth;
_248=_246[_245].innerHeight;
}
_249=_246[_245].frameBorderLeft;
_24a=_246[_245].frameBorderTop;
rabbit.facade.isFrameDisplayed=true;
}else{
rabbit.facade.isFrameDisplayed=false;
}
this.frame.firstElementChild.setAttribute("xlink:href","#"+_244+"-"+_245);
this.simulationScaled.css({transform:"scale(1)"});
var _24c=1;
if(rabbit.facade.getUserPref("simulationFitScreen")&&!_243&&!rabbit.facade.getUserPref("hidePageFrame")){
var _24d=30;
var _24e=_246[_245].frameBorderTop*2+_248+10;
_24c=Math.min(1,(window.innerHeight-$(".toolbar-wrapper").height()-_24d)/_24e);
}
rabbit.facade.setScaleFactor(_24c);
var _24f=(rabbit.facade.isApi()||$("body").hasClass("plain"))?0:10;
this.simulationContainer.css({width:(_249*2+_247+_24f)*_24c,height:(_24a*2+_248+_24f)*_24c});
var _250=_247;
var _251=_248;
this.borderWrapper.css("overflow","hidden");
if(!rabbit.facade.getUserPref("hidePageFrame")&&this.borderWrapper[0].scrollWidth>_250){
_251+=rabbit.util.getScrollbarWidth();
}
if(!rabbit.facade.getUserPref("hidePageFrame")&&this.borderWrapper[0].scrollHeight>_251){
_250+=rabbit.util.getScrollbarWidth();
}
this.borderWrapper.css({left:_249,top:_24a,width:_250,height:_251,overflow:"auto"});
this.simulationScaled.css({transform:"scale("+_24c+")"});
$("[data-apply-scale-factor]").css({transform:"scale("+_24c+")"});
if(_244=="custom"){
rabbit.common.frames.adjusteCustomFrame(_247,_248);
}
}};
rabbit.facade.registerPlugin(rabbit.plugins.frame);
rabbit.plugins.prototypeAlignment={init:function(){
this.body=$("body");
rabbit.facade.registerUserPref("simulationAlignment","center");
var _252=rabbit.facade.getUserPref("simulationAlignment");
if(_252&&rabbit.plugins.prototypeAlignment[_252]&&!rabbit.facade.isPhantomJS()){
rabbit.plugins.prototypeAlignment[_252]();
}
},left:function(){
rabbit.facade.setUserPref("simulationAlignment","left");
this.reset();
this.body.addClass("prototype-align-left");
},center:function(){
rabbit.facade.setUserPref("simulationAlignment","center");
this.reset();
this.body.addClass("prototype-align-centered");
},right:function(){
rabbit.facade.setUserPref("simulationAlignment","right");
this.reset();
this.body.addClass("prototype-align-right");
},reset:function(){
this.body.removeClass("prototype-align-right");
this.body.removeClass("prototype-align-centered");
this.body.removeClass("prototype-align-left");
}};
rabbit.facade.registerPlugin(rabbit.plugins.prototypeAlignment);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.autocomplete=(function(){
return {init:function init(){
},setupAutocomplete:function setupAutocomplete(id,_253){
_253=_253.split("|c");
var oDS=new YAHOO.util.LocalDataSource(_253);
oDS.responseSchema={fields:["state"]};
var oAC=new YAHOO.widget.AutoComplete(id+"-input",id+"-con",oDS);
oAC.prehighlightClassName="yui-ac-prehighlight";
oAC.useShadow=false;
$("#"+id+"-input").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.autocomplete);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.textinput=(function(){
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.layerStoreInserted,this.layerStoreInsertedListener,this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,this.pageReadyListener,this);
},layerStoreInsertedListener:function(_254){
$(_254).find(".stencil.textinput").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
},pageReadyListener:function(){
$(".stencil.textinput").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.textinput);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.combobox=(function(){
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.layerStoreInserted,this.layerStoreInsertedListener,this);
rabbit.facade.registerOnEvent(rabbit.events.pageReady,this.pageReadyListener,this);
},layerStoreInsertedListener:function(_255){
$(_255).find(".stencil.combobox").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
},pageReadyListener:function(){
$(".stencil.combobox").click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
});
}};
})();
rabbit.facade.registerPlugin(rabbit.stencils.combobox);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.accordion=function(){
var _256=600;
var _257=".accordion-header";
var _258=".accordion-content";
var _259="accordion-active";
var _25a=30;
var _25b=function(_25c){
var _25d=$(_25c).parents().children(_257);
var _25e=_25d.index(_25c);
return _25e;
};
var _25f=function(_260){
return $(_260).parent().parent().parent().attr("id");
};
var _261=function(_262){
return $("#"+_262).find(_257).length;
};
var _263=function(_264,_265,_266){
var _267=$("#"+_264+">div>"+_257).length;
$("#"+_264).find(_258+">div, "+_258+">iframe").css("position","relative").css("left","0px").css("top","0px").css("width",_265+"px").css("height",(_266-_267*_25a-2)+"px");
};
return {_accordions:{},init:function init(){
},setupAccordion:function(id,_268,_269,_26a){
var _26b=_261(id);
if(_26a<1){
_26a=1;
}
if(_26a>_26b){
_26a=_26b;
}
_26a--;
$("#"+id).find(_257).click({"accordionObject":this},this.raiseClickCallback);
_263(id,_268,_269);
this.showTab(id,_26a,false);
},showTab:function(id,_26c,_26d){
this._accordions[id]=_26c;
if(_26d){
$("#"+id).find(_258).slideUp(_256);
}else{
$("#"+id).find(_258).hide();
}
var _26e=$("#"+id).find(_257).removeClass(_259)[_26c];
$(_26e).addClass(_259).next().slideDown(_256,function onCompleteCallback(){
if(BrowserDetect.browser=="MSIE"){
$(this).css("width",$(this).css("width"));
}
});
},raiseClickCallback:function(evt){
evt.data.accordionObject.clickCallback(evt.data.accordionObject,this);
},clickCallback:function(that,_26f){
var _270=_25b(_26f);
var _271=_25f(_26f);
if(that._accordions[_271]===_270){
return;
}
rabbit.facade.markHighlightTouchesAsSuccessful();
that.showTab(_271,_270,true);
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.accordion);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.button=function(){
var _272=rabbit.facade;
return {init:function init(){
_272.registerOnEvent(rabbit.events.buttonMouseOver,this.onMouseOver,this);
_272.registerOnEvent(rabbit.events.buttonMouseOut,this.onMouseOut,this);
},onMouseOver:function onMouseOver(id){
document.getElementById(id).className="ClickableSketchHover";
},onMouseOut:function onMouseOut(id){
document.getElementById(id).className="ClickableSketch";
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.button);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.checkBox=function(){
var _273=rabbit.facade;
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.checkBoxClicked,this.onClick,this);
},onClick:function onClick(_274,_275){
rabbit.facade.markHighlightTouchesAsSuccessful();
console.log("Click to checkbox "+_274);
var _276=document.getElementById(_274);
if(_276==null){
return true;
}
var _277=document.getElementById(_275);
if(_277==null){
return true;
}
if(!_276.checked){
_277.setAttribute("visibility","hidden");
}else{
_277.setAttribute("visibility","inherit");
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.checkBox);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.datepicker=function(){
var _278=rabbit.facade;
var _279=[];
var _27a=false;
var _27b=null;
var _27c=function(id){
for(var i=0;i<_279.length;i++){
var _27d=_279[i];
if(_27d.calendarId==id){
return _27d;
}
}
return null;
};
var _27e=function(id,year,_27f){
var _280=_27c(id);
_280.calendar.setYear(year);
_280.calendar.setMonth(_27f);
_280.calendar.render();
};
var _281=function _hideCalendar(id,_282,_283){
if(_282){
document.getElementById(id+"_input").value=_282;
}
var _284=_27c(id);
_284.calendarVisible=false;
var svg=document.getElementById(_284.calendarId+"_open_calendar");
if(svg){
svg.style.display="none";
}
_284.calendar.hide();
_284.overlay.hide();
_27a=false;
$("html").unbind("click",_27b);
};
var _285=function _showCalendar(id,_286){
var _287=_27c(id);
_287.calendarVisible=true;
_287.calendar.show();
_287.overlay.show();
_27a=true;
var svg=document.getElementById(_287.calendarId+"_open_calendar");
if(svg){
svg.style.display="block";
}
_27b=function(e){
if(!rabbit.util.isElementChildOfSelector(e.target,"#"+id)){
_281(id);
}
};
$("html").bind("click",_27b);
};
var _288=function _288(_289){
for(var i=0;i<_289.childNodes.length;i++){
var _28a=_289.childNodes[i];
if(_28a.nodeType!=1){
continue;
}
if(_28a.getAttribute("id")==undefined){
_28a.setAttribute("id",_289.getAttribute("id")+"_"+i);
}
arguments.callee(_28a);
}
};
var _28b=function _28b(evt){
if(!evt){
return;
}
if(!_278.vml){
evt.stopPropagation();
}else{
evt.cancelBubble=true;
}
};
return {init:function init(){
_278.registerOnEvent(rabbit.events.click,this.hideDatePickerOnClick,this);
rabbit.facade.registerOnEvent(rabbit.events.showDatepicker,_285,this);
rabbit.facade.registerOnEvent(rabbit.events.hideDatepicker,_281,this);
rabbit.facade.registerOnEvent(rabbit.events.changeDatepickerPage,_27e,this);
},calendarOpen:function(id){
return _27a;
}(),setupDatepicker:function setupDatepicker(id){
try{
var _28c=new YAHOO.widget.Overlay(id+"_ov",{zIndex:9990,width:"200px",height:"200px",context:[id+"_input","tl","bl"]});
_28c.render();
if(rabbit.result.lang=="de"){
var cal=new YAHOO.widget.Calendar(id+"_cal",{START_WEEKDAY:1});
cal.cfg.setProperty("DATE_FIELD_DELIMITER",".");
cal.cfg.setProperty("MDY_DAY_POSITION",1);
cal.cfg.setProperty("MDY_MONTH_POSITION",2);
cal.cfg.setProperty("MDY_YEAR_POSITION",3);
cal.cfg.setProperty("MD_DAY_POSITION",1);
cal.cfg.setProperty("MD_MONTH_POSITION",2);
cal.cfg.setProperty("MONTHS_SHORT",["Jan","Feb","MŠr","Apr","Mai","Jun","Jul","Aug","Sep","Okt","Nov","Dez"]);
cal.cfg.setProperty("MONTHS_LONG",["Januar","Februar","MŠrz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"]);
cal.cfg.setProperty("WEEKDAYS_1CHAR",["S","M","D","M","D","F","S"]);
cal.cfg.setProperty("WEEKDAYS_SHORT",["So","Mo","Di","Mi","Do","Fr","Sa"]);
cal.cfg.setProperty("WEEKDAYS_MEDIUM",["Son","Mon","Die","Mit","Don","Fre","Sam"]);
cal.cfg.setProperty("WEEKDAYS_LONG",["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"]);
}else{
var cal=new YAHOO.widget.Calendar(id+"_cal");
}
var _28d=new Object();
_28d["calendar"]=cal;
_28d.overlay=_28c;
_28d["calendarId"]=id;
_28d["calendarVisible"]=false;
_279.push(_28d);
cal.selectEvent.subscribe(rabbit.util.bind(function(evt,d){
var _28e=this.formatIsoDate(d[0][0][0],d[0][0][1],d[0][0][2]);
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_28d.calendarId,_28e,rabbit.util.userRole,"displayMouseClick");
},this),cal,true);
cal.render();
cal.hide();
_28c.hide();
var _28f=id+"_cal";
_288(document.getElementById(id+"_cal"));
cal.changePageEvent.subscribe(rabbit.util.bind(function(evt,d){
var date=cal.cfg.getProperty("pagedate");
var year=date.getUTCFullYear();
var _290=date.getMonth();
rabbit.facade.raiseEvent(rabbit.events.changeDatepickerPage,_28d.calendarId,year,_290,rabbit.util.userRole,"displayMouseClick");
_288(document.getElementById(_28f));
},this),cal,true);
YAHOO.util.Event.addListener(id+"_button","click",rabbit.util.bind(this.toggleCalendarCallback,this),_28d);
YAHOO.util.Event.addListener(id+"_input","focus",rabbit.util.bind(this.toggleCalendarCallback,this),_28d);
YAHOO.util.Event.addListener(id+"_ov","click",_28b);
}
catch(e){
console.error("Error setting up datepicker");
console.error(e);
}
},hideDatePickerOnClick:function hideDatePickerOnClick(e){
rabbit.facade.markHighlightTouchesAsSuccessful();
if(this.calendarOpen){
for(var i=0;i<_279.length;i++){
var _291=_279[i];
if(_291.calendarVisible){
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_291.calendarId,null,rabbit.util.userRole,"displayMouseClick");
}
}
}
},toggleCalendarCallback:function toggleCalendarCallback(evt,_292){
if(!_292.calendarVisible){
rabbit.facade.raiseEvent(rabbit.events.showDatepicker,_292.calendarId,rabbit.util.userRole,"displayMouseClick");
this.calendarOpen=true;
}else{
rabbit.facade.raiseEvent(rabbit.events.hideDatepicker,_292.calendarId,null,rabbit.util.userRole,"displayMouseClick");
this.calendarOpen=false;
}
_28b(evt);
},formatIsoDate:function formatIsoDate(y,m,d){
return y.toString()+(m<10?"-0":"-")+m.toString()+(d<10?"-0":"-")+d.toString();
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.datepicker);
rabbit.stencils.menu=function(){
var _293=[];
var _294=function(_295){
for(var i=0;i<_293.length;i++){
var menu=_293[i];
if(menu.domId==_295){
return menu;
}
}
return null;
};
var _296=function(_297,_298){
var menu=_294(_297);
if(menu){
for(var i=0;i<_298.length;i++){
var _299=menu.getSubmenus();
for(var j=0;j<_299.length;j++){
if(_299[j].id==_298[i]){
menu=_299[j];
}
}
}
}
return menu;
};
var _29a=function(_29b,_29c,_29d){
if(_29d&&_29d!=rabbit.util.userRole){
var _29e=_296(_29b,_29c);
if(_29e){
_29e.show();
}
}
};
var _29f=function(_2a0,_2a1,_2a2){
if(_2a2&&_2a2!=rabbit.util.userRole){
var _2a3=_296(_2a0,_2a1);
if(_2a3){
_2a3.hide();
}
}
};
var _2a4=function(obj){
var menu=obj;
var _2a5=[];
while(menu.getRoot()!=menu){
_2a5.push(menu.id);
menu=menu.getRoot();
}
var _2a6=menu.domId;
var _2a7=[];
for(var i=_2a5.length-1;i>=0;i--){
_2a7.push(_2a5[i]);
}
return [_2a6,_2a7];
};
var _2a8=function(_2a9){
var top=23;
if(rabbit.facade.isSketched()){
top=18;
}
$(_2a9.element).css({left:_2a9.parent.position().left,top:top});
};
var _2aa=function(_2ab){
var _2ac=-4;
var _2ad=$(_2ab.parent.element);
$(_2ab.element).css({left:_2ad.width()+1/rabbit.facade.getScaleFactor(),top:_2ad.position().top/rabbit.facade.getScaleFactor()+_2ac});
};
var _2ae=function(){
var _2af=$(this.element.parentNode).hasClass("yuimenubaritem");
if(_2af){
_2a8(this);
}else{
_2aa(this);
}
var _2b0=_2a4(this);
rabbit.facade.raiseEvent(rabbit.events.subMenuShow,_2b0[0],_2b0[1],rabbit.util.userRole);
};
var _2b1=function(){
var _2b2=_2a4(this);
rabbit.facade.raiseEvent(rabbit.events.subMenuHide,_2b2[0],_2b2[1],rabbit.util.userRole);
};
return {init:function(){
rabbit.facade.registerOnEvent(rabbit.events.subMenuShow,_29a,this);
rabbit.facade.registerOnEvent(rabbit.events.subMenuHide,_29f,this);
},convertMethodIntoFunction:function(_2b3){
for(var i=0;i<_2b3.length;i++){
var _2b4=_2b3[i].onclick;
if(_2b4&&_2b4.fn!=="undefined"){
_2b4.fn=eval(_2b4.fn);
}
if(_2b3[i].submenu){
var _2b5=_2b3[i].submenu.itemdata;
this.convertMethodIntoFunction(_2b5);
}
}
},setupMenu:function setupMenu(id,_2b6,_2b7){
try{
_2b6=_2b6.replace(/:rabbit.result.manager.menuClick,/g,":\"rabbit.result.manager.menuClick\",");
_2b6=JSON.parse(_2b6);
this.convertMethodIntoFunction(_2b6);
var _2b8;
if(_2b7=="vertical"){
_2b8=new YAHOO.widget.Menu(id+"-bar",{itemdata:_2b6,visible:true,position:"static",hidedelay:750,lazyload:true});
}else{
_2b8=new YAHOO.widget.MenuBar(id+"-bar",{lazyload:true,autosubmenudisplay:true,showdelay:10,itemdata:_2b6});
}
_2b8.render(id+"-menu-container");
_2b8.show();
_2b8.domId=id;
_293.push(_2b8);
_2b8.subscribe("show",_2ae);
_2b8.subscribe("hide",_2b1);
}
catch(e){
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.menu);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.radioButton=function(){
var _2b9=rabbit.facade;
return {init:function init(){
_2b9.registerOnEvent(rabbit.events.radioButtonClicked,this.onClick,this);
$(".radiobutton input:checked").each(function(){
var name=$(this).attr("name");
$("input[name=\""+name+"\"]").data("old-selected-radiobutton-id",$(this).attr("value"));
});
},getAllRadioButtons:function getAllRadioButtons(){
var _2ba=[];
var _2bb=document.getElementsByTagName("input");
for(var i=0;i<_2bb.length;i++){
if(_2bb[i].type==="radio"){
_2ba.push(_2bb[i]);
}
}
return _2ba;
},onClick:function onClick(_2bc,_2bd){
rabbit.facade.markHighlightTouchesAsSuccessful();
console.log("Click to radioButton "+_2bc);
var _2be=this.getAllRadioButtons();
for(var i=0;i<_2be.length;i++){
var _2bf=_2be[i];
var _2c0=_2bf.getAttribute("id")+"_svgChecked";
var _2c1=document.getElementById(_2c0);
if(_2c1!=null){
if(!_2bf.checked){
if(rabbit.facade.vml){
_2c1.style.setAttribute("display","none");
}else{
_2c1.setAttribute("visibility","hidden");
}
}else{
if(rabbit.facade.vml){
_2c1.style.removeAttribute("display");
}else{
_2c1.setAttribute("visibility","inherit");
}
}
}
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.radioButton);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.slider=function(){
var _2c2={};
var _2c3=function(_2c4,_2c5,_2c6){
var _2c7=_2c2[_2c4];
if(!_2c7){
return;
}
if(_2c6!=null&&_2c6!=rabbit.util.userRole){
console.log("_sliderChangedCallback "+_2c5);
_2c7.setValue(_2c5);
}
};
return {init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.sliderChangedEvent,_2c3,this);
},setupSlider:function(id,_2c8,_2c9,_2ca,_2cb){
try{
_2c8=parseInt(_2c8);
_2ca=parseInt(_2ca);
if(_2cb){
_2cb=parseInt(_2cb)*2;
}else{
_2cb=0;
}
var _2cc=(_2ca-(_2ca)/21)/10;
var _2cd=_2cc*_2c8;
var _2ce=_2ca-_2cd;
var _2cf=null;
if(_2c9=="vertical"){
_2cf=YAHOO.widget.Slider.getVertSlider(id,id+"_thumb_vert",_2ce,_2cd,_2cc);
}else{
_2cf=YAHOO.widget.Slider.getHorizSlider(id,id+"_thumb_horiz",_2ce,_2cd,_2cc);
}
_2c2[id]=_2cf;
_2cf.animate=false;
_2cf.subscribe("change",function(){
var _2d0=Math.round(this.getValue()+_2cb);
rabbit.facade.raiseEvent(rabbit.events.sliderChangedEvent,id,_2d0,rabbit.util.userRole);
});
}
catch(e){
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.slider);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.stencil=function(){
var _2d1=rabbit.facade;
var _2d2=function _2d2(_2d3,_2d4){
var node=document.getElementById(_2d3);
if(node){
node.style.setProperty("fill",_2d4,"");
}
};
var _2d5=function _2d5(_2d6,_2d7){
var _2d8,node=document.getElementById(_2d6);
if(node){
if(_2d7=="url(#sketchedHover)"){
_2d8=node.ownerDocument.createElement("v:fill");
_2d8.setAttribute("src",rabbit.common.baseUrl+"result/icons/sketchedFilledButton.png");
_2d8.setAttribute("type","tile");
_2d8.setAttribute("origin","0.1,0.1");
_2d8.setAttribute("size","175pt,75pt");
_2d8.setAttribute("on","true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_2d8,node.getElementsByTagName("fill")[0]);
}else{
_2d8=node.ownerDocument.createElement("v:fill");
_2d8.setAttribute("color",_2d7);
_2d8.setAttribute("on"," true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_2d8,node.getElementsByTagName("fill")[0]);
}
}
};
return {init:function init(){
_2d1.registerOnEvent(rabbit.events.svgFocus,this.onSvgFocus,this);
_2d1.registerOnEvent(rabbit.events.svgBlur,this.onSvgBlur,this);
_2d1.registerOnEvent(rabbit.events.propertyChange,this.onPropertyChanged,this);
},setFill:function setFill(id,_2d9){
if(rabbit.facade.vml){
_2d5(id,_2d9);
}else{
_2d2(id,_2d9);
}
},onSvgFocus:function onSvgFocus(_2da){
var _2db;
if(_2da instanceof Array){
for(var key in _2da){
_2db=document.getElementById(_2da[key]);
if(_2db!=null){
_2db.setAttribute("class","svg_selected_element");
}
}
}else{
_2db=document.getElementById(_2da);
if(_2db!=null){
_2db.setAttribute("class","svg_selected_element");
}
}
},onSvgBlur:function onSvgBlur(_2dc){
var _2dd;
if(_2dc instanceof Array){
for(var key in _2dc){
_2dd=document.getElementById(_2dc[key]);
if(_2dd!=null){
_2dd.setAttribute("class","svg_unselected_element");
}
}
}else{
_2dd=document.getElementById(_2dc);
if(_2dd!=null){
_2dd.setAttribute("class","svg_unselected_element");
}
}
},onPropertyChanged:function onPropertyChanged(_2de,_2df){
var _2e0=document.getElementById(_2df);
if(_2e0==null){
return true;
}
console.debug("Property changed on "+_2de);
if(event.srcElement[event.propertyName]==false){
_2e0.style.setAttribute("display","none");
}else{
_2e0.style.removeAttribute("display");
}
return true;
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.stencil);
rabbit.stencils.tabButton=function(){
var _2e1=rabbit.facade;
var _2e2=function _2e2(_2e3,_2e4){
var node=document.getElementById(_2e3);
if(node){
node.style.setProperty("fill",_2e4,"");
}
};
var _2e5=function _2e5(_2e6,_2e7){
var _2e8,node=document.getElementById(_2e6);
if(node){
if(_2e7=="url(#sketchedHover)"){
_2e8=node.ownerDocument.createElement("v:fill");
_2e8.setAttribute("src",rabbit.common.baseUrl+"result/icons/sketchedFilledButton.png");
_2e8.setAttribute("type","tile");
_2e8.setAttribute("origin","0.1,0.1");
_2e8.setAttribute("size","175pt,75pt");
_2e8.setAttribute("on","true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_2e8,node.getElementsByTagName("fill")[0]);
}else{
_2e8=node.ownerDocument.createElement("v:fill");
_2e8.setAttribute("color",_2e7);
_2e8.setAttribute("on"," true");
node.getElementsByTagName("fill")[0].parentNode.replaceChild(_2e8,node.getElementsByTagName("fill")[0]);
}
}
};
return {init:function init(){
_2e1.registerOnEvent(rabbit.events.tabButtonMouseOver,this.handleMouseOver,this);
_2e1.registerOnEvent(rabbit.events.tabButtonMouseOut,this.handleMouseOut,this);
_2e1.registerOnEvent(rabbit.events.pageLoaded,this.changeTab,this);
_2e1.registerOnEvent(rabbit.events.pageReady,this.changeTab,this);
this.oldPageId=null;
},changeTab:function(page,_2e9){
var _2ea="";
if(page){
_2ea=page.data.id;
}
if(this.oldPageId===null){
_2ea=_2e1.getCurrentPageId();
}
var _2eb=selectorUtil.getElementsByName("target"+this.oldPageId);
for(var i=0;i<_2eb.length;i++){
rabbit.util.removeClass(_2eb[i],"selected");
}
var _2eb=selectorUtil.getElementsByName("target"+_2ea);
for(var i=0;i<_2eb.length;i++){
rabbit.util.addClass(_2eb[i],"selected");
}
this.oldPageId=_2e1.getCurrentPageId();
},handleMouseOver:function handleMouseOut(id,mode){
if(typeof id!=="string"||(mode!=="result"&&mode!=="sketched")){
console.error("Updating tabButton "+id+" failed.");
return;
}
try{
if(mode==="sketched"){
rabbit.util.addClass(id+"_div_small","ClickableSketchHover");
rabbit.util.addClass(id+"_div_big","ClickableSketchHover");
}else{
if(rabbit.vml){
_2e5(id+"_big_path","#EEEEEE");
_2e5(id+"_small_path","#EEEEEE");
}else{
_2e2(id+"_big_path","#EEEEEE");
_2e2(id+"_small_path","#EEEEEE");
}
}
}
catch(e){
console.error("Updating tabButton "+id+" failed.");
console.error(e);
}
},handleMouseOut:function handleMouseOut(id,mode){
if(typeof id!=="string"||(mode!=="result"&&mode!=="sketched")){
console.error("Updating tabButton "+id+" failed.");
return;
}
try{
if(mode==="sketched"){
_setClass(id+"_div_small","ClickableSketch");
_setClass(id+"_div_big","ClickableSketch");
}else{
if(rabbit.vml){
_2e5(id+"_big_path","white");
_2e5(id+"_small_path","white");
}else{
_2e2(id+"_big_path","white");
_2e2(id+"_small_path","white");
}
}
}
catch(e){
console.error("Updating tabButton "+id+" failed.");
console.error(e);
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.tabButton);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.togglesection=function(){
var _2ec=0;
var _2ed=".togglesection-header";
var _2ee=".togglesection-content";
var _2ef="content";
var _2f0="#borderDiv";
var _2f1="open";
var _2f2=rabbit.facade;
var _2f3=function(_2f4,_2f5){
$("#"+_2f4+_2ef).find(".iframe").css("width",_2f5+"px");
};
return {togglers:{},init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.pageLoaded,this.pageLoaded,this);
rabbit.facade.registerOnEvent(rabbit.events.toggleToggleSection,this.toggle,this);
},setupToggler:function(id,_2f6,_2f7){
this.togglers[id]={id:id,page:_2f6};
$("#"+id).find(_2ed).click(function(){
rabbit.facade.markHighlightTouchesAsSuccessful();
rabbit.facade.raiseEvent(rabbit.events.toggleToggleSection,id);
});
$(_2f0).append($("#"+id).find(_2ee));
},pageLoaded:function(_2f8){
for(var _2f9 in this.togglers){
$("#"+this.togglers[_2f9].id+_2ef).hide();
}
},toggle:function(_2fa){
var _2fb=$("#"+_2fa+">div").data("iframe-url");
var page=rabbit.data.pageStore.objects[_2fb];
$("#"+_2fa+_2ef).slideToggle(_2ec,function(){
$("#"+_2fa).toggleClass(_2f1);
});
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.togglesection);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.iphoneSwitch=function(){
var _2fc=rabbit.facade;
return {init:function init(){
_2fc.registerOnEvent(rabbit.events.iphoneSwitchClicked,this.onClick,this);
},onClick:function onClick(id){
rabbit.facade.markHighlightTouchesAsSuccessful();
var _2fd=$("#"+id+" > div");
var _2fe=rabbit.events.switchOffSwitch;
_2fd.toggleClass("switch-selected");
if(_2fd.hasClass("switch-selected")){
_2fe=rabbit.events.switchOnSwitch;
}
_2fc.raiseEvent(_2fe,id);
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.iphoneSwitch);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.rating=function(){
var _2ff="rating_white.png";
var _300="rating_black.png";
var _301=rabbit.facade;
var _302=new Array();
var _303=function(id){
if(_302[id]){
return parseInt(_302[id]);
}
return 0;
};
var _304=function(id,_305){
_302[id]=_305;
};
var _306=function(id,_307){
var i=1;
_307=parseInt(_307);
while(true){
var _308=document.getElementById(id+"-"+i);
if(_308==null){
break;
}
var _309=_308.getAttribute("src");
_309=_309.substring(0,_309.lastIndexOf("/")+1);
if(i>=_307+1){
_309+=_2ff;
}else{
_309+=_300;
}
_308.setAttribute("src",_309);
i++;
}
};
return {init:function init(){
_301.registerOnEvent(rabbit.events.ratingResultChangedEvent,this.onClick,this);
_301.registerOnEvent(rabbit.events.ratingMouseOut,this.onMouseOut,this);
_301.registerOnEvent(rabbit.events.ratingMouseOver,this.onMouseOver,this);
},onLoad:function onLoad(id,_30a){
_304(id,_30a);
},onClick:function onClick(id,_30b){
rabbit.facade.markHighlightTouchesAsSuccessful();
_304(id,_30b);
_306(id,_30b);
},onMouseOut:function onMouseOut(id){
_306(id,_303(id));
},onMouseOver:function onMouseOver(id,_30c){
_306(id,parseInt(_30c));
},checkMouseOutDiv:function(id,_30d){
if(_30d.relatedTarget){
return _30d.relatedTarget.id.indexOf(id)==-1;
}else{
return _30d.toElement.id.indexOf(id)==-1;
}
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.rating);
if(!rabbit.stencils){
rabbit.stencils={};
}
rabbit.stencils.tree=function(){
var _30e=20;
return {_trees:{},init:function init(){
rabbit.facade.registerOnEvent(rabbit.events.treeViewNodeClicked,this.clickCallback,this);
rabbit.facade.registerOnEvent(rabbit.events.treeViewScrolled,this.scrollCallback,this);
},setupTree:function setupMenu(id,_30f){
try{
_30f=_30f.replace(/&quot;/g,"\"");
_30f=JSON.parse(_30f);
this._trees[id]=_30f;
}
catch(e){
console.error(e);
}
},clickCallback:function(_310,sth){
var _311=document.getElementById(_310+"-buttonvline");
var _312="open";
if(_311){
if(_311.style.display=="none"){
_312="closed";
}
if(_312=="closed"){
_311.style.display="";
}else{
_311.style.display="none";
}
var elem=document.getElementById(_310+"-treeviewnodeid");
if(elem&&elem.nextSibling){
if(_312=="closed"){
elem.nextSibling.style.display="none";
}else{
elem.nextSibling.style.display="";
}
this.update(_310,_312);
}
}
},scrollCallback:function(id,_313,_314){
var _315=document.getElementById(id);
_315.scrollTop=_313;
_315.scrollLeft=_314;
},update:function(_316,_317){
this.setStatus(_316,_317);
this.recalculateLineLengths(_316);
},setStatus:function(_318,_319){
var tree=this.getTree(_318);
if(tree){
this.setStatusOnSubtree(this.getTreeName(_318),tree,_318,_319);
}
},setStatusOnSubtree:function(_31a,tree,_31b,_31c){
if(tree){
for(var i=0;i<tree.length;i++){
var node=tree[i];
var _31d=_31a+"-"+i;
if(_31d==_31b){
node.treeItemType=(_31c=="closed"?"-":"+");
return true;
}
if(node.subtree){
if(this.setStatusOnSubtree(_31d,node.subtree,_31b,_31c)){
return true;
}
}
}
}
},recalculateLineLengths:function(_31e){
var tree=this.getTree(_31e);
if(tree){
var _31f=this.getTreeName(_31e);
var _320=document.getElementById(_31f+"-openingvline");
this.traverseTree(_31f,_320,tree,null);
}
},traverseTree:function(_321,node,_322,_323){
var _324=false;
if(_323===null){
_323={0:0,1:0};
_324=true;
}
var rows=0;
var _325=0;
var _326=0;
var _327=0;
_323[0]=0;
_323[1]=0;
if(!_324){
rows++;
}
if(_322){
for(var i=0;i<_322.length;i++){
var _328=_322[i];
var _329=null;
if(_328.subtree){
_329=_328.subtree;
}
this.traverseTree(_321+"-"+i,_328,_329,_323);
_326=_325+1;
_325=_325+_323[0];
_327=_327+_323[1];
}
}
var _32a=null;
if(_324){
_32a=node;
}else{
_32a=document.getElementById(_321+"-openingvline");
}
if(_32a){
var _32b=_32a.parentNode;
_32b.style.height=""+(_30e*_325)+"px";
var _32c=(_326-_327)*_30e;
_32a.style.top=""+_32c+"px";
}else{
}
if(_324||"+"==node.treeItemType){
_323[0]=rows+_325;
}else{
_323[0]=rows;
}
_323[1]=rows+_327;
},getTree:function(_32d){
if(_32d){
var _32e=this.getTreeName(_32d);
if(this._trees[_32e]){
return this._trees[_32e];
}else{
return null;
}
}
},getTreeName:function(_32f){
return _32f.substring(0,_32f.indexOf("-"));
}};
}();
rabbit.facade.registerPlugin(rabbit.stencils.tree);
rabbit.common={baseUrl:"/rabbit/"};
if(rabbit.common==undefined){
rabbit.common={};
}
rabbit.common.i18n={translation:{},init:function(_330){
this.lang=_330.lang;
if((!this.lang)||(!this.translation[this.lang])){
this.lang="en";
}
},t:function(key,_331){
if(_331){
var _332=key.toLowerCase();
_332=_332.replace(/ /g,"-");
_332=_331+"."+_332;
}else{
var _332=key;
}
var lang=rabbit.common.i18n.lang;
if(!rabbit.common.i18n.translation[lang]){
console.log("no lang found for",key);
lang="en";
}
if(!rabbit.common.i18n.translation[lang]){
console.log("no lang found for",key);
return key;
}
var _333=rabbit.common.i18n.translation[lang][_332];
if(_333!==undefined){
return _333;
}
return key;
},tReverse:function(_334){
for(var lang in rabbit.common.i18n.translation){
for(var _335 in rabbit.common.i18n.translation[lang]){
var _336=rabbit.common.i18n.translation[lang][_335];
if(_336==_334){
return _335;
}
}
}
return null;
},tr:function(key,_337){
var _338=this.t(key);
for(var k in _337){
_338=_338.replace(k,_337[k]);
}
return _338;
},translation:{}};
var t=rabbit.common.i18n.t;
var tr=rabbit.common.i18n.tr;
if(rabbit.common===undefined){
rabbit.common={};
}
rabbit.common.frames={none:{frameBorderLeft:10,frameBorderTop:10},custom:{sideMinLength:50,custom:{frameBorderLeft:56.3,frameBorderTop:56.3}},smartphone:{name:t("plugins.frames.smartphone.name"),key:"smartphone",landscape:{frameBorderLeft:124,frameBorderTop:31,innerWidth:640,innerHeight:360},portrait:{frameBorderLeft:38,frameBorderTop:124,innerWidth:360,innerHeight:640}},android7:{name:t("plugins.frames.android7.name"),key:"android7",landscape:{frameBorderLeft:139,frameBorderTop:59,innerWidth:1024,innerHeight:600},portrait:{frameBorderLeft:58,frameBorderTop:138,innerWidth:600,innerHeight:1024}},ipad:{name:t("plugins.frames.ipad.name"),key:"ipad",landscape:{frameBorderLeft:148,frameBorderTop:59,innerWidth:1024,innerHeight:768},portrait:{frameBorderLeft:56,frameBorderTop:148,innerWidth:768,innerHeight:1024}},android10:{name:t("plugins.frames.android10.name"),key:"android10",landscape:{frameBorderLeft:169,frameBorderTop:46,innerWidth:1280,innerHeight:800},portrait:{frameBorderLeft:46,frameBorderTop:168,innerWidth:800,innerHeight:1280}},browser:{name:t("plugins.frames.browser.name"),key:"browser",landscape:{frameBorderLeft:18,frameBorderTop:52,innerWidth:1366,innerHeight:660}},desktop:{name:t("plugins.frames.desktop.name"),key:"desktop",landscape:{frameBorderLeft:57,frameBorderTop:68,innerWidth:1366,innerHeight:768}},getFirstMatchedFrame:function(_339,_33a){
if(_339||_33a){
for(var _33b in this){
if(this[_33b].landscape&&this[_33b].landscape.innerWidth==_339&&this[_33b].landscape.innerHeight==_33a){
return {frame:_33b,orientation:"landscape"};
}else{
if(this[_33b].portrait&&this[_33b].portrait.innerWidth==_339&&this[_33b].portrait.innerHeight==_33a){
return {frame:_33b,orientation:"portrait"};
}
}
}
}
return {frame:"custom",orientation:"custom"};
},adjusteCustomFrame:function(_33c,_33d){
var _33e=56.3;
var _33f=103;
var _340=9;
document.querySelector(".corner-top-right").setAttribute("transform","translate("+(_33c+_340)+", 0)");
document.querySelector(".corner-bottom-left").setAttribute("transform","translate(0, "+(_33d+_340)+")");
document.querySelector(".corner-bottom-right").setAttribute("transform","translate("+(_33c+_340)+", "+(_33d+_340)+")");
document.querySelector(".side-left").setAttribute("width",Math.max(_33e,0));
document.querySelector(".side-left").setAttribute("height",Math.max(_33d-_33f+_340,0));
document.querySelector(".side-left").setAttribute("transform","translate(0, "+_33f+")");
document.querySelector(".side-top").setAttribute("width",Math.max(_33c-_33f+_340,0));
document.querySelector(".side-top").setAttribute("height",Math.max(_33e,0));
document.querySelector(".side-top").setAttribute("transform","translate("+_33f+", 0)");
document.querySelector(".side-right").setAttribute("width",Math.max(_33e,0));
document.querySelector(".side-right").setAttribute("height",Math.max(_33d-_33f+_340,0));
document.querySelector(".side-right").setAttribute("transform","translate("+(_33c+_33e-0.4)+", "+_33f+")");
document.querySelector(".side-bottom").setAttribute("width",Math.max(_33c-_33f+_340,0));
document.querySelector(".side-bottom").setAttribute("height",Math.max(_33e,0));
document.querySelector(".side-bottom").setAttribute("transform","translate("+_33f+", "+(_33d+_33e-0.4)+")");
}};
if(!rabbit.common){
rabbit.common={};
}
if(!rabbit.common.prefsManager){
rabbit.common.prefsManager={};
}
rabbit.common.prefsManager={userDefaults:{},prototypeDefaults:{},init:function(){
this.doNotUseLocalStorage=rabbit.parameters.isApi||rabbit.parameters.isAnonymous;
},registerUserPref:function(key,_341){
this.userDefaults[key]=_341;
},setUserPref:function(key,_342){
if(rabbit.parameters.userPrefs[key]!=_342){
rabbit.parameters.userPrefs[key]=_342;
if(!this.doNotUseLocalStorage){
localStorage.setItem(key,JSON.stringify(_342));
}
if(!rabbit.parameters.isAnonymous){
var data=JSON.stringify(rabbit.parameters.userPrefs);
rabbit.facade.sendMessage("repository/userprefs/update","prefs="+data,function(){
});
}
}
},getUserPref:function(key){
var _343=rabbit.parameters.userPrefs[key];
if(!this.doNotUseLocalStorage&&(_343===undefined||_343===null)){
_343=JSON.parse(localStorage.getItem(key));
if(_343!==undefined||_343!==null){
this.setUserPref(key,_343);
}
}
if(_343===undefined||_343===null){
this.setUserPref(key,this.userDefaults[key]);
}
return rabbit.parameters.userPrefs[key];
},registerPrototypePref:function(key,_344){
this.prototypeDefaults[key]=_344;
},setPrototypePref:function(key,_345){
if(rabbit.parameters.prototypePrefs[key]!=_345){
rabbit.parameters.prototypePrefs[key]=_345;
var data=JSON.stringify(rabbit.parameters.prototypePrefs);
rabbit.facade.sendMessage("repository/prototype/%prototype%/prefs/update","prefs="+data,function(){
});
}
},getPrototypePref:function(key){
var _346=rabbit.parameters.prototypePrefs[key];
if((_346===undefined)||(_346===null)){
this.setPrototypePref(key,this.prototypeDefaults[key]);
}
return rabbit.parameters.prototypePrefs[key];
}};

