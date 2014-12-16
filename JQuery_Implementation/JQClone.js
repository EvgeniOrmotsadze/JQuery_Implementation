/**
 * Created by evgeni.ormotsadze on 10/12/2014.
 */
(function(window, document) {
    var query = function (selector,node) {
        return new myObject(selector,node);
    }
    var myObject = function(selector,node){
        var tm;
        if(node != undefined) tm = node;
        else tm = document;
        var arr = tm.querySelectorAll(selector);
        for(var i = 0; i < arr.length; i++){
            this.push(arr[i]);
        }
    }
    myObject.prototype = Array.prototype;
    myObject.prototype.first = function(){
        var o = new myObject();
        o.push(this[0]);
        return o;
    }
    myObject.prototype.last = function(){
        var o = new myObject();
        o.push(this[this.length -1]);
        return o;
    }
    myObject.prototype.each = function(callback){
        for(var i = 0 ; i < this.length; i++){
            callback(this[i],i);
        }
    }
    myObject.prototype.find  = function(select){
        var m=new myObject();
        for(var i = 0; i < this.length; i++){
            var ret = this[i].querySelectorAll(select);
            for(var j = 0; j < ret.length; j++){
                m.push(ret[j]);
            }
        }
        return m;
    }
    myObject.prototype.hasClass = function(className){
        return (' ' + this[0].className + ' ').indexOf(' ' + className + ' ') > -1;
    }

    myObject.prototype.addClass = function(className){
        var s = className.split(' ');
        if (document.body.classList) {
            for(var i = 0; i < this.length; i++){
                for(var j = 0; j < s.length; j++) {
                    this[i].classList.add(s[j]);
                }
            }
        }else{
            for(var i = 0; i < this.length; i++) {
                if (this[i].className.length > 0) { className = ' ' + className}
                this[i].className += className;
            }
        }
        return this;
    }
    myObject.prototype.removeClass = function(className){
        var s = className.split(' ');
        if (document.body.classList) {
            for(var i = 0; i < this.length; i++){
                for(var j = 0; j < s.length; j++) {
                    if(this[i].classList.contains(s[j])){
                        this[i].classList.remove(s[j]);
                    }
                }
            }
        }else {
            for (var i = 0; i < this.length; i++) {
                this[i].className = this[i].className + ' ';
                for (var j = 0; j < s.length; j++) {
                    if ((' ' + this[i].className).indexOf(' ' + s[j] + ' ') > -1) {
                        this[i].className = this[i].className.replace(s[j] + ' ', '');
                    }
                }
                if (this[i].className.lastIndexOf(' ') > -1) this[i].className = this[i].className.substr(0, this[i].className.length - 1);
            }
        }
        return this;
    }
    myObject.prototype.toggleClass = function(togle){
        var s = togle.split(' ');
        if(document.body.classList){
            for(var i = 0; i < this.length; i++){
                for(var j = 0; j < s.length; j++){
                    if(this[i].classList.contains(s[j])){
                        this[i].classList.remove(s[j]);
                    }else{
                        this[i].classList.add(s[j]);
                    }
                }
            }
        }else {
            for (var i = 0; i < this.length; i++) {
                for (var j = 0; j < s.length; j++) {
                    if ((' ' + this[0].className + ' ').indexOf(' ' + s[j] + ' ') > -1) {
                        this[i].className = this[i].className + ' ';
                        this[i].className = this[i].className.replace(s[j] + ' ', '');
                        if (this[i].className.lastIndexOf(' ') > -1) this[i].className = this[i].className.substr(0, this[i].className.length - 1);
                    } else {
                        if (this[i].className.length > 0) {
                            this[i].className += ' ' + s[j]
                        }
                        else {
                            this[i].className += s[j]
                        }
                    }
                }
            }
        }
        return this;
    }
    myObject.prototype.attr = function(name,value){
        if(name instanceof Object){
            for(var x in name){
                this[0].setAttribute(x,name[x]);
            }
            return this;
        }else {
            var selector = this[0].getAttribute(name);
            if (value != undefined) {
                if(isFunction(value)){
                    this.each(function(elem,index){
                        var nV = value.call(elem,index,elem.getAttribute(name));
                        this.setAttribute(name,nV);
                    });
                }else {
                    this[0].setAttribute(name, value);
                    return this;
                }
            } else {
                var o = new myObject();
                o.push(selector);
                return o;
            }
        }
        return this;
    }
    //copy to check function:)
    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }
    myObject.prototype.css = function(proparty,value){
        if(value != undefined){
            for(var i = 0; i < this.length; i++){
                var oldStyle = this[i].getAttribute('style');
                if(oldStyle != null){
                    oldStyle += proparty +":" + value+";"
                    console.log(oldStyle);
                    this[i].setAttribute('style',oldStyle);
                }else {
                    var newStyle = proparty +":" + value+";";
                    this[i].setAttribute('style',newStyle);
                }
            }
        }else {
            if (proparty instanceof Object) {
                for(var i = 0; i < this.length; i++){
                    var Style = this[i].getAttribute('style');
                    if( Style != null) {
                        for (var prop in proparty) {
                            Style += prop +":"+ proparty[prop]+";";
                        }
                        this[i].setAttribute('style',Style);
                    }else{
                        var newSt = new String();
                        for (var prop in proparty) {
                            newSt += prop +":"+ proparty[prop]+";";
                        }
                        this[i].setAttribute('style',newSt);
                    }
                }
            }else{
                return window.getComputedStyle(this[0],null).getPropertyValue(proparty);
            }
        }
    }
    myObject.prototype.data = function(prop,value){
        if (document.body.dataset) {
            if(prop == undefined && value == undefined) {
                return this[0].dataset;
            }
            if(value == undefined){
                if (prop instanceof Object) {
                    for (var ob in prop) {
                        this[0].setAttribute('data-' + ob, prop[ob]);
                    }
                }else{
                    for(var val in this[0].dataset){
                        if(val == prop) return this[0].dataset[val];
                    }
                }
            }else{
                this[0].setAttribute('data-' + prop, value);
            }
        } else {
            if (prop == undefined && value == undefined) {
                var o = new myObject();
                for (var j = 0; j < this[0].attributes.length; j++) {
                    if ('data-' == this[0].attributes[j].nodeName.substring(0, 5)) {
                        o.push(this[0].attributes[j].value);
                    }
                }
                return o;
            }
            if (value == undefined) {
                if (prop instanceof Object) {
                    for (var ob in prop) {
                        this[0].setAttribute('data-' + ob, prop[ob]);
                    }
                } else {
                    for (var j = 0; j < this[0].attributes.length; j++) {
                        if ('data-' == this[0].attributes[j].nodeName.substring(0, 5)) {
                            if (this[0].attributes[j].nodeName == 'data-' + prop) {
                                return  this[0].attributes[j].value;
                            }
                        }
                    }
                }
            } else {
                this[0].setAttribute('data-' + prop, value);
            }
        }
    }
    //TODO
    myObject.prototype.on = function(event,callback,bool){
        var def = bool;
        if(def == undefined) def  = false;
        for(var i = 0; i < this.length; i++) {
            this[i].addEventListener(event, callback, def);
        }
    }
    myObject.prototype.html = function (content) {
        if(content == null) return this[0].outerHTML;
        this[0].innerHTML = content;
    }
    myObject.prototype.append = function(content){
        this[0].insertAdjacentHTML('beforeend',content);
    }
    myObject.prototype.prepend =function(content){
        this[0].insertAdjacentHTML('afterbegin',content);
    }
    myObject.prototype.empty = function(){
        for(var i = 0; i < this.length; i++){
            while(this[i].firstChild){
                this[i].removeChild(this[i].firstChild);
            }
        }
    }


    var ajax = function(params){
        this.request = null;
        if(params != undefined){
            if(params instanceof Object){
                if(params.url != null){
                    var t = getType(params.type);
                    var sendObj = null;
                    if(params.data != undefined){
                        for(var k in params.data){
                            sendObj += k + '=' +encodeURIComponent(params.data[k]);
                        }
                    }
                    this.request = new XMLHttpRequest();
                    this.request.open(t,params.type,true);
                    this.request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                    this.request.send(sendObj);
                }
            }else{
                this.request = new XMLHttpRequest();
                this.request.open('GET',params,true);
                this.request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                this.request.send();
            }
        }
    }
    function getType(type){
        if(type === 'GET'){
            return 'GET';
        }else{
            return 'POST';
        }
    }

    ajax.prototype.done = function(callback) {
        this.request.addEventListener('load', callback, true);
        return this;
    };
    ajax.prototype.error = function(callback) {
        this.request.addEventListener('fail', callback, true);
        return this;
    };

    window.jQClone = query;
    window.$ = window.jQClone;
    window.$.ajax = function(args) {
        return new ajax(args);
    };

})(window, document)