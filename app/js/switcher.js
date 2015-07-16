$(function() {
  'use strict';
  $('body').on('click', '.start-progress', function() {
    var $this = $(this);
    //console.log('click start-progress');
    //$(event.target).closest("tr").toggleClass("success");
    $this.closest("tr").toggleClass("success");
    $this.closest("a").removeClass('start-progress').addClass('stop-progress').text('Stop progress');
  });
  $('body').on('click', '.stop-progress', function() {
    var $this = $(this);
    //console.log('click stop-progress');
    //$(event.target).closest("tr").toggleClass("success");
    $this.closest("tr").toggleClass("success");
    $this.closest("a").removeClass('stop-progress').addClass('start-progress').text('Start progress');
  });
});