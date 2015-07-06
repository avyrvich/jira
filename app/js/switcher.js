$(function () {
 'use strict';
 var $suc =null;

 $('body').on('click', '.start-progress', function () {
  var $this = $(this);
     //console.log('click start-progress');
     //$(event.target).closest("tr").toggleClass("success");
      $this.closest("tr").toggleClass("success");
      if ($suc!=null) {
        $suc.toggleClass("success");  
        };
      $this.closest('ul li a').removeClass("start-progress").addClass("stop-progress").text('Stop-progress');
      

 });
 $('body').on('click', '.stop-progress', function () {
  var $this = $(this);
     //console.log('click stop-progress');
     //$(event.target).closest("tr").toggleClass("success");
      $this.closest("tr").toggleClass("success");
      if ($suc!=null) {
        $suc.toggleClass("success");  
        };
      $this.closest('ul li a').removeClass("stop-progress").addClass("start-progress").text('Start-progress');
      

 });
// $('body').on('click', '.fc-event-inner', function(event) {
//     event.preventDefault();
//    /* Act on the event */
//     var $this = $(this);
     //$this.toggleClass("success");
     //console.log('clicked');
     //$suc=$this;
     //$('#calendarModal').modal('show');  
 //}); 


});