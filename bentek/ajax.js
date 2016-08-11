var bt_ajax = (function(){

    var myVar = 'this is private';

    function _actualAjax(){
        $.ajax();
    }

    function _ajaxDone(data){
        return data
    }

    function ajaxGet(opts){

    }

    return {
        btGet: ajaxGet
    }


})();




var baseURL = 'http://mybentek.com/api/v2/'

$(document).on('click','.button', function(e){
    var newURL = baseURL + $(this).attr('data-uri')

    bt_ajax.btGet(newURL)
})