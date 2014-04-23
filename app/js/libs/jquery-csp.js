(function ( $ ) {
    $.fn.downloadImageContent = function() {
        return this.each(function() {
            if (this.getAttribute('csp-src')) {
                var img = this;
                var xhr = new XMLHttpRequest();
                xhr.open('GET', img.getAttribute('csp-src'), true);
                xhr.responseType = 'blob';
                xhr.onload = function(e) {
                  img.src = window.URL.createObjectURL(this.response);
                };
                xhr.send();
                img.removeAttribute('csp-src');
            }
        });
    };
}( jQuery ));