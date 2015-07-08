$(function () {
 'use strict';
 var $suc =null;

 $('body').on('click', '.start-progress', function () {
  var $this = $(this);
     //console.log('click start-progress');
     //$(event.target).closest("tr").toggleClass("success");
      $this.closest("tr").toggleClass("success");
});
 $('body').on('click', '.stop-progress', function () {
  var $this = $(this);
     //console.log('click stop-progress');
     //$(event.target).closest("tr").toggleClass("success");
      $this.closest("tr").toggleClass("success");
 });



 
});