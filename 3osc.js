scale = {
	"C": 261.63,
	"C#": 277.18,
	"D": 293.66,
	"Eb": 311.13,
	"E": 329.63,
	"F": 349.23,
	"F#": 369.99,
	"G": 392.00,
	"Ab": 415.30,
	"A": 440.00,
	"Bb": 466.16,
	"B": 493.88,
	"C5": 523.25
}

keys = {
	90: "C",
	83: "C#",
	88: "D",
	68: "Eb",
	67: "E",
	86: "F",
	71: "F#",
	66: "G",
	72: "Ab",
	78: "A",
	74: "Bb",
	77: "B",
	188: "C5"
}

attack = 0.30;
release = 0.30;
waveform = 0;

ctx = new webkitAudioContext();
// Map of note value to oscillators currently playing that note
notes = {}
for(note in scale)
{
	notes[note] = []
}

function currentNotesStr()
{
	var currentNotes = "";
	for(note in notes)
	{
		if(notes[note].length !== 0)
		{
			currentNotes += note + " ";
		}
	}

	if(currentNotes.length === 0)
		currentNotes = placeholder;

	return currentNotes;
}

$(function(){
	placeholder = $("h1").html();
	$("#attack").val("" + attack);
	$("#release").val("" + release);

	$("body").keydown(function(e){
		var note = keys[e.keyCode];
		if(note === undefined)
			return;

		// Keydown is retriggered over and over again when you hold the key down
		// Don't make new notes (although the distortion you get is quite cool)
		if(notes[note].length !== 0)
			return;

		var osc = ctx.createOscillator();
		osc.type = waveform;
		osc.frequency.setValueAtTime(scale[note], ctx.currentTime);

		var adsr = ctx.createGain();
		adsr.gain.setValueAtTime(0, ctx.currentTime);
		adsr.gain.linearRampToValueAtTime(1, ctx.currentTime + attack);

		osc.connect(adsr);
		adsr.connect(ctx.destination);

		osc.start(ctx.currentTime);
		notes[note].push([osc, adsr]);

		$("h1").html(currentNotesStr());
	});

	$("body").keyup(function(e){
		var playingNote = keys[e.keyCode];
		if(playingNote === undefined)
			return;

		var oscillators = notes[playingNote];
		for(var i = 0; i < oscillators.length; i++){
			var osc = oscillators[i][0];
			var adsr = oscillators[i][1];
			adsr.gain.linearRampToValueAtTime(0, ctx.currentTime + release);
			osc.stop(ctx.currentTime + release);
		}
		notes[playingNote] = [];

		$("h1").html(currentNotesStr());
	});

	$("#attack").change(function(){
		attack = parseFloat($(this).val());
	});

	$("#release").change(function(){
		release = parseFloat($(this).val());
	});

	$("#waveform").change(function(){
		waveform = $(this).val();
	});
});