TOSC_Audio = function(){

var self = {}

self.ctx = new webkitAudioContext();
self.oscs = [
	{}, {}, {}
]

self.playNote = function(freq){
	self.oscs[0][freq] = self.ctx.createOscillator();
	self.oscs[0][freq].connect(self.ctx.destination);
	self.oscs[0][freq].frequency.setValueAtTime(freq, self.ctx.currentTime);
	self.oscs[0][freq].noteOn(0);
}

self.stopNote = function(freq){
	var osc = self.oscs[0][freq];
	if(freq !== undefined)
	{
		osc.noteOff(0);
		// GARBAGE DAY!
		self.oscs[0][freq] = undefined;
	}
}


return self;

};