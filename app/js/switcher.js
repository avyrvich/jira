$(function () {
 'use strict';

 $('body').on('click', '.start-progress', function () {
  var $this = $(this);
     //console.log('click start-progress');
     //$(event.target).closest("tr").toggleClass("success");
      $this.closest("tr").toggleClass("success");
      $this.toggleClass("success");
      $this.closest('ul li a').removeClass("start-progress").addClass("stop-progress").text('Stop-progress');
      $('#calendarModal').modal('hide');  

 });
 $('body').on('click', '.stop-progress', function () {
  var $this = $(this);
     //console.log('click stop-progress');
     //$(event.target).closest("tr").toggleClass("success");
      $this.closest("tr").toggleClass("success");
      $this.toggleClass("success");
      $this.closest('ul li a').removeClass("stop-progress").addClass("start-progress").text('Start-progress');
      $('#calendarModal').modal('hide');  

 });
 $('body').on('click', '.fc-event-inner', function(event) {
     event.preventDefault();
     /* Act on the event */
     var $this = $(this);
     //$this.toggleClass("success");
     //console.log('clicked');
     $('#calendarModal').modal('show');  
 });

});