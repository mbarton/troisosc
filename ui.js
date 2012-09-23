TOSC_UI = function($, aud){
var self = {};
self.aud = aud;

var KEYS_TO_NOTES = {
	90: 261.63, //"C",
	83: 277.18, //"Cs",
	88: 293.66, //"D",
	68: 311.13, //"Ds",
	67: 329.63, //"E",
	86: 349.23, //"F",
	71: 369.99, //"Fs",
	66: 392.00, //"G",
	72: 415.30, //"Gs",
	78: 440.00, //"A",
	74: 466.16, //"As",
	77: 493.88, //"B"
};

// Handlers
$(function(){

$("body").keydown(function(event){
	var noteFreq = KEYS_TO_NOTES[event.keyCode];
	if(noteFreq !== undefined)
		aud.playNote(noteFreq);
});

$("body").keyup(function(event){
	var noteFreq = KEYS_TO_NOTES[event.keyCode];
	if(noteFreq !== undefined)
		aud.stopNote(noteFreq);
})

});

return self;
};