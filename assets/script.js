/*var mongoose = require('mongoose');
var Event = mongoose.model('Event');*/


$(document).ready(function(){
    $("input#bcreate-event").on('click', (function() {
        $("form#create-event").toggleClass("hidden");
        $("article#listevents").toggleClass("hidden");
    }));
    
   
});
