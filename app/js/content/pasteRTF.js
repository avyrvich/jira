$(document).ready(function(){
    //put yer code in here
    ['paste'].forEach(function(event) {
        document.addEventListener(event, function(e) {
            e.preventDefault();
            var pastedText = undefined;
            if (window.clipboardData && window.clipboardData.getData) { // IE
                pastedText = window.clipboardData.getData('Text');
            } else if (e.clipboardData && e.clipboardData.getData) {
                pastedText = e.clipboardData.getData('text/html');
            }
            //$("#target").append(pastedText);
            var tmpstr='';
            /*it takes needed tags:
                        <b><u><i>
             replace them to jira-formate and then clear other tags
            */
            tmpstr = pastedText.replace(/(<([^>]b+)>)/ig, "*").replace(/(<b>)/ig,"*").replace(/(<([^>]i+)>)/ig, "_").replace(/(<i>)/ig,"_").replace(/(<([^>]u+)>)/ig, "+").replace(/(<u>)/ig,"+").replace(/(<([^>]+)>)/ig,"");
            //console.log(tmpstr);
            $('textarea[name="comment"]').text(tmpstr);
        });
    });
});