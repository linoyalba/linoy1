(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"RECOVER_אנימציה סופית_atlas_1", frames: [[0,0,1048,1466]]},
		{name:"RECOVER_אנימציה סופית_atlas_2", frames: [[0,0,1048,1466]]},
		{name:"RECOVER_אנימציה סופית_atlas_3", frames: [[0,0,1048,1466]]},
		{name:"RECOVER_אנימציה סופית_atlas_4", frames: [[0,0,1048,1466]]},
		{name:"RECOVER_אנימציה סופית_atlas_5", frames: [[0,0,1234,1238]]},
		{name:"RECOVER_אנימציה סופית_atlas_6", frames: [[0,0,1038,1456]]},
		{name:"RECOVER_אנימציה סופית_atlas_7", frames: [[972,1116,220,648],[0,1562,436,436],[1113,0,220,648],[1335,0,220,648],[1557,0,220,648],[1779,0,220,648],[1194,650,220,648],[1194,1300,220,648],[1416,650,220,648],[1416,1300,220,648],[1638,650,220,648],[1638,1300,220,648],[0,0,1111,1114],[0,1116,970,444]]},
		{name:"RECOVER_אנימציה סופית_atlas_8", frames: [[1796,0,220,412],[1689,414,220,412],[444,472,220,412],[666,585,220,412],[888,585,220,412],[1110,585,220,412],[1332,589,220,412],[0,650,220,412],[905,1561,207,103],[222,650,220,412],[1554,828,220,412],[1776,828,220,412],[444,886,220,412],[666,999,220,412],[0,1240,179,239],[181,1240,179,239],[888,1298,179,239],[362,1300,179,239],[1069,1320,179,239],[1250,1320,179,239],[1431,1384,179,239],[1612,1384,179,239],[1793,1384,179,239],[543,1413,179,239],[0,1481,179,239],[181,1481,179,239],[724,1539,179,239],[362,1541,179,239],[957,239,50,50],[888,999,296,297],[957,291,37,28],[1013,0,359,354],[1374,280,313,307],[0,1064,333,174],[1911,511,64,106],[863,239,92,90],[1689,280,79,95],[0,0,220,648],[222,0,220,648],[1911,414,79,95],[1554,589,73,58],[1456,1242,511,140],[444,0,567,237],[666,472,162,90],[1186,1003,268,315],[1114,1561,206,57],[1374,0,420,278],[444,239,417,231],[863,356,417,227],[1282,356,81,204]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_356 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_84 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_81 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_82 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_104 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_83 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_80 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_79 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_73 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_76 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_77 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_78 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_74 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_75 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_67 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_69 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_72 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_70 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_68 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_355 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_66 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(19);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_64 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(20);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_61 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(21);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_60 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(22);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_63 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(23);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_62 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(24);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_65 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(25);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_59 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(26);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_58 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(27);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_57 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(28);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_56 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(29);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_52 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(30);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_54 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(31);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_53 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(32);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_51 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(33);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_55 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_50 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_49 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_48 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_47 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_45 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_46 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_31 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(34);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_30 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(35);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_39 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_29 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(36);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_44 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_41 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_43 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_40 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(37);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_42 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(38);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_28 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(39);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_350 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(40);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_171 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(41);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_211 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(42);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_6"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_170 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_354 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(43);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_353 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(44);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_210 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_5"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_32 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_3"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap4 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(45);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap6 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(46);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap3 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(47);
}).prototype = p = new cjs.Sprite();



(lib.Bitmap7 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(48);
}).prototype = p = new cjs.Sprite();



(lib.leg = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_8"]);
	this.gotoAndStop(49);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_36 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_7"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["RECOVER_אנימציה סופית_atlas_4"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(img.CachedBmp_19);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2630,1496);


(lib.CachedBmp_1 = function() {
	this.initialize(img.CachedBmp_1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2570,1379);


(lib.CachedBmp_2 = function() {
	this.initialize(img.CachedBmp_2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2570,1379);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.יד_ימין_איש = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_73();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,103.5,51.5);


(lib.רגלימיןאיש = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.leg();

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,81,204);


(lib.עין = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_57();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,25,25);


(lib.סמיילי_מחייך = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_56();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,148,148.5);


(lib.סמיילי_מאוהב = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_55();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,218,218);


(lib.סמיילי_כוכבים = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_54();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,179.5,177);


(lib.סמיילי_בוכה = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_53();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,156.5,153.5);


(lib.נעל = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_51();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,166.5,87);


(lib.אגודל = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_28();
	this.instance.setTransform(0,0,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_29();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_30();
	this.instance_2.setTransform(-2.4,4.45,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_31();
	this.instance_3.setTransform(0.35,-3.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},59).to({state:[{t:this.instance_2}]},15).to({state:[{t:this.instance_3}]},31).wait(191));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.4,-3.7,46,53.2);


(lib.Symbol3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap3();
	this.instance.setTransform(12,7.2,0.0264,0.0587,0,62.2623,68.0083);

	this.instance_1 = new lib.Bitmap6();
	this.instance_1.setTransform(25.2,0,0.0264,0.055,0,62.092,67.4286);

	this.instance_2 = new lib.CachedBmp_350();
	this.instance_2.setTransform(-3.65,-2.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(-3.6,-2.1,36.5,29), null);


(lib.Scene_1_שליחת_אימוגי = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// שליחת_אימוגי
	this.instance = new lib.Bitmap4();
	this.instance.setTransform(627.7,-129.8,0.1474,0.1448,22.9584);

	this.instance_1 = new lib.Bitmap3();
	this.instance_1.setTransform(622.3,-124.35,0.2007,0.2184,23.452);

	this.instance_2 = new lib.Bitmap6();
	this.instance_2.setTransform(643.05,-173.1,0.2014,0.199,23.2072);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1,p:{scaleX:0.2007,scaleY:0.2184,rotation:23.452,x:622.3,y:-124.35}},{t:this.instance,p:{scaleX:0.1474,scaleY:0.1448,rotation:22.9584,x:627.7,y:-129.8}}]}).to({state:[{t:this.instance_1,p:{scaleX:0.2005,scaleY:0.2105,rotation:23.4363,x:728.95,y:569.35}},{t:this.instance,p:{scaleX:0.1473,scaleY:0.1447,rotation:22.9456,x:735.3,y:562.65}}]},105).wait(191));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_רקע_חדר = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// רקע_חדר
	this.instance = new lib.CachedBmp_1();
	this.instance.setTransform(0,-28,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_2();
	this.instance_1.setTransform(0,-28,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance}]},296).to({state:[{t:this.instance_1}]},95).wait(209));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_blue_background = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// blue_background
	this.instance = new lib.CachedBmp_19();
	this.instance.setTransform(-21.2,-16.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(296));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.play = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_211();
	this.instance.setTransform(41.75,93.65,0.1199,0.1199);

	this.instance_1 = new lib.CachedBmp_210();
	this.instance_1.setTransform(0,0,0.1199,0.1199);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.play, new cjs.Rectangle(0,0,148,148.5), null);


(lib.end = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.CachedBmp_171();
	this.instance.setTransform(42.2,99.3,0.1332,0.1332);

	this.instance_1 = new lib.CachedBmp_170();
	this.instance_1.setTransform(0,0,0.1332,0.1332);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,148,148.4);


(lib.___Camera___ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.ידימיןזזה = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.יד_ימין_איש("synched",0);
	this.instance.setTransform(57.3,38.8,0.9995,0.9995,14.9867,0,0,52.7,26.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(23).to({regX:52.8,regY:24.4,rotation:14.9861,x:57.85,y:37.2},0).wait(3).to({rotation:-0.0122,x:64.5,y:24.4},0).wait(3).to({regX:52.9,regY:24.5,rotation:-15.0109,x:75.45,y:12.75},0).wait(3).to({rotation:-30.0101,x:88.9,y:-1.9},0).wait(3).to({scaleX:0.9994,scaleY:0.9994,rotation:-45.0093,y:-14.1},0).wait(3).to({regX:52.8,regY:24.6,rotation:-60.009,x:87.65,y:-32.4},0).wait(3).to({rotation:-75.0081,x:82.75,y:-50.85},0).wait(3).to({rotation:-90.007,x:72.65,y:-64.3},0).wait(3).to({rotation:-105.0057,x:64.85,y:-83.5},0).wait(3).to({x:58.75,y:-93.55},0).wait(3).to({y:-101.9},0).wait(35).to({startPosition:0},0).to({_off:true},1).wait(6));

	// Layer_2
	this.instance_1 = new lib.CachedBmp_74();
	this.instance_1.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_75();
	this.instance_2.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_76();
	this.instance_3.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_77();
	this.instance_4.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_78();
	this.instance_5.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_79();
	this.instance_6.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_80();
	this.instance_7.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_81();
	this.instance_8.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_82();
	this.instance_9.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_83();
	this.instance_10.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_84();
	this.instance_11.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_104();
	this.instance_12.setTransform(-35.8,-69.35,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_356();
	this.instance_13.setTransform(-35.8,-69.35,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},23).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_4}]},3).to({state:[{t:this.instance_5}]},3).to({state:[{t:this.instance_6}]},3).to({state:[{t:this.instance_7}]},3).to({state:[{t:this.instance_8}]},3).to({state:[{t:this.instance_9}]},3).to({state:[{t:this.instance_10}]},3).to({state:[{t:this.instance_11}]},3).to({state:[{t:this.instance_12}]},3).to({state:[{t:this.instance_13}]},35).to({state:[]},1).wait(6));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35.8,-157.8,182,294.5);


(lib.שארהגוף = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.עין("synched",0);
	this.instance.setTransform(73.75,54.95,0.25,0.25,10.4093,0,0,-4.1,6.5);

	this.instance_1 = new lib.CachedBmp_72();
	this.instance_1.setTransform(-0.5,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-0.5,0,110,324);


(lib.פנים = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.עין("synched",0);
	this.instance.setTransform(63.35,54.95,0.2499,0.2499,10.4037,0,0,-3.9,6.8);

	this.instance_1 = new lib.CachedBmp_58();
	this.instance_1.setTransform(0,0,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_59();
	this.instance_2.setTransform(0,0,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_60();
	this.instance_3.setTransform(0,0,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_61();
	this.instance_4.setTransform(0,0,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_62();
	this.instance_5.setTransform(0,0,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_63();
	this.instance_6.setTransform(0,0,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_64();
	this.instance_7.setTransform(0,0,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_65();
	this.instance_8.setTransform(0,0,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_66();
	this.instance_9.setTransform(0,0,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_67();
	this.instance_10.setTransform(0,0,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_68();
	this.instance_11.setTransform(0,0,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_69();
	this.instance_12.setTransform(0,0,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_70();
	this.instance_13.setTransform(0,0,0.5,0.5);

	this.instance_14 = new lib.CachedBmp_355();
	this.instance_14.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_2},{t:this.instance}]},2).to({state:[{t:this.instance_3},{t:this.instance}]},2).to({state:[{t:this.instance_4},{t:this.instance}]},2).to({state:[{t:this.instance_5},{t:this.instance}]},2).to({state:[{t:this.instance_6},{t:this.instance}]},2).to({state:[{t:this.instance_7},{t:this.instance}]},2).to({state:[{t:this.instance_8},{t:this.instance}]},2).to({state:[{t:this.instance_9},{t:this.instance}]},2).to({state:[{t:this.instance_10},{t:this.instance}]},2).to({state:[{t:this.instance_11},{t:this.instance}]},2).to({state:[{t:this.instance_12},{t:this.instance}]},2).to({state:[{t:this.instance_13},{t:this.instance}]},2).to({state:[{t:this.instance_14},{t:this.instance}]},64).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,89.5,119.5);


(lib.נעלוגרב = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.נעל("synched",0);
	this.instance.setTransform(49.35,26.5,0.6013,0.6013,0,0,0,82.1,44.1);

	this.instance_1 = new lib.CachedBmp_52();
	this.instance_1.setTransform(14.45,8.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(0,0,100.1,52.3);


(lib.אייפון = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol3();
	this.instance.setTransform(14.7,23.8,1,1,0,0,0,14.7,23.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-3.6,-2.1,36.5,29);


(lib.אישסוף = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// אייפון
	this.instance = new lib.אייפון("synched",0);
	this.instance.setTransform(171.85,193.65);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(4).to({regX:14.6,regY:12.3,rotation:14.9992,x:177.65,y:226.25},0).wait(5).to({rotation:0,x:186.45,y:205.95},0).wait(5).to({rotation:14.9992,x:177.65,y:226.25},0).wait(5).to({rotation:0,x:186.45,y:205.95},0).wait(5).to({rotation:14.9992,x:177.65,y:226.25},0).wait(5).to({rotation:0,x:186.45,y:205.95},0).wait(5).to({rotation:14.9992,x:177.65,y:226.25},0).wait(5).to({rotation:0,x:186.45,y:205.95},0).wait(5).to({rotation:14.9992,x:177.65,y:226.25},0).wait(5).to({rotation:0,x:186.45,y:205.95},0).wait(5).to({rotation:14.9992,x:177.65,y:226.25},0).wait(5).to({rotation:0,x:186.45,y:205.95},0).wait(1));

	// יד_ימין
	this.instance_1 = new lib.יד_ימין_איש("synched",0);
	this.instance_1.setTransform(133.25,215.35,1,1,0.4712,0,0,51.6,25.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(4).to({regX:51.7,rotation:12.9238,x:121.85,y:223.4},0).wait(5).to({regX:51.6,rotation:0.4712,x:133.25,y:215.35},0).wait(5).to({regX:51.7,rotation:12.9238,x:121.85,y:223.4},0).wait(5).to({regX:51.6,rotation:0.4712,x:133.25,y:215.35},0).wait(5).to({regX:51.7,rotation:12.9238,x:121.85,y:223.4},0).wait(5).to({regX:51.6,rotation:0.4712,x:133.25,y:215.35},0).wait(5).to({regX:51.7,rotation:12.9238,x:121.85,y:223.4},0).wait(5).to({regX:51.6,rotation:0.4712,x:133.25,y:215.35},0).wait(5).to({regX:51.7,rotation:12.9238,x:121.85,y:223.4},0).wait(5).to({regX:51.6,rotation:0.4712,x:133.25,y:215.35},0).wait(5).to({regX:51.7,rotation:12.9238,x:121.85,y:223.4},0).wait(5).to({regX:51.6,rotation:0.4712,x:133.25,y:215.35},0).wait(1));

	// שאר_הגוף
	this.instance_2 = new lib.עין("synched",0);
	this.instance_2.setTransform(104,54.95,0.25,0.25,10.4093,0,0,-4.1,6.5);

	this.instance_3 = new lib.CachedBmp_39();
	this.instance_3.setTransform(29.75,0,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_40();
	this.instance_4.setTransform(29.75,4.05,0.5,0.5);

	this.instance_5 = new lib.CachedBmp_41();
	this.instance_5.setTransform(29.75,0,0.5,0.5);

	this.instance_6 = new lib.CachedBmp_42();
	this.instance_6.setTransform(29.75,8.1,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_43();
	this.instance_7.setTransform(29.75,0,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_44();
	this.instance_8.setTransform(29.75,7.3,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_45();
	this.instance_9.setTransform(29.75,0,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_46();
	this.instance_10.setTransform(29.75,4.9,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_47();
	this.instance_11.setTransform(29.75,0,0.5,0.5);

	this.instance_12 = new lib.CachedBmp_48();
	this.instance_12.setTransform(29.75,5.7,0.5,0.5);

	this.instance_13 = new lib.CachedBmp_49();
	this.instance_13.setTransform(29.75,0,0.5,0.5);

	this.instance_14 = new lib.שארהגוף("synched",0);
	this.instance_14.setTransform(84.85,168.3,1,1,0,0,0,54.6,161.8);

	this.instance_15 = new lib.יד_ימין_איש("synched",0);
	this.instance_15.setTransform(133.1,214.8,0.9999,0.9999,0,0,0,51.5,25.5);

	this.instance_16 = new lib.CachedBmp_50();
	this.instance_16.setTransform(29.75,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2,p:{y:54.95}}]}).to({state:[{t:this.instance_4},{t:this.instance_2,p:{y:59}}]},4).to({state:[{t:this.instance_5},{t:this.instance_2,p:{y:54.95}}]},5).to({state:[{t:this.instance_6},{t:this.instance_2,p:{y:63.05}}]},5).to({state:[{t:this.instance_7},{t:this.instance_2,p:{y:54.95}}]},5).to({state:[{t:this.instance_8},{t:this.instance_2,p:{y:62.25}}]},5).to({state:[{t:this.instance_9},{t:this.instance_2,p:{y:54.95}}]},5).to({state:[{t:this.instance_10},{t:this.instance_2,p:{y:59.85}}]},5).to({state:[{t:this.instance_11},{t:this.instance_2,p:{y:54.95}}]},5).to({state:[{t:this.instance_12},{t:this.instance_2,p:{y:60.65}}]},5).to({state:[{t:this.instance_13},{t:this.instance_2,p:{y:54.95}}]},5).to({state:[{t:this.instance_14}]},5).to({state:[{t:this.instance_16},{t:this.instance_2,p:{y:54.95}},{t:this.instance_15}]},5).wait(1));

	// נעל_שמאל
	this.instance_17 = new lib.נעלוגרב("synched",0);
	this.instance_17.setTransform(160.35,521.2,1,1,-14.9992,0,0,50,26.3);

	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(4).to({regY:26.2,rotation:0,x:115.8,y:528.15},0).wait(5).to({regY:26.3,rotation:-14.9992,x:160.35,y:521.2},0).wait(5).to({regY:26.2,rotation:0,x:115.8,y:528.15},0).wait(5).to({regY:26.3,rotation:-14.9992,x:160.35,y:521.2},0).wait(5).to({regY:26.2,rotation:0,x:115.8,y:528.15},0).wait(5).to({regY:26.3,rotation:-14.9992,x:160.35,y:521.2},0).wait(5).to({regY:26.2,rotation:0,x:115.8,y:528.15},0).wait(5).to({regY:26.3,rotation:-14.9992,x:160.35,y:521.2},0).wait(5).to({regY:26.2,rotation:0,x:115.8,y:528.15},0).wait(5).to({regY:26.3,rotation:-14.9992,x:160.35,y:521.2},0).wait(5).to({regY:26.2,rotation:0,x:115.8,y:528.15},0).wait(5).to({regY:26.3,rotation:-14.9992,x:160.35,y:521.2},0).wait(1));

	// נעל_ימין
	this.instance_18 = new lib.נעלוגרב("synched",0);
	this.instance_18.setTransform(59.25,528.9,1,1,0,0,0,50,26.2);

	this.timeline.addTween(cjs.Tween.get(this.instance_18).wait(4).to({regX:50.1,rotation:14.9988,x:66.25,y:537.95},0).wait(5).to({regX:50,rotation:0,x:59.25,y:528.9},0).wait(5).to({regX:50.1,rotation:14.9988,x:66.25,y:537.95},0).wait(5).to({regX:50,rotation:0,x:59.25,y:528.9},0).wait(5).to({regX:50.1,rotation:14.9988,x:66.25,y:537.95},0).wait(5).to({regX:50,rotation:0,x:59.25,y:528.9},0).wait(5).to({regX:50.1,rotation:14.9988,x:66.25,y:537.95},0).wait(5).to({regX:50,rotation:0,x:59.25,y:528.9},0).wait(5).to({regX:50.1,rotation:14.9988,x:66.25,y:537.95},0).wait(5).to({regX:50,rotation:0,x:59.25,y:528.9},0).wait(5).to({regX:50.1,rotation:14.9988,x:66.25,y:537.95},0).wait(5).to({regX:50,rotation:0,x:59.25,y:528.9},0).wait(1));

	// רגל_ימין
	this.instance_19 = new lib.רגלימיןאיש("synched",0);
	this.instance_19.setTransform(107.5,421,1,1,0,0,0,40.5,102);

	this.instance_20 = new lib.רגלימיןאיש("synched",0);
	this.instance_20.setTransform(107.5,421,1,1,0,0,0,40.5,102);

	this.instance_21 = new lib.רגלימיןאיש("synched",0);
	this.instance_21.setTransform(107.5,421,1,1,0,0,0,40.5,102);

	this.instance_22 = new lib.רגלימיןאיש("synched",0);
	this.instance_22.setTransform(107.5,421,1,1,0,0,0,40.5,102);

	this.instance_23 = new lib.רגלימיןאיש("synched",0);
	this.instance_23.setTransform(107.5,421,1,1,0,0,0,40.5,102);

	this.instance_24 = new lib.רגלימיןאיש("synched",0);
	this.instance_24.setTransform(107.5,421,1,1,0,0,0,40.5,102);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_19}]}).to({state:[{t:this.instance_19}]},4).to({state:[{t:this.instance_19}]},5).to({state:[{t:this.instance_19}]},5).to({state:[{t:this.instance_20},{t:this.instance_19}]},5).to({state:[{t:this.instance_19}]},5).to({state:[{t:this.instance_21},{t:this.instance_20},{t:this.instance_19}]},5).to({state:[{t:this.instance_19}]},5).to({state:[{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19}]},5).to({state:[{t:this.instance_19}]},5).to({state:[{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19}]},5).to({state:[{t:this.instance_19}]},5).to({state:[{t:this.instance_24},{t:this.instance_23},{t:this.instance_22},{t:this.instance_21},{t:this.instance_20},{t:this.instance_19}]},5).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(4).to({regX:40.6,regY:102.2,rotation:10.0348,x:81.8,y:411.65},0).wait(5).to({regX:40.5,regY:102,rotation:0,x:107.5,y:421},0).wait(5).to({regX:40.6,regY:102.2,rotation:10.0348,x:81.8,y:411.65},0).wait(5).to({regX:40.5,regY:102,rotation:0,x:107.5,y:421},0).wait(5).to({regX:40.6,regY:102.2,rotation:10.0348,x:81.8,y:411.65},0).wait(5).to({regX:40.5,regY:102,rotation:0,x:107.5,y:421},0).wait(5).to({regX:40.6,regY:102.2,rotation:10.0348,x:81.8,y:411.65},0).wait(5).to({regX:40.5,regY:102,rotation:0,x:107.5,y:421},0).wait(5).to({regX:40.6,regY:102.2,rotation:10.0348,x:81.8,y:411.65},0).wait(5).to({regX:40.5,regY:102,rotation:0,x:107.5,y:421},0).wait(5).to({regX:40.6,regY:102.2,rotation:10.0348,x:81.8,y:411.65},0).wait(5).to({regX:40.5,regY:102,rotation:0,x:107.5,y:421},0).wait(1));

	// רגל_שמאל
	this.instance_25 = new lib.רגלימיןאיש("synched",0);
	this.instance_25.setTransform(42.45,413.6,1,1,17.986,0,0,40.6,102.1);

	this.instance_26 = new lib.רגלימיןאיש("synched",0);
	this.instance_26.setTransform(42.45,413.6,1,1,17.986,0,0,40.6,102.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_25}]}).to({state:[{t:this.instance_25}]},4).to({state:[{t:this.instance_25}]},5).to({state:[{t:this.instance_25}]},5).to({state:[{t:this.instance_25}]},5).to({state:[{t:this.instance_25}]},5).to({state:[{t:this.instance_25}]},5).to({state:[{t:this.instance_25}]},5).to({state:[{t:this.instance_25}]},5).to({state:[{t:this.instance_25}]},5).to({state:[{t:this.instance_25}]},5).to({state:[{t:this.instance_25}]},5).to({state:[{t:this.instance_26},{t:this.instance_25}]},5).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(4).to({x:54.15},0).wait(5).to({x:42.45},0).wait(5).to({x:54.15},0).wait(5).to({x:42.45},0).wait(5).to({x:54.15},0).wait(5).to({x:42.45},0).wait(5).to({x:54.15},0).wait(5).to({x:42.45},0).wait(5).to({x:54.15},0).wait(5).to({x:42.45},0).wait(5).to({x:54.15},0).wait(5).to({x:42.45},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.6,0,243.1,576.2);


(lib.אישהתחלה = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap7();
	this.instance.setTransform(498.6,520.45,0.2024,0.2097,23.4723);

	this.instance_1 = new lib.Bitmap6();
	this.instance_1.setTransform(520.35,469.5,0.2014,0.2063,23.2081);

	this.instance_2 = new lib.CachedBmp_354();
	this.instance_2.setTransform(475.65,565.45,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_353();
	this.instance_3.setTransform(470.7,457.3,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_36();
	this.instance_4.setTransform(0,526.2,0.5,0.5);

	this.instance_5 = new lib.עין("synched",0);
	this.instance_5.setTransform(334.95,214.55,1,1,10.4876);

	this.instance_6 = new lib.Bitmap7();
	this.instance_6.setTransform(498.6,520.45,0.2024,0.2097,23.4723);

	this.instance_7 = new lib.Bitmap6();
	this.instance_7.setTransform(520.35,469.5,0.2014,0.2063,23.2081);

	this.instance_8 = new lib.CachedBmp_354();
	this.instance_8.setTransform(475.65,565.45,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_353();
	this.instance_9.setTransform(470.7,457.3,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_36();
	this.instance_10.setTransform(0,526.2,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_32();
	this.instance_11.setTransform(77.95,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.אישהתחלה, new cjs.Rectangle(0,0,604.7,748.2), null);


(lib.Symbol1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Bitmap7();
	this.instance.setTransform(498.6,515.25,0.2024,0.2097,23.4723);

	this.instance_1 = new lib.Bitmap6();
	this.instance_1.setTransform(520.35,464.3,0.2014,0.2063,23.2081);

	this.instance_2 = new lib.CachedBmp_354();
	this.instance_2.setTransform(475.65,560.25,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_353();
	this.instance_3.setTransform(470.7,452.1,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_36();
	this.instance_4.setTransform(0,521,0.5,0.5);

	this.instance_5 = new lib.עין("synched",0);
	this.instance_5.setTransform(371.25,229.9,1,1,18.4377);

	this.instance_6 = new lib.Bitmap7();
	this.instance_6.setTransform(498.6,515.25,0.2024,0.2097,23.4723);

	this.instance_7 = new lib.Bitmap6();
	this.instance_7.setTransform(520.35,464.3,0.2014,0.2063,23.2081);

	this.instance_8 = new lib.CachedBmp_354();
	this.instance_8.setTransform(475.65,560.25,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_353();
	this.instance_9.setTransform(470.7,452.1,0.5,0.5);

	this.instance_10 = new lib.CachedBmp_36();
	this.instance_10.setTransform(0,521,0.5,0.5);

	this.instance_11 = new lib.CachedBmp_20();
	this.instance_11.setTransform(104.05,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_11},{t:this.instance_10},{t:this.instance_9},{t:this.instance_8},{t:this.instance_7},{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,623.1,743), null);


(lib.Scene_1_מחייך_קופץ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// מחייך_קופץ
	this.instance = new lib.סמיילי_מחייך("synched",0);
	this.instance.setTransform(757.15,574.2,0.0236,0.0236,21.8426);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(125).to({_off:false},0).wait(1).to({regX:74,regY:74.3,scaleX:0.0331,scaleY:0.0331,rotation:21.8493,x:762.35,y:573.75},0).wait(1).to({scaleX:0.0426,scaleY:0.0426,x:766.7,y:571.25},0).wait(1).to({scaleX:0.052,scaleY:0.052,x:771.2,y:568.85},0).wait(1).to({scaleX:0.0615,scaleY:0.0615,x:775.85,y:566.6},0).wait(1).to({scaleX:0.071,scaleY:0.071,x:780.55,y:564.45},0).wait(1).to({scaleX:0.0804,scaleY:0.0804,x:785.4,y:562.45},0).wait(1).to({scaleX:0.0899,scaleY:0.0899,x:790.25,y:560.65},0).wait(1).to({scaleX:0.0993,scaleY:0.0993,x:795.25,y:558.9},0).wait(1).to({scaleX:0.1088,scaleY:0.1088,x:800.3,y:557.35},0).wait(1).to({scaleX:0.1183,scaleY:0.1183,x:805.5,y:555.95},0).wait(1).to({scaleX:0.1277,scaleY:0.1277,x:810.7,y:554.8},0).wait(1).to({scaleX:0.1372,scaleY:0.1372,x:816.05,y:553.9},0).wait(1).to({scaleX:0.1467,scaleY:0.1467,x:821.5,y:553.3},0).wait(1).to({scaleX:0.1561,scaleY:0.1561,x:827.1,y:553.05},0).wait(1).to({scaleX:0.1656,scaleY:0.1656,x:832.7,y:553.35},0).wait(1).to({scaleX:0.175,scaleY:0.175,x:838.35,y:554.3},0).wait(1).to({scaleX:0.1845,scaleY:0.1845,x:843.95,y:556.25},0).wait(1).to({scaleX:0.194,scaleY:0.194,x:849.15,y:559.4},0).wait(1).to({scaleX:0.2034,scaleY:0.2034,x:853.55,y:563.7},0).wait(1).to({scaleX:0.2129,scaleY:0.2129,x:856.7,y:569},0).wait(1).to({scaleX:0.2223,scaleY:0.2223,x:858.85,y:574.85},0).wait(1).to({scaleX:0.2318,scaleY:0.2318,x:860.7,y:580.95},0).wait(1).to({scaleX:0.2413,scaleY:0.2413,x:862.35,y:587},0).wait(1).to({scaleX:0.2507,scaleY:0.2507,x:863.75,y:593.1},0).wait(1).to({scaleX:0.2602,scaleY:0.2602,x:865.1,y:599.2},0).wait(1).to({scaleX:0.2697,scaleY:0.2697,x:866.35,y:605.35},0).wait(1).to({scaleX:0.2791,scaleY:0.2791,x:867.5,y:611.5},0).wait(1).to({scaleX:0.2886,scaleY:0.2886,x:868.5,y:617.65},0).wait(1).to({scaleX:0.298,scaleY:0.298,x:869.45,y:623.8},0).wait(1).to({scaleX:0.3075,scaleY:0.3075,x:870.3,y:630},0).wait(1).to({scaleX:0.317,scaleY:0.317,x:871.05,y:636.2},0).wait(1).to({scaleX:0.3264,scaleY:0.3264,x:871.65,y:642.4},0).wait(1).to({scaleX:0.3359,scaleY:0.3359,x:872.15,y:648.55},0).wait(1).to({scaleX:0.3454,scaleY:0.3454,x:872.65,y:654.75},0).wait(1).to({scaleX:0.3548,scaleY:0.3548,x:873.05,y:660.95},0).wait(1).to({scaleX:0.3643,scaleY:0.3643,x:873.45,y:667.15},0).wait(1).to({scaleX:0.3737,scaleY:0.3737,x:873.75,y:673.35},0).wait(1).to({scaleX:0.3832,scaleY:0.3832,x:874.05,y:679.6},0).wait(1).to({scaleX:0.3927,scaleY:0.3927,x:874.3,y:685.8},0).wait(1).to({scaleX:0.4021,scaleY:0.4021,x:874.55,y:691.95},0).wait(1).to({scaleX:0.4116,scaleY:0.4116,x:874.7,y:698.2},0).wait(1).to({scaleX:0.421,scaleY:0.421,x:874.9,y:704.4},0).wait(1).to({scaleX:0.4305,scaleY:0.4305,x:875.05,y:710.6},0).wait(1).to({scaleX:0.44,scaleY:0.44,x:875.15,y:716.75},0).wait(1).to({scaleX:0.4494,scaleY:0.4494,x:875.2,y:723},0).wait(1).to({scaleX:0.4589,scaleY:0.4589,x:875.25,y:729.2},0).wait(1).to({scaleX:0.4684,scaleY:0.4684,y:735.35},0).wait(1).to({scaleX:0.4778,scaleY:0.4778,x:875.2,y:741.5},0).wait(1).to({scaleX:0.4873,scaleY:0.4873,x:875.05,y:747.65},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_מאוהב_קופץ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// מאוהב_קופץ
	this.instance = new lib.סמיילי_מאוהב("synched",0);
	this.instance.setTransform(751.1,573.9,0.0158,0.0158,23.3797);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(205).to({_off:false},0).wait(1).to({regX:109,regY:109,scaleX:0.0198,scaleY:0.0198,rotation:23.4081,x:760.9,y:571.2},0).wait(1).to({scaleX:0.0237,scaleY:0.0237,x:768.55,y:567.35},0).wait(1).to({scaleX:0.0276,scaleY:0.0276,x:775.5,y:564.3},0).wait(1).to({scaleX:0.0316,scaleY:0.0316,x:781.8,y:561.9},0).wait(1).to({scaleX:0.0355,scaleY:0.0355,x:787.6,y:560.05},0).wait(1).to({scaleX:0.0394,scaleY:0.0394,x:793,y:558.6},0).wait(1).to({scaleX:0.0433,scaleY:0.0433,x:798.1,y:557.55},0).wait(1).to({scaleX:0.0473,scaleY:0.0473,x:802.9,y:556.75},0).wait(1).to({scaleX:0.0512,scaleY:0.0512,x:807.4,y:556.2},0).wait(1).to({scaleX:0.0551,scaleY:0.0551,x:811.75,y:556.05},0).wait(1).to({scaleX:0.059,scaleY:0.059,x:815.9},0).wait(1).to({scaleX:0.0629,scaleY:0.0629,x:819.9,y:556.25},0).wait(1).to({scaleX:0.0669,scaleY:0.0669,x:823.7,y:556.75},0).wait(1).to({scaleX:0.0708,scaleY:0.0708,x:827.4,y:557.4},0).wait(1).to({scaleX:0.0747,scaleY:0.0747,x:830.85,y:558.2},0).wait(1).to({scaleX:0.0786,scaleY:0.0786,x:834.3,y:559.25},0).wait(1).to({scaleX:0.0826,scaleY:0.0826,x:837.6,y:560.4},0).wait(1).to({scaleX:0.0865,scaleY:0.0865,x:840.8,y:561.8},0).wait(1).to({scaleX:0.0904,scaleY:0.0904,x:843.9,y:563.35},0).wait(1).to({scaleX:0.0943,scaleY:0.0943,x:846.9,y:565.05},0).wait(1).to({scaleX:0.0983,scaleY:0.0983,x:849.85,y:566.9},0).wait(1).to({scaleX:0.1022,scaleY:0.1022,x:852.7,y:568.9},0).wait(1).to({scaleX:0.1061,scaleY:0.1061,x:855.4,y:571.1},0).wait(1).to({scaleX:0.11,scaleY:0.11,x:858.15,y:573.45},0).wait(1).to({scaleX:0.114,scaleY:0.114,x:860.75,y:576},0).wait(1).to({scaleX:0.1179,scaleY:0.1179,x:863.3,y:578.65},0).wait(1).to({scaleX:0.1218,scaleY:0.1218,x:865.8,y:581.5},0).wait(1).to({scaleX:0.1257,scaleY:0.1257,x:868.2,y:584.55},0).wait(1).to({scaleX:0.1296,scaleY:0.1296,x:870.55,y:587.65},0).wait(1).to({scaleX:0.1336,scaleY:0.1336,x:872.8,y:591.1},0).wait(1).to({scaleX:0.1375,scaleY:0.1375,x:875.1,y:594.65},0).wait(1).to({scaleX:0.1414,scaleY:0.1414,x:877.3,y:598.4},0).wait(1).to({scaleX:0.1453,scaleY:0.1453,x:879.4,y:602.4},0).wait(1).to({scaleX:0.1493,scaleY:0.1493,x:881.5,y:606.55},0).wait(1).to({scaleX:0.1532,scaleY:0.1532,x:883.45,y:610.95},0).wait(1).to({scaleX:0.1571,scaleY:0.1571,x:885.45,y:615.6},0).wait(1).to({scaleX:0.161,scaleY:0.161,x:887.35,y:620.5},0).wait(1).to({scaleX:0.165,scaleY:0.165,x:889.2,y:625.75},0).wait(1).to({scaleX:0.1689,scaleY:0.1689,x:891.05,y:631.2},0).wait(1).to({scaleX:0.1728,scaleY:0.1728,x:892.75,y:637.05},0).wait(1).to({scaleX:0.1767,scaleY:0.1767,x:894.45,y:643.25},0).wait(1).to({scaleX:0.1807,scaleY:0.1807,x:896.1,y:649.75},0).wait(1).to({scaleX:0.1846,scaleY:0.1846,x:897.6,y:656.85},0).wait(1).to({scaleX:0.1885,scaleY:0.1885,x:899.15,y:664.4},0).wait(1).to({scaleX:0.1924,scaleY:0.1924,x:900.55,y:672.6},0).wait(1).to({scaleX:0.1963,scaleY:0.1963,x:901.95,y:681.45},0).wait(1).to({scaleX:0.2003,scaleY:0.2003,x:903.25,y:691.2},0).wait(1).to({scaleX:0.2042,scaleY:0.2042,x:904.4,y:702.05},0).wait(1).to({scaleX:0.2081,scaleY:0.2081,x:905.5,y:714.3},0).wait(1).to({scaleX:0.212,scaleY:0.212,x:906.4,y:728.75},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_כוכבים_קופץ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// כוכבים_קופץ
	this.instance = new lib.סמיילי_כוכבים("synched",0);
	this.instance.setTransform(747.45,571.9,0.0217,0.0217,22.1387);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(245).to({_off:false},0).wait(1).to({regX:89.8,regY:88.5,scaleX:0.0281,scaleY:0.0281,rotation:22.1604,x:745.45,y:570.15},0).wait(1).to({scaleX:0.0346,scaleY:0.0346,x:742.45,y:566.25},0).wait(1).to({scaleX:0.041,scaleY:0.041,x:739.45,y:562.7},0).wait(1).to({scaleX:0.0475,scaleY:0.0475,x:736.45,y:559.4},0).wait(1).to({scaleX:0.0539,scaleY:0.0539,x:733.55,y:556.4},0).wait(1).to({scaleX:0.0604,scaleY:0.0604,x:730.6,y:553.7},0).wait(1).to({scaleX:0.0669,scaleY:0.0669,x:727.7,y:551.35},0).wait(1).to({scaleX:0.0733,scaleY:0.0733,x:724.9,y:549.3},0).wait(1).to({scaleX:0.0798,scaleY:0.0798,x:722.05,y:547.5},0).wait(1).to({scaleX:0.0862,scaleY:0.0862,x:719.2,y:546},0).wait(1).to({scaleX:0.0927,scaleY:0.0927,x:716.45,y:544.9},0).wait(1).to({scaleX:0.0991,scaleY:0.0991,x:713.7,y:544},0).wait(1).to({scaleX:0.1056,scaleY:0.1056,x:711,y:543.45},0).wait(1).to({scaleX:0.112,scaleY:0.112,x:708.2,y:543.25},0).wait(1).to({scaleX:0.1185,scaleY:0.1185,x:705.55},0).wait(1).to({scaleX:0.1249,scaleY:0.1249,x:702.95,y:543.7},0).wait(1).to({scaleX:0.1314,scaleY:0.1314,x:700.3,y:544.3},0).wait(1).to({scaleX:0.1378,scaleY:0.1378,x:697.65,y:545.25},0).wait(1).to({scaleX:0.1443,scaleY:0.1443,x:695.1,y:546.6},0).wait(1).to({scaleX:0.1507,scaleY:0.1507,x:692.55,y:548.15},0).wait(1).to({scaleX:0.1572,scaleY:0.1572,x:690,y:550},0).wait(1).to({scaleX:0.1636,scaleY:0.1636,x:687.5,y:552.2},0).wait(1).to({scaleX:0.1701,scaleY:0.1701,x:685,y:554.7},0).wait(1).to({scaleX:0.1766,scaleY:0.1766,x:682.6,y:557.5},0).wait(1).to({scaleX:0.183,scaleY:0.183,x:680.15,y:560.6},0).wait(1).to({scaleX:0.1895,scaleY:0.1895,x:677.8,y:564},0).wait(1).to({scaleX:0.1959,scaleY:0.1959,x:675.4,y:567.7},0).wait(1).to({scaleX:0.2024,scaleY:0.2024,x:673.05,y:571.7},0).wait(1).to({scaleX:0.2088,scaleY:0.2088,x:670.7,y:576},0).wait(1).to({scaleX:0.2153,scaleY:0.2153,x:668.4,y:580.65},0).wait(1).to({scaleX:0.2217,scaleY:0.2217,x:666.15,y:585.55},0).wait(1).to({scaleX:0.2282,scaleY:0.2282,x:663.95,y:590.8},0).wait(1).to({scaleX:0.2346,scaleY:0.2346,x:661.65,y:596.35},0).wait(1).to({scaleX:0.2411,scaleY:0.2411,x:659.5,y:602.15},0).wait(1).to({scaleX:0.2475,scaleY:0.2475,x:657.35,y:608.3},0).wait(1).to({scaleX:0.254,scaleY:0.254,x:655.15,y:614.7},0).wait(1).to({scaleX:0.2604,scaleY:0.2604,x:653.05,y:621.45},0).wait(1).to({scaleX:0.2669,scaleY:0.2669,x:651,y:628.55},0).wait(1).to({scaleX:0.2733,scaleY:0.2733,x:648.95,y:635.9},0).wait(1).to({scaleX:0.2798,scaleY:0.2798,x:646.85,y:643.6},0).wait(1).to({scaleX:0.2863,scaleY:0.2863,x:644.85,y:651.5},0).wait(1).to({scaleX:0.2927,scaleY:0.2927,x:642.9,y:659.8},0).wait(1).to({scaleX:0.2992,scaleY:0.2992,x:640.9,y:668.35},0).wait(1).to({scaleX:0.3056,scaleY:0.3056,x:638.95,y:677.25},0).wait(1).to({scaleX:0.3121,scaleY:0.3121,x:637.05,y:686.45},0).wait(1).to({scaleX:0.3185,scaleY:0.3185,x:635.15,y:695.95},0).wait(1).to({scaleX:0.325,scaleY:0.325,x:633.3,y:705.75},0).wait(1).to({scaleX:0.3314,scaleY:0.3314,x:631.45,y:715.85},0).wait(1).to({scaleX:0.3379,scaleY:0.3379,x:629.65,y:726.25},0).wait(1).to({scaleX:0.3443,scaleY:0.3443,x:627.9,y:736.95},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_פנים = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// פנים
	this.instance = new lib.פנים("synched",0);
	this.instance.setTransform(182.25,207.55,0.9997,0.9997,0,0,0,45.6,60.4);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(511).to({_off:false},0).wait(89));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_סמיילימחייך = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// סמיילימחייך
	this.instance = new lib.סמיילי_מחייך("synched",0);
	this.instance.setTransform(1195.25,-111.5,1,1,0,0,0,74,62.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(296).to({_off:false},0).wait(1).to({regY:74.3,x:1193.55,y:-80.2},0).wait(1).to({x:1191.85,y:-61.1},0).wait(1).to({x:1190.15,y:-42.05},0).wait(1).to({x:1188.5,y:-22.95},0).wait(1).to({x:1186.8,y:-3.9},0).wait(1).to({x:1185.1,y:15.2},0).wait(1).to({x:1183.45,y:34.3},0).wait(1).to({x:1181.75,y:53.35},0).wait(1).to({x:1180.05,y:72.45},0).wait(1).to({x:1178.35,y:91.45},0).wait(1).to({x:1176.7,y:110.55},0).wait(1).to({x:1175,y:129.6},0).wait(1).to({x:1173.3,y:148.7},0).wait(1).to({x:1171.65,y:167.8},0).wait(1).to({x:1169.95,y:186.85},0).wait(1).to({x:1168.25,y:205.95},0).wait(1).to({x:1166.55,y:225},0).wait(1).to({x:1164.9,y:244.1},0).wait(1).to({x:1163.2,y:263.2},0).wait(1).to({x:1161.5,y:282.25},0).wait(1).to({x:1159.85,y:301.35},0).wait(1).to({x:1158.15,y:320.4},0).wait(1).to({x:1156.45,y:339.5},0).wait(1).to({x:1154.75,y:358.55},0).wait(1).to({x:1153.1,y:377.65},0).wait(1).to({x:1151.4,y:396.75},0).wait(1).to({x:1149.7,y:415.8},0).wait(1).to({x:1148.05,y:434.9},0).wait(1).to({x:1146.35,y:453.95},0).wait(1).to({x:1144.65,y:473.05},0).wait(1).to({x:1142.95,y:492.1},0).wait(1).to({x:1141.3,y:511.2},0).wait(1).to({x:1139.6,y:530.3},0).wait(1).to({x:1137.9,y:549.35},0).wait(1).to({x:1136.25,y:568.45},0).wait(1).to({x:1134.55,y:587.5},0).wait(1).to({x:1132.85,y:606.6},0).wait(1).to({x:1131.2,y:625.7},0).wait(1).to({x:1125.2,y:610.15},0).wait(1).to({x:1119.25,y:594.65},0).wait(1).to({x:1113.3,y:579.15},0).wait(1).to({x:1107.35,y:563.6},0).wait(1).to({x:1101.4,y:548.1},0).wait(1).to({x:1095.45,y:532.6},0).wait(1).to({x:1089.5,y:517.05},0).wait(1).to({x:1083.55,y:501.55},0).wait(1).to({x:1077.6,y:486.05},0).wait(1).to({x:1071.65,y:470.55},0).wait(1).to({x:1065.7,y:455},0).wait(1).to({x:1059.75,y:439.5},0).wait(1).to({x:1053.75,y:424},0).wait(1).to({x:1047.8,y:408.45},0).wait(1).to({x:1041.85,y:392.95},0).wait(1).to({x:1035.9,y:377.45},0).wait(1).to({x:1029.95,y:361.95},0).wait(1).to({x:1024,y:346.4},0).wait(1).to({x:1018.05,y:330.9},0).wait(1).to({x:1012.1,y:315.4},0).wait(1).to({x:1006.15,y:299.85},0).wait(1).to({x:1000.2,y:284.35},0).wait(1).to({x:994.25,y:268.85},0).wait(1).to({x:988.3,y:253.35},0).wait(1).to({x:981.15,y:271.05},0).wait(1).to({x:974.05,y:288.8},0).wait(1).to({x:966.9,y:306.5},0).wait(1).to({x:959.8,y:324.25},0).wait(1).to({x:952.65,y:341.95},0).wait(1).to({x:945.55,y:359.7},0).wait(1).to({x:938.45,y:377.45},0).wait(1).to({x:931.3,y:395.15},0).wait(1).to({x:924.2,y:412.9},0).wait(1).to({x:917.05,y:430.6},0).wait(1).to({x:909.95,y:448.35},0).wait(1).to({x:902.8,y:466.05},0).wait(1).to({x:895.7,y:483.8},0).wait(1).to({x:888.6,y:501.55},0).wait(1).to({x:881.45,y:519.25},0).wait(1).to({x:874.35,y:537},0).wait(1).to({x:867.2,y:554.7},0).wait(1).to({x:860.1,y:572.45},0).wait(1).to({x:852.95,y:590.15},0).wait(1).to({x:845.85,y:607.9},0).wait(1).to({x:838.75,y:625.65},0).wait(1).to({x:835,y:617.35},0).wait(1).to({x:831.3,y:609.1},0).wait(1).to({x:827.55,y:600.8},0).wait(1).to({x:823.85,y:592.55},0).wait(1).to({x:820.1,y:584.25},0).wait(1).to({x:816.4,y:576},0).wait(1).to({x:812.65,y:567.75},0).wait(1).to({x:808.95,y:559.45},0).wait(1).to({x:805.25,y:551.2},0).wait(1).to({x:801.5,y:542.9},0).wait(1).to({x:797.8,y:534.65},0).wait(1).to({x:794.05,y:526.35},0).wait(1).to({x:790.35,y:518.1},0).wait(1).to({x:786.6,y:509.85},0).wait(1).to({x:782.9,y:501.55},0).wait(1).to({x:779.15,y:493.3},0).wait(1).to({x:775.45,y:485},0).wait(1).to({x:771.75,y:476.75},0).wait(1).to({x:768,y:468.45},0).wait(1).to({x:764.3,y:460.2},0).wait(1).to({x:760.55,y:451.95},0).wait(1).to({x:756.85,y:443.65},0).wait(1).to({x:753.1,y:435.4},0).wait(1).to({x:749.4,y:427.1},0).wait(1).to({x:745.65,y:418.85},0).wait(1).to({x:741.95,y:410.6},0).wait(1).to({x:738.25,y:402.3},0).wait(1).to({x:734.5,y:394.05},0).wait(1).to({x:730.8,y:385.75},0).wait(1).to({x:727.05,y:377.5},0).wait(1).to({x:723.35,y:369.2},0).wait(1).to({x:719.6,y:360.95},0).wait(1).to({x:715.9,y:352.7},0).wait(1).to({x:712.15,y:344.4},0).wait(1).to({x:708.45,y:336.15},0).wait(1).to({x:704.75,y:327.85},0).wait(1).to({x:701,y:319.6},0).wait(1).to({x:697.3,y:311.3},0).wait(1).to({x:693.55,y:303.05},0).wait(1).to({x:689.85,y:294.8},0).wait(1).to({x:686.1,y:286.5},0).wait(1).to({x:682.4,y:278.25},0).wait(1).to({x:678.65,y:269.95},0).wait(1).to({x:674.95,y:261.7},0).wait(1).to({x:671.25,y:253.45},0).wait(1).to({x:664.1,y:262.3},0).wait(1).to({x:657,y:271.15},0).wait(1).to({x:649.9,y:280},0).wait(1).to({x:642.8,y:288.9},0).wait(1).to({x:635.7,y:297.75},0).wait(1).to({x:628.6,y:306.6},0).wait(1).to({x:621.5,y:315.5},0).wait(1).to({x:614.4,y:324.35},0).wait(1).to({x:607.25,y:333.2},0).wait(1).to({x:600.15,y:342.1},0).wait(1).to({x:593.05,y:350.95},0).wait(1).to({x:585.95,y:359.8},0).wait(1).to({x:578.85,y:368.7},0).wait(1).to({x:571.75,y:377.55},0).wait(1).to({x:564.65,y:386.4},0).wait(1).to({x:557.55,y:395.3},0).wait(1).to({x:550.4,y:404.15},0).wait(1).to({x:543.3,y:413},0).wait(1).to({x:536.2,y:421.9},0).wait(1).to({x:529.1,y:430.75},0).wait(1).to({x:522,y:439.6},0).wait(1).to({x:514.9,y:448.45},0).wait(1).to({x:507.8,y:457.35},0).wait(1).to({x:500.7,y:466.2},0).wait(1).to({x:493.55,y:475.05},0).wait(1).to({x:486.45,y:483.95},0).wait(1).to({x:479.35,y:492.8},0).wait(1).to({x:472.25,y:501.65},0).wait(1).to({x:465.15,y:510.55},0).wait(1).to({x:458.05,y:519.4},0).wait(1).to({x:450.95,y:528.25},0).wait(1).to({x:443.85,y:537.15},0).wait(1).to({x:436.7,y:546},0).wait(1).to({x:429.6,y:554.85},0).wait(1).to({x:422.5,y:563.75},0).wait(1).to({x:415.4,y:572.6},0).wait(1).to({x:408.3,y:581.45},0).wait(1).to({x:401.2,y:590.35},0).wait(1).to({x:394.1,y:599.2},0).wait(1).to({x:387,y:608.05},0).wait(1).to({x:379.9,y:616.95},0).wait(1).to({x:389.35,y:609.3},0).wait(1).to({x:398.85,y:601.65},0).wait(1).to({x:408.35,y:594},0).wait(1).to({x:417.85,y:586.35},0).wait(1).to({x:427.3,y:578.7},0).wait(1).to({x:436.8,y:571.1},0).wait(1).to({x:446.3,y:563.45},0).wait(1).to({x:455.8,y:555.8},0).wait(1).to({x:465.3,y:548.15},0).wait(1).to({x:474.75,y:540.5},0).wait(1).to({x:484.25,y:532.9},0).wait(1).to({x:493.75,y:525.25},0).wait(1).to({x:503.25,y:517.6},0).wait(1).to({x:512.7,y:509.95},0).wait(1).to({x:522.2,y:502.3},0).wait(1).to({x:531.7,y:494.7},0).wait(1).to({x:541.2,y:487.05},0).wait(1).to({x:550.7,y:479.4},0).wait(1).to({x:560.15,y:471.75},0).wait(1).to({x:569.65,y:464.1},0).wait(1).to({x:579.15,y:456.5},0).wait(1).to({x:588.65,y:448.85},0).wait(1).to({x:598.1,y:441.2},0).wait(1).to({x:607.6,y:433.55},0).wait(1).to({x:617.1,y:425.9},0).wait(1).to({x:626.6,y:418.3},0).wait(1).to({x:636.1,y:410.65},0).wait(1).to({x:645.55,y:403},0).wait(1).to({x:655.05,y:395.35},0).wait(1).to({x:664.55,y:387.7},0).wait(1).to({x:674.05,y:380.1},0).wait(1).to({x:683.5,y:372.45},0).wait(1).to({x:693,y:364.8},0).wait(1).to({x:702.5,y:357.15},0).wait(1).to({x:712,y:349.5},0).wait(1).to({x:721.5,y:341.9},0).wait(1).to({x:730.95,y:334.25},0).wait(1).to({x:740.45,y:326.6},0).wait(1).to({x:749.95,y:318.95},0).wait(1).to({x:759.45,y:311.3},0).wait(1).to({x:768.95,y:303.7},0).wait(1).to({x:774.2,y:311.55},0).wait(1).to({x:779.45,y:319.45},0).wait(1).to({x:784.75,y:327.35},0).wait(1).to({x:790,y:335.25},0).wait(1).to({x:795.3,y:343.15},0).wait(1).to({x:800.55,y:351.05},0).wait(1).to({x:805.85,y:358.95},0).wait(1).to({x:811.1,y:366.85},0).wait(1).to({x:816.4,y:374.7},0).wait(1).to({x:821.65,y:382.6},0).wait(1).to({x:826.95,y:390.5},0).wait(1).to({x:832.2,y:398.4},0).wait(1).to({x:837.5,y:406.3},0).wait(1).to({x:842.75,y:414.2},0).wait(1).to({x:848,y:422.1},0).wait(1).to({x:853.3,y:430},0).wait(1).to({x:858.55,y:437.9},0).wait(1).to({x:863.85,y:445.75},0).wait(1).to({x:869.1,y:453.65},0).wait(1).to({x:874.4,y:461.55},0).wait(1).to({x:879.65,y:469.45},0).wait(1).to({x:884.95,y:477.35},0).wait(1).to({x:890.2,y:485.25},0).wait(1).to({x:895.5,y:493.15},0).wait(1).to({x:900.75,y:501.05},0).wait(1).to({x:906.05,y:508.9},0).wait(1).to({x:911.3,y:516.8},0).wait(1).to({x:916.6,y:524.7},0).wait(1).to({x:921.85,y:532.6},0).wait(1).to({x:927.1,y:540.5},0).wait(1).to({x:932.4,y:548.4},0).wait(1).to({x:937.65,y:556.3},0).wait(1).to({x:942.95,y:564.2},0).wait(1).to({x:948.2,y:572.1},0).wait(1).to({x:953.5,y:579.95},0).wait(1).to({x:958.75,y:587.85},0).wait(1).to({x:964.05,y:595.75},0).wait(1).to({x:969.3,y:603.65},0).wait(1).to({x:974.6,y:611.55},0).wait(1).to({x:979.85,y:619.45},0).wait(1).to({x:985.15,y:627.35},0).wait(1).to({x:990.4,y:635.25},0).wait(1).to({x:995.7,y:643.15},0).wait(1).to({x:1001.05,y:631.85},0).wait(1).to({x:1006.4,y:620.55},0).wait(1).to({x:1011.8,y:609.3},0).wait(1).to({x:1017.15,y:598},0).wait(1).to({x:1022.5,y:586.75},0).wait(1).to({x:1027.9,y:575.45},0).wait(1).to({x:1033.25,y:564.2},0).wait(1).to({x:1038.6,y:552.9},0).wait(1).to({x:1044,y:541.65},0).wait(1).to({x:1049.35,y:530.35},0).wait(1).to({x:1054.7,y:519.1},0).wait(1).to({x:1060.1,y:507.8},0).wait(1).to({x:1065.45,y:496.55},0).wait(1).to({x:1070.85,y:485.25},0).wait(1).to({x:1076.2,y:474},0).wait(1).to({x:1081.55,y:462.7},0).wait(1).to({x:1086.95,y:451.45},0).wait(1).to({x:1092.3,y:440.15},0).wait(1).to({x:1097.65,y:428.85},0).wait(1).to({x:1103.05,y:417.6},0).wait(1).to({x:1108.4,y:406.3},0).wait(1).to({x:1113.75,y:395.05},0).wait(1).to({x:1119.15,y:383.75},0).wait(1).to({x:1124.5,y:372.5},0).wait(1).to({x:1129.9,y:361.2},0).wait(1).to({x:1135.25,y:349.95},0).wait(1).to({x:1140.6,y:338.65},0).wait(1).to({x:1146,y:327.4},0).wait(1).to({x:1151.35,y:316.1},0).wait(1).to({x:1156.7,y:304.85},0).wait(1).to({x:1162.1,y:293.55},0).wait(1).to({x:1167.45,y:282.3},0).wait(1).to({x:1172.8,y:271},0).wait(1).to({x:1178.2,y:259.75},0).wait(1).to({x:1183.55,y:248.45},0).wait(1).to({x:1188.95,y:237.2},0).wait(1).to({x:1179.8,y:257.15},0).wait(1).to({x:1170.65,y:277.15},0).wait(1).to({x:1161.5,y:297.1},0).wait(1).to({x:1152.4,y:317.1},0).wait(1).to({x:1143.25,y:337.05},0).wait(1).to({x:1134.1,y:357.05},0).wait(1).to({x:1125,y:377.05},0).wait(1).to({x:1115.85,y:397},0).wait(1).to({x:1106.7,y:417},0).wait(1).to({x:1097.55,y:436.95},0).wait(1).to({x:1088.45,y:456.95},0).wait(1).to({x:1079.3,y:476.9},0).wait(1).to({x:1070.15,y:496.9},0).wait(1).to({x:1061.05,y:516.9},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_סמיילימאוהב = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// סמיילימאוהב
	this.instance = new lib.סמיילי_מאוהב("synched",0);
	this.instance.setTransform(323.95,-75.35,0.7307,0.6901,0,0,0,109.5,109);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(369).to({_off:false},0).wait(1).to({regX:109,x:324.05,y:-55.15},0).wait(1).to({x:324.55,y:-34.95},0).wait(1).to({x:325,y:-14.75},0).wait(1).to({x:325.5,y:5.45},0).wait(1).to({x:325.95,y:25.6},0).wait(1).to({x:326.45,y:45.8},0).wait(1).to({x:326.95,y:66},0).wait(1).to({x:327.4,y:86.15},0).wait(1).to({x:327.9,y:106.3},0).wait(1).to({x:328.35,y:126.5},0).wait(1).to({x:328.85,y:146.7},0).wait(1).to({x:329.35,y:166.9},0).wait(1).to({x:329.8,y:187.05},0).wait(1).to({x:330.3,y:207.25},0).wait(1).to({x:330.75,y:227.45},0).wait(1).to({x:331.25,y:247.65},0).wait(1).to({x:331.75,y:267.85},0).wait(1).to({x:332.2,y:288},0).wait(1).to({x:332.7,y:308.2},0).wait(1).to({x:333.15,y:328.4},0).wait(1).to({x:333.65,y:348.6},0).wait(1).to({x:334.15,y:368.75},0).wait(1).to({x:334.6,y:388.95},0).wait(1).to({x:335.1,y:409.15},0).wait(1).to({x:335.55,y:429.35},0).wait(1).to({x:336.05,y:449.55},0).wait(1).to({x:336.55,y:469.7},0).wait(1).to({x:337,y:489.9},0).wait(1).to({x:337.5,y:510.1},0).wait(1).to({x:337.95,y:530.3},0).wait(1).to({x:338.45,y:550.45},0).wait(1).to({x:338.95,y:570.65},0).wait(1).to({x:339.4,y:590.85},0).wait(1).to({x:339.9,y:611.05},0).wait(1).to({x:340.35,y:631.2},0).wait(1).to({x:351.8,y:620.9},0).wait(1).to({x:363.2,y:610.55},0).wait(1).to({x:374.6,y:600.2},0).wait(1).to({x:386,y:589.85},0).wait(1).to({x:397.4,y:579.5},0).wait(1).to({x:408.85,y:569.15},0).wait(1).to({x:420.25,y:558.8},0).wait(1).to({x:431.65,y:548.5},0).wait(1).to({x:443.05,y:538.15},0).wait(1).to({x:454.45,y:527.8},0).wait(1).to({x:465.9,y:517.45},0).wait(1).to({x:477.3,y:507.1},0).wait(1).to({x:488.7,y:496.75},0).wait(1).to({x:500.1,y:486.4},0).wait(1).to({x:511.5,y:476.05},0).wait(1).to({x:522.1,y:485},0).wait(1).to({x:532.65,y:493.95},0).wait(1).to({x:543.2,y:502.9},0).wait(1).to({x:553.75,y:511.85},0).wait(1).to({x:564.3,y:520.8},0).wait(1).to({x:574.9,y:529.75},0).wait(1).to({x:585.45,y:538.7},0).wait(1).to({x:596,y:547.65},0).wait(1).to({x:606.55,y:556.6},0).wait(1).to({x:617.1,y:565.55},0).wait(1).to({x:627.65,y:574.5},0).wait(1).to({x:638.25,y:583.45},0).wait(1).to({x:648.8,y:592.4},0).wait(1).to({x:659.35,y:601.35},0).wait(1).to({x:669.9,y:610.3},0).wait(1).to({x:680.45,y:619.25},0).wait(1).to({x:691,y:628.15},0).wait(1).to({x:699.2,y:617.7},0).wait(1).to({x:707.4,y:607.25},0).wait(1).to({x:715.55,y:596.8},0).wait(1).to({x:723.75,y:586.35},0).wait(1).to({x:731.9,y:575.9},0).wait(1).to({x:740.1,y:565.45},0).wait(1).to({x:748.3,y:554.95},0).wait(1).to({x:756.45,y:544.5},0).wait(1).to({x:764.65,y:534.05},0).wait(1).to({x:772.8,y:523.6},0).wait(1).to({x:781,y:513.15},0).wait(1).to({x:789.15,y:502.7},0).wait(1).to({x:797.35,y:492.2},0).wait(1).to({x:805.55,y:481.75},0).wait(1).to({x:813.7,y:471.3},0).wait(1).to({x:821.9,y:460.85},0).wait(1).to({x:830.05,y:450.4},0).wait(1).to({x:838.25,y:439.95},0).wait(1).to({x:846.4,y:429.45},0).wait(1).to({x:854.6,y:419},0).wait(1).to({x:862.8,y:408.55},0).wait(1).to({x:870.95,y:398.1},0).wait(1).to({x:879.15,y:387.65},0).wait(1).to({x:887.3,y:377.2},0).wait(1).to({x:895.5,y:366.75},0).wait(1).to({x:903.7,y:356.25},0).wait(1).to({x:911.85,y:345.8},0).wait(1).to({x:920.05,y:335.35},0).wait(1).to({x:928.2,y:324.9},0).wait(1).to({x:936.4,y:314.45},0).wait(1).to({x:944.55,y:304},0).wait(1).to({x:952.75,y:293.5},0).wait(1).to({x:960.95,y:283.05},0).wait(1).to({x:969.1,y:272.6},0).wait(1).to({x:977.3,y:262.15},0).wait(1).to({x:985.45,y:251.7},0).wait(1).to({x:993.65,y:241.25},0).wait(1).to({x:1001.8,y:230.75},0).wait(1).to({x:1006.35,y:240.2},0).wait(1).to({x:1010.9,y:249.6},0).wait(1).to({x:1015.45,y:259.05},0).wait(1).to({x:1020,y:268.45},0).wait(1).to({x:1024.55,y:277.9},0).wait(1).to({x:1029.05,y:287.3},0).wait(1).to({x:1033.6,y:296.75},0).wait(1).to({x:1038.15,y:306.15},0).wait(1).to({x:1042.7,y:315.6},0).wait(1).to({x:1047.25,y:325},0).wait(1).to({x:1051.8,y:334.45},0).wait(1).to({x:1056.3,y:343.85},0).wait(1).to({x:1060.85,y:353.3},0).wait(1).to({x:1065.4,y:362.7},0).wait(1).to({x:1069.95,y:372.15},0).wait(1).to({x:1074.5,y:381.55},0).wait(1).to({x:1079.05,y:391},0).wait(1).to({x:1083.55,y:400.4},0).wait(1).to({x:1088.1,y:409.85},0).wait(1).to({x:1092.65,y:419.25},0).wait(1).to({x:1097.2,y:428.65},0).wait(1).to({x:1101.75,y:438.1},0).wait(1).to({x:1106.3,y:447.5},0).wait(1).to({x:1110.8,y:456.95},0).wait(1).to({x:1115.35,y:466.35},0).wait(1).to({x:1119.9,y:475.8},0).wait(1).to({x:1124.45,y:485.2},0).wait(1).to({x:1129,y:494.65},0).wait(1).to({x:1133.55,y:504.05},0).wait(1).to({x:1138.05,y:513.5},0).wait(1).to({x:1142.6,y:522.9},0).wait(1).to({x:1147.15,y:532.35},0).wait(1).to({x:1151.7,y:541.75},0).wait(1).to({x:1156.25,y:551.2},0).wait(1).to({x:1160.8,y:560.6},0).wait(1).to({x:1165.3,y:570.05},0).wait(1).to({x:1169.85,y:579.45},0).wait(1).to({x:1174.4,y:588.9},0).wait(1).to({x:1178.95,y:598.3},0).wait(1).to({x:1183.5,y:607.75},0).wait(1).to({x:1188.05,y:617.15},0).wait(1).to({x:1192.55,y:626.55},0).wait(1).to({x:1183.6,y:615.65},0).wait(1).to({x:1174.6,y:604.75},0).wait(1).to({x:1165.6,y:593.85},0).wait(1).to({x:1156.6,y:582.9},0).wait(1).to({x:1147.6,y:572},0).wait(1).to({x:1138.65,y:561.1},0).wait(1).to({x:1129.65,y:550.15},0).wait(1).to({x:1120.65,y:539.25},0).wait(1).to({x:1111.65,y:528.35},0).wait(1).to({x:1102.65,y:517.4},0).wait(1).to({x:1093.65,y:506.5},0).wait(1).to({x:1084.7,y:495.6},0).wait(1).to({x:1075.7,y:484.7},0).wait(1).to({x:1066.7,y:473.75},0).wait(1).to({x:1057.7,y:462.85},0).wait(1).to({x:1048.7,y:451.95},0).wait(1).to({x:1039.7,y:441},0).wait(1).to({x:1030.75,y:430.1},0).wait(1).to({x:1021.75,y:419.2},0).wait(1).to({x:1012.75,y:408.25},0).wait(1).to({x:1003.75,y:397.35},0).wait(1).to({x:994.75,y:386.45},0).wait(1).to({x:985.75,y:375.55},0).wait(1).to({x:976.8,y:364.6},0).wait(1).to({x:967.8,y:353.7},0).wait(1).to({x:958.8,y:342.8},0).wait(1).to({x:949.8,y:331.85},0).wait(1).to({x:940.8,y:320.95},0).wait(1).to({x:931.85,y:310.05},0).wait(1).to({x:922.85,y:299.1},0).wait(1).to({x:913.85,y:288.2},0).wait(1).to({x:904.85,y:277.3},0).wait(1).to({x:895.85,y:266.4},0).wait(1).to({x:886.85,y:255.45},0).wait(1).to({x:877.9,y:244.55},0).wait(1).to({x:868.9,y:233.65},0).wait(1).to({x:859.9,y:222.7},0).wait(1).to({x:850.9,y:211.8},0).wait(1).to({x:841.9,y:200.9},0).wait(1).to({x:832.9,y:189.95},0).wait(1).to({x:824.75,y:203.5},0).wait(1).to({x:816.55,y:217},0).wait(1).to({x:808.4,y:230.5},0).wait(1).to({x:800.2,y:244},0).wait(1).to({x:792.05,y:257.5},0).wait(1).to({x:783.85,y:271},0).wait(1).to({x:775.7,y:284.5},0).wait(1).to({x:767.5,y:298},0).wait(1).to({x:759.3,y:311.5},0).wait(1).to({x:751.15,y:325},0).wait(1).to({x:742.95,y:338.5},0).wait(1).to({x:734.8,y:352},0).wait(1).to({x:726.6,y:365.5},0).wait(1).to({x:718.45,y:379},0).wait(1).to({x:710.25,y:392.5},0).wait(1).to({x:702.05,y:406},0).wait(1).to({x:693.9,y:419.55},0).wait(1).to({x:685.7,y:433.05},0).wait(1).to({x:677.55,y:446.55},0).wait(1).to({x:669.35,y:460.05},0).wait(1).to({x:661.2,y:473.55},0).wait(1).to({x:653,y:487.05},0).wait(1).to({x:644.85,y:500.55},0).wait(1).to({x:636.65,y:514.05},0).wait(1).to({x:628.45,y:527.55},0).wait(1).to({x:620.3,y:541.05},0).wait(1).to({x:612.1,y:554.55},0).wait(1).to({x:603.95,y:568.05},0).wait(1).to({x:595.75,y:581.55},0).wait(1).to({x:587.6,y:595.05},0).wait(1).to({x:579.4,y:608.55},0).wait(1).to({x:571.2,y:622.05},0).wait(1).to({x:557.8,y:600.45},0).wait(1).to({x:544.4,y:578.85},0).wait(1).to({x:531,y:557.25},0).wait(1).to({x:517.55,y:535.65},0).wait(1).to({x:504.15,y:514.05},0).wait(1).to({x:490.75,y:492.4},0).wait(1).to({x:477.35,y:470.8},0).wait(1).to({x:463.9,y:449.2},0).wait(1).to({x:450.5,y:427.6},0).wait(1).to({x:437.1,y:406},0).wait(1).to({x:423.65,y:384.35},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_סמייליכוכבים = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// סמייליכוכבים
	this.instance = new lib.סמיילי_כוכבים("synched",0);
	this.instance.setTransform(584.35,-52.85,0.8897,0.8897,0,0,0,89.4,86);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(404).to({_off:false},0).wait(1).to({regX:89.8,regY:88.5,x:585.55,y:-31.55},0).wait(1).to({x:586.4,y:-12.5},0).wait(1).to({x:587.3,y:6.5},0).wait(1).to({x:588.15,y:25.55},0).wait(1).to({x:589.05,y:44.55},0).wait(1).to({x:589.9,y:63.6},0).wait(1).to({x:590.8,y:82.6},0).wait(1).to({x:591.65,y:101.6},0).wait(1).to({x:592.55,y:120.65},0).wait(1).to({x:593.4,y:139.65},0).wait(1).to({x:594.3,y:158.7},0).wait(1).to({x:595.15,y:177.75},0).wait(1).to({x:596.05,y:196.75},0).wait(1).to({x:596.9,y:215.8},0).wait(1).to({x:597.8,y:234.8},0).wait(1).to({x:598.65,y:253.85},0).wait(1).to({x:599.55,y:272.9},0).wait(1).to({x:600.4,y:291.9},0).wait(1).to({x:601.3,y:310.95},0).wait(1).to({x:602.15,y:329.95},0).wait(1).to({x:603.05,y:349},0).wait(1).to({x:603.9,y:368.05},0).wait(1).to({x:604.8,y:387.05},0).wait(1).to({x:605.65,y:406.1},0).wait(1).to({x:606.55,y:425.1},0).wait(1).to({x:607.4,y:444.15},0).wait(1).to({x:608.3,y:463.2},0).wait(1).to({x:609.15,y:482.2},0).wait(1).to({x:610.05,y:501.25},0).wait(1).to({x:610.9,y:520.25},0).wait(1).to({x:611.8,y:539.3},0).wait(1).to({x:612.65,y:558.35},0).wait(1).to({x:613.55,y:577.35},0).wait(1).to({x:614.4,y:596.4},0).wait(1).to({x:615.25,y:615.4},0).wait(1).to({x:602.8,y:608.1},0).wait(1).to({x:590.35,y:600.75},0).wait(1).to({x:577.9,y:593.4},0).wait(1).to({x:565.45,y:586.05},0).wait(1).to({x:553,y:578.7},0).wait(1).to({x:540.55,y:571.4},0).wait(1).to({x:528.1,y:564.05},0).wait(1).to({x:515.6,y:556.7},0).wait(1).to({x:503.15,y:549.35},0).wait(1).to({x:490.7,y:542},0).wait(1).to({x:478.25,y:534.7},0).wait(1).to({x:465.8,y:527.35},0).wait(1).to({x:453.35,y:520},0).wait(1).to({x:440.9,y:512.65},0).wait(1).to({x:428.4,y:505.3},0).wait(1).to({x:423,y:512.8},0).wait(1).to({x:417.55,y:520.3},0).wait(1).to({x:412.1,y:527.8},0).wait(1).to({x:406.65,y:535.3},0).wait(1).to({x:401.25,y:542.8},0).wait(1).to({x:395.8,y:550.3},0).wait(1).to({x:390.35,y:557.8},0).wait(1).to({x:384.9,y:565.3},0).wait(1).to({x:379.5,y:572.75},0).wait(1).to({x:374.05,y:580.25},0).wait(1).to({x:368.6,y:587.75},0).wait(1).to({x:363.15,y:595.25},0).wait(1).to({x:357.75,y:602.75},0).wait(1).to({x:352.3,y:610.25},0).wait(1).to({x:346.85,y:617.75},0).wait(1).to({x:341.4,y:625.25},0).wait(1).to({x:335.95,y:632.7},0).wait(1).to({x:342.6,y:622.75},0).wait(1).to({x:349.25,y:612.75},0).wait(1).to({x:355.9,y:602.75},0).wait(1).to({x:362.55,y:592.8},0).wait(1).to({x:369.2,y:582.8},0).wait(1).to({x:375.85,y:572.8},0).wait(1).to({x:382.45,y:562.8},0).wait(1).to({x:389.1,y:552.85},0).wait(1).to({x:395.75,y:542.85},0).wait(1).to({x:402.4,y:532.85},0).wait(1).to({x:409.05,y:522.9},0).wait(1).to({x:415.7,y:512.9},0).wait(1).to({x:422.35,y:502.9},0).wait(1).to({x:429,y:492.9},0).wait(1).to({x:435.6,y:482.95},0).wait(1).to({x:442.25,y:472.95},0).wait(1).to({x:448.9,y:462.95},0).wait(1).to({x:455.55,y:452.95},0).wait(1).to({x:462.2,y:443},0).wait(1).to({x:468.85,y:433},0).wait(1).to({x:475.5,y:423},0).wait(1).to({x:482.1,y:413.05},0).wait(1).to({x:488.75,y:403.05},0).wait(1).to({x:495.4,y:393.05},0).wait(1).to({x:502.05,y:383.05},0).wait(1).to({x:508.7,y:373.1},0).wait(1).to({x:515.35,y:363.1},0).wait(1).to({x:522,y:353.1},0).wait(1).to({x:528.6,y:343.15},0).wait(1).to({x:535.25,y:333.15},0).wait(1).to({x:541.9,y:323.15},0).wait(1).to({x:548.55,y:313.15},0).wait(1).to({x:555.2,y:303.2},0).wait(1).to({x:561.85,y:293.2},0).wait(1).to({x:568.5,y:283.2},0).wait(1).to({x:575.1,y:273.25},0).wait(1).to({x:581.75,y:263.25},0).wait(1).to({x:588.4,y:253.25},0).wait(1).to({x:595.05,y:243.25},0).wait(1).to({x:601.7,y:233.3},0).wait(1).to({x:608.35,y:223.3},0).wait(1).to({x:615,y:213.3},0).wait(1).to({x:621.6,y:203.3},0).wait(1).to({x:628.4,y:212.8},0).wait(1).to({x:635.2,y:222.3},0).wait(1).to({x:642,y:231.8},0).wait(1).to({x:648.75,y:241.3},0).wait(1).to({x:655.55,y:250.8},0).wait(1).to({x:662.35,y:260.3},0).wait(1).to({x:669.15,y:269.8},0).wait(1).to({x:675.9,y:279.3},0).wait(1).to({x:682.7,y:288.8},0).wait(1).to({x:689.5,y:298.3},0).wait(1).to({x:696.3,y:307.8},0).wait(1).to({x:703.05,y:317.3},0).wait(1).to({x:709.85,y:326.8},0).wait(1).to({x:716.65,y:336.3},0).wait(1).to({x:723.4,y:345.8},0).wait(1).to({x:730.2,y:355.3},0).wait(1).to({x:737,y:364.8},0).wait(1).to({x:743.8,y:374.3},0).wait(1).to({x:750.55,y:383.8},0).wait(1).to({x:757.35,y:393.3},0).wait(1).to({x:764.15,y:402.8},0).wait(1).to({x:770.95,y:412.3},0).wait(1).to({x:777.7,y:421.8},0).wait(1).to({x:784.5,y:431.3},0).wait(1).to({x:791.3,y:440.8},0).wait(1).to({x:798.1,y:450.3},0).wait(1).to({x:804.85,y:459.8},0).wait(1).to({x:811.65,y:469.3},0).wait(1).to({x:818.45,y:478.8},0).wait(1).to({x:825.2,y:488.3},0).wait(1).to({x:832,y:497.8},0).wait(1).to({x:838.8,y:507.3},0).wait(1).to({x:845.6,y:516.8},0).wait(1).to({x:852.35,y:526.3},0).wait(1).to({x:859.15,y:535.8},0).wait(1).to({x:865.95,y:545.3},0).wait(1).to({x:872.75,y:554.8},0).wait(1).to({x:879.5,y:564.3},0).wait(1).to({x:886.3,y:573.8},0).wait(1).to({x:893.1,y:583.3},0).wait(1).to({x:899.9,y:592.8},0).wait(1).to({x:906.65,y:602.3},0).wait(1).to({x:913.45,y:611.8},0).wait(1).to({x:920.25,y:621.3},0).wait(1).to({x:927,y:630.8},0).wait(1).to({x:932.9,y:615.5},0).wait(1).to({x:938.8,y:600.15},0).wait(1).to({x:944.7,y:584.8},0).wait(1).to({x:950.6,y:569.45},0).wait(1).to({x:956.45,y:554.1},0).wait(1).to({x:962.35,y:538.75},0).wait(1).to({x:968.25,y:523.4},0).wait(1).to({x:974.15,y:508.1},0).wait(1).to({x:980.05,y:492.75},0).wait(1).to({x:985.9,y:477.4},0).wait(1).to({x:991.8,y:462.05},0).wait(1).to({x:997.7,y:446.7},0).wait(1).to({x:1003.6,y:431.35},0).wait(1).to({x:1009.5,y:416},0).wait(1).to({x:1015.35,y:400.7},0).wait(1).to({x:1021.25,y:385.35},0).wait(1).to({x:1027.15,y:370},0).wait(1).to({x:1033.05,y:354.65},0).wait(1).to({x:1038.95,y:339.3},0).wait(1).to({x:1044.8,y:323.95},0).wait(1).to({x:1050.7,y:308.6},0).wait(1).to({x:1056.6,y:293.3},0).wait(1).to({x:1062.5,y:277.95},0).wait(1).to({x:1068.4,y:262.6},0).wait(1).to({x:1074.25,y:247.25},0).wait(1).to({x:1080.15,y:231.9},0).wait(1).to({x:1086.05,y:216.55},0).wait(1).to({x:1091.95,y:201.2},0).wait(1).to({x:1097.8,y:185.85},0).wait(1).to({x:1106.35,y:208.5},0).wait(1).to({x:1114.85,y:231.1},0).wait(1).to({x:1123.35,y:253.75},0).wait(1).to({x:1131.85,y:276.35},0).wait(1).to({x:1140.35,y:298.95},0).wait(1).to({x:1148.85,y:321.6},0).wait(1).to({x:1157.35,y:344.2},0).wait(1).to({x:1165.85,y:366.8},0).wait(1).to({x:1174.35,y:389.45},0).wait(1).to({x:1182.85,y:412.05},0).wait(1).to({x:1191.35,y:434.65},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_סמייליבוכהמצחוק = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// סמייליבוכהמצחוק
	this.instance = new lib.סמיילי_בוכה("synched",0);
	this.instance.setTransform(820.45,-41.85,0.9999,0.9999,0,0,0,78,68.5);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(334).to({_off:false},0).wait(1).to({regX:78.3,regY:76.8,x:821.75,y:-14.05},0).wait(1).to({x:822.8,y:5.4},0).wait(1).to({x:823.85,y:24.9},0).wait(1).to({x:824.9,y:44.35},0).wait(1).to({x:825.95,y:63.85},0).wait(1).to({x:827,y:83.25},0).wait(1).to({x:828.05,y:102.7},0).wait(1).to({x:829.1,y:122.2},0).wait(1).to({x:830.15,y:141.65},0).wait(1).to({x:831.2,y:161.15},0).wait(1).to({x:832.25,y:180.6},0).wait(1).to({x:833.3,y:200.1},0).wait(1).to({x:834.35,y:219.55},0).wait(1).to({x:835.4,y:239},0).wait(1).to({x:836.45,y:258.5},0).wait(1).to({x:837.5,y:277.95},0).wait(1).to({x:838.55,y:297.45},0).wait(1).to({x:839.6,y:316.9},0).wait(1).to({x:840.65,y:336.4},0).wait(1).to({x:841.7,y:355.85},0).wait(1).to({x:842.75,y:375.3},0).wait(1).to({x:843.8,y:394.8},0).wait(1).to({x:844.85,y:414.25},0).wait(1).to({x:845.9,y:433.75},0).wait(1).to({x:846.95,y:453.2},0).wait(1).to({x:848,y:472.7},0).wait(1).to({x:849.05,y:492.15},0).wait(1).to({x:850.1,y:511.6},0).wait(1).to({x:851.15,y:531.1},0).wait(1).to({x:852.2,y:550.55},0).wait(1).to({x:853.25,y:570.05},0).wait(1).to({x:854.3,y:589.5},0).wait(1).to({x:855.35,y:609},0).wait(1).to({x:856.4,y:628.45},0).wait(1).to({x:857.45,y:647.9},0).wait(1).to({x:879.7,y:639.5},0).wait(1).to({x:901.95,y:631.1},0).wait(1).to({x:924.2,y:622.7},0).wait(1).to({x:946.45,y:614.25},0).wait(1).to({x:968.7,y:605.85},0).wait(1).to({x:990.95,y:597.45},0).wait(1).to({x:1013.2,y:589.05},0).wait(1).to({x:1035.45,y:580.6},0).wait(1).to({x:1057.7,y:572.2},0).wait(1).to({x:1079.95,y:563.8},0).wait(1).to({x:1102.2,y:555.4},0).wait(1).to({x:1124.45,y:546.95},0).wait(1).to({x:1146.7,y:538.55},0).wait(1).to({x:1168.95,y:530.15},0).wait(1).to({x:1191.2,y:521.7},0).wait(1).to({x:1180.85,y:534.25},0).wait(1).to({x:1170.5,y:546.75},0).wait(1).to({x:1160.15,y:559.25},0).wait(1).to({x:1149.8,y:571.75},0).wait(1).to({x:1139.45,y:584.25},0).wait(1).to({x:1129.1,y:596.75},0).wait(1).to({x:1118.75,y:609.25},0).wait(1).to({x:1108.4,y:621.75},0).wait(1).to({x:1098.05,y:634.25},0).wait(1).to({x:1089.9,y:618.15},0).wait(1).to({x:1081.7,y:602},0).wait(1).to({x:1073.5,y:585.9},0).wait(1).to({x:1065.3,y:569.75},0).wait(1).to({x:1057.15,y:553.65},0).wait(1).to({x:1048.95,y:537.5},0).wait(1).to({x:1040.75,y:521.4},0).wait(1).to({x:1032.55,y:505.25},0).wait(1).to({x:1024.4,y:489.15},0).wait(1).to({x:1016.2,y:473},0).wait(1).to({x:1008,y:456.9},0).wait(1).to({x:999.8,y:440.75},0).wait(1).to({x:991.6,y:424.65},0).wait(1).to({x:983.45,y:408.5},0).wait(1).to({x:975.25,y:392.4},0).wait(1).to({x:967.05,y:376.25},0).wait(1).to({x:958.85,y:360.15},0).wait(1).to({x:950.7,y:344},0).wait(1).to({x:942.5,y:327.9},0).wait(1).to({x:934.3,y:311.75},0).wait(1).to({x:926.1,y:295.65},0).wait(1).to({x:917.95,y:279.5},0).wait(1).to({x:909.75,y:263.4},0).wait(1).to({x:901.55,y:247.25},0).wait(1).to({x:893.35,y:231.15},0).wait(1).to({x:885.15,y:215},0).wait(1).to({x:879,y:226.9},0).wait(1).to({x:872.8,y:238.75},0).wait(1).to({x:866.6,y:250.6},0).wait(1).to({x:860.4,y:262.45},0).wait(1).to({x:854.2,y:274.35},0).wait(1).to({x:848,y:286.2},0).wait(1).to({x:841.8,y:298.05},0).wait(1).to({x:835.6,y:309.9},0).wait(1).to({x:829.4,y:321.8},0).wait(1).to({x:823.2,y:333.65},0).wait(1).to({x:817,y:345.5},0).wait(1).to({x:810.8,y:357.35},0).wait(1).to({x:804.6,y:369.2},0).wait(1).to({x:798.4,y:381.1},0).wait(1).to({x:792.2,y:392.95},0).wait(1).to({x:786,y:404.8},0).wait(1).to({x:779.8,y:416.65},0).wait(1).to({x:773.6,y:428.55},0).wait(1).to({x:767.4,y:440.4},0).wait(1).to({x:761.2,y:452.25},0).wait(1).to({x:755,y:464.1},0).wait(1).to({x:748.8,y:476},0).wait(1).to({x:742.6,y:487.85},0).wait(1).to({x:736.4,y:499.7},0).wait(1).to({x:730.2,y:511.55},0).wait(1).to({x:724,y:523.4},0).wait(1).to({x:717.8,y:535.3},0).wait(1).to({x:711.6,y:547.15},0).wait(1).to({x:705.4,y:559},0).wait(1).to({x:699.2,y:570.85},0).wait(1).to({x:693,y:582.75},0).wait(1).to({x:686.8,y:594.6},0).wait(1).to({x:680.6,y:606.45},0).wait(1).to({x:674.4,y:618.3},0).wait(1).to({x:668.2,y:630.15},0).wait(1).to({x:662.8,y:618.75},0).wait(1).to({x:657.4,y:607.3},0).wait(1).to({x:651.95,y:595.85},0).wait(1).to({x:646.55,y:584.4},0).wait(1).to({x:641.1,y:572.95},0).wait(1).to({x:635.7,y:561.5},0).wait(1).to({x:630.3,y:550.05},0).wait(1).to({x:624.85,y:538.6},0).wait(1).to({x:619.45,y:527.15},0).wait(1).to({x:614,y:515.7},0).wait(1).to({x:608.6,y:504.25},0).wait(1).to({x:603.15,y:492.8},0).wait(1).to({x:597.75,y:481.35},0).wait(1).to({x:592.35,y:469.9},0).wait(1).to({x:586.9,y:458.45},0).wait(1).to({x:581.5,y:447},0).wait(1).to({x:576.05,y:435.55},0).wait(1).to({x:570.65,y:424.1},0).wait(1).to({x:565.25,y:412.65},0).wait(1).to({x:559.8,y:401.2},0).wait(1).to({x:554.4,y:389.75},0).wait(1).to({x:548.95,y:378.3},0).wait(1).to({x:543.55,y:366.85},0).wait(1).to({x:538.1,y:355.4},0).wait(1).to({x:532.7,y:343.95},0).wait(1).to({x:527.3,y:332.5},0).wait(1).to({x:521.85,y:321.05},0).wait(1).to({x:516.45,y:309.6},0).wait(1).to({x:511,y:298.15},0).wait(1).to({x:505.6,y:286.7},0).wait(1).to({x:500.2,y:275.25},0).wait(1).to({x:494.75,y:263.8},0).wait(1).to({x:489.35,y:252.35},0).wait(1).to({x:483.9,y:240.9},0).wait(1).to({x:478.5,y:229.45},0).wait(1).to({x:473.05,y:218},0).wait(1).to({x:469.35,y:231.75},0).wait(1).to({x:465.6,y:245.5},0).wait(1).to({x:461.9,y:259.2},0).wait(1).to({x:458.15,y:272.95},0).wait(1).to({x:454.4,y:286.65},0).wait(1).to({x:450.7,y:300.4},0).wait(1).to({x:446.95,y:314.15},0).wait(1).to({x:443.25,y:327.85},0).wait(1).to({x:439.5,y:341.6},0).wait(1).to({x:435.75,y:355.3},0).wait(1).to({x:432.05,y:369.05},0).wait(1).to({x:428.3,y:382.8},0).wait(1).to({x:424.6,y:396.5},0).wait(1).to({x:420.85,y:410.25},0).wait(1).to({x:417.1,y:423.95},0).wait(1).to({x:413.4,y:437.7},0).wait(1).to({x:409.65,y:451.45},0).wait(1).to({x:405.95,y:465.15},0).wait(1).to({x:402.2,y:478.9},0).wait(1).to({x:398.45,y:492.6},0).wait(1).to({x:394.75,y:506.35},0).wait(1).to({x:391,y:520.1},0).wait(1).to({x:387.3,y:533.8},0).wait(1).to({x:383.55,y:547.55},0).wait(1).to({x:379.8,y:561.25},0).wait(1).to({x:376.1,y:575},0).wait(1).to({x:372.35,y:588.75},0).wait(1).to({x:368.65,y:602.45},0).wait(1).to({x:364.9,y:616.2},0).wait(1).to({x:361.15,y:629.9},0).wait(1).to({x:369.45,y:618.5},0).wait(1).to({x:377.75,y:607.1},0).wait(1).to({x:386.05,y:595.7},0).wait(1).to({x:394.35,y:584.3},0).wait(1).to({x:402.6,y:572.9},0).wait(1).to({x:410.9,y:561.5},0).wait(1).to({x:419.2,y:550.05},0).wait(1).to({x:427.5,y:538.65},0).wait(1).to({x:435.75,y:527.25},0).wait(1).to({x:444.05,y:515.85},0).wait(1).to({x:452.35,y:504.45},0).wait(1).to({x:460.65,y:493.05},0).wait(1).to({x:468.95,y:481.6},0).wait(1).to({x:477.2,y:470.2},0).wait(1).to({x:485.5,y:458.8},0).wait(1).to({x:493.8,y:447.4},0).wait(1).to({x:502.1,y:436},0).wait(1).to({x:510.35,y:424.6},0).wait(1).to({x:518.65,y:413.15},0).wait(1).to({x:526.95,y:401.75},0).wait(1).to({x:535.25,y:390.35},0).wait(1).to({x:543.55,y:378.95},0).wait(1).to({x:551.8,y:367.55},0).wait(1).to({x:560.1,y:356.15},0).wait(1).to({x:568.4,y:344.7},0).wait(1).to({x:576.7,y:333.3},0).wait(1).to({x:584.95,y:321.9},0).wait(1).to({x:593.25,y:310.5},0).wait(1).to({x:601.55,y:299.1},0).wait(1).to({x:609.85,y:287.7},0).wait(1).to({x:618.1,y:276.25},0).wait(1).to({x:623.9,y:288.9},0).wait(1).to({x:629.65,y:301.55},0).wait(1).to({x:635.4,y:314.2},0).wait(1).to({x:641.2,y:326.85},0).wait(1).to({x:646.95,y:339.5},0).wait(1).to({x:652.7,y:352.15},0).wait(1).to({x:658.5,y:364.8},0).wait(1).to({x:664.25,y:377.45},0).wait(1).to({x:670,y:390.1},0).wait(1).to({x:675.8,y:402.75},0).wait(1).to({x:681.55,y:415.4},0).wait(1).to({x:687.3,y:428.05},0).wait(1).to({x:693.1,y:440.7},0).wait(1).to({x:698.85,y:453.35},0).wait(1).to({x:704.6,y:466},0).wait(1).to({x:710.4,y:478.65},0).wait(1).to({x:716.15,y:491.3},0).wait(1).to({x:721.9,y:503.95},0).wait(1).to({x:727.7,y:516.6},0).wait(1).to({x:733.45,y:529.25},0).wait(1).to({x:739.2,y:541.9},0).wait(1).to({x:745,y:554.55},0).wait(1).to({x:750.75,y:567.2},0).wait(1).to({x:756.5,y:579.85},0).wait(1).to({x:762.3,y:592.5},0).wait(1).to({x:768.05,y:605.15},0).wait(1).to({x:773.8,y:617.8},0).wait(1).to({x:779.55,y:630.45},0).wait(1).to({x:791.85,y:612.75},0).wait(1).to({x:804.1,y:595},0).wait(1).to({x:816.35,y:577.3},0).wait(1).to({x:828.6,y:559.55},0).wait(1).to({x:840.85,y:541.85},0).wait(1).to({x:853.1,y:524.1},0).wait(1).to({x:865.35,y:506.4},0).wait(1).to({x:877.6,y:488.65},0).wait(1).to({x:889.85,y:470.95},0).wait(1).to({x:902.1,y:453.2},0).wait(1).to({x:914.35,y:435.45},0).wait(1).to({x:926.6,y:417.75},0).wait(1).to({x:938.85,y:400},0).wait(1).to({x:951.1,y:382.3},0).wait(1).to({x:963.35,y:364.55},0).wait(1).to({x:975.6,y:346.85},0).wait(1).to({x:987.85,y:329.1},0).wait(1).to({x:1000.1,y:311.4},0).wait(1).to({x:1012.35,y:293.65},0).wait(1).to({x:1024.6,y:275.9},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_בוכה_קופץ = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// בוכה_קופץ
	this.instance = new lib.סמיילי_בוכה("synched",0);
	this.instance.setTransform(754.6,575.15,0.0223,0.0223,20.1069);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(164).to({_off:false},0).wait(1).to({regX:78.3,regY:76.8,scaleX:0.0337,scaleY:0.0337,rotation:20.1164,x:751.05,y:572.7},0).wait(1).to({scaleX:0.045,scaleY:0.045,x:746.5,y:568.35},0).wait(1).to({scaleX:0.0564,scaleY:0.0564,x:742.1,y:564.3},0).wait(1).to({scaleX:0.0677,scaleY:0.0677,x:737.75,y:560.65},0).wait(1).to({scaleX:0.0791,scaleY:0.0791,x:733.45,y:557.35},0).wait(1).to({scaleX:0.0904,scaleY:0.0904,x:729.3,y:554.3},0).wait(1).to({scaleX:0.1018,scaleY:0.1018,x:725.2,y:551.65},0).wait(1).to({scaleX:0.1131,scaleY:0.1131,x:721.1,y:549.3},0).wait(1).to({scaleX:0.1244,scaleY:0.1244,x:717.2,y:547.25},0).wait(1).to({scaleX:0.1358,scaleY:0.1358,x:713.3,y:545.6},0).wait(1).to({scaleX:0.1471,scaleY:0.1471,x:709.5,y:544.2},0).wait(1).to({scaleX:0.1585,scaleY:0.1585,x:705.75,y:543.2},0).wait(1).to({scaleX:0.1698,scaleY:0.1698,x:702.15,y:542.5},0).wait(1).to({scaleX:0.1812,scaleY:0.1812,x:698.55,y:542.15},0).wait(1).to({scaleX:0.1925,scaleY:0.1925,x:695.1},0).wait(1).to({scaleX:0.2039,scaleY:0.2039,x:691.7,y:542.45},0).wait(1).to({scaleX:0.2152,scaleY:0.2152,x:688.3,y:543.05},0).wait(1).to({scaleX:0.2265,scaleY:0.2265,x:685.1,y:544.05},0).wait(1).to({scaleX:0.2379,scaleY:0.2379,x:681.95,y:545.3},0).wait(1).to({scaleX:0.2492,scaleY:0.2492,x:678.8,y:546.9},0).wait(1).to({scaleX:0.2606,scaleY:0.2606,x:675.8,y:548.85},0).wait(1).to({scaleX:0.2719,scaleY:0.2719,x:672.85,y:551.15},0).wait(1).to({scaleX:0.2833,scaleY:0.2833,x:669.95,y:553.8},0).wait(1).to({scaleX:0.2946,scaleY:0.2946,x:667.2,y:556.75},0).wait(1).to({scaleX:0.3059,scaleY:0.3059,x:664.5,y:559.95},0).wait(1).to({scaleX:0.3173,scaleY:0.3173,x:661.9,y:563.6},0).wait(1).to({scaleX:0.3286,scaleY:0.3286,x:659.3,y:567.5},0).wait(1).to({scaleX:0.34,scaleY:0.34,x:656.85,y:571.75},0).wait(1).to({scaleX:0.3513,scaleY:0.3513,x:654.5,y:576.35},0).wait(1).to({scaleX:0.3627,scaleY:0.3627,x:652.15,y:581.25},0).wait(1).to({scaleX:0.374,scaleY:0.374,x:649.9,y:586.45},0).wait(1).to({scaleX:0.3853,scaleY:0.3853,x:647.75,y:592.1},0).wait(1).to({scaleX:0.3967,scaleY:0.3967,x:645.65,y:598},0).wait(1).to({scaleX:0.408,scaleY:0.408,x:643.65,y:604.2},0).wait(1).to({scaleX:0.4194,scaleY:0.4194,x:641.75,y:610.8},0).wait(1).to({scaleX:0.4307,scaleY:0.4307,x:639.85,y:617.7},0).wait(1).to({scaleX:0.4421,scaleY:0.4421,x:638.1,y:624.95},0).wait(1).to({scaleX:0.4534,scaleY:0.4534,x:636.4,y:632.5},0).wait(1).to({scaleX:0.4648,scaleY:0.4648,x:634.75,y:640.35},0).wait(1).to({scaleX:0.4761,scaleY:0.4761,x:633.25,y:648.6},0).wait(1).to({scaleX:0.4874,scaleY:0.4874,x:631.8,y:657.15},0).wait(1).to({scaleX:0.4988,scaleY:0.4988,x:630.4,y:666.05},0).wait(1).to({scaleX:0.5101,scaleY:0.5101,x:629.1,y:675.25},0).wait(1).to({scaleX:0.5215,scaleY:0.5215,x:627.9,y:684.8},0).wait(1).to({scaleX:0.5328,scaleY:0.5328,x:626.7,y:694.65},0).wait(1).to({scaleX:0.5442,scaleY:0.5442,x:625.65,y:704.85},0).wait(1).to({scaleX:0.5555,scaleY:0.5555,x:624.65,y:715.4},0).wait(1).to({scaleX:0.5668,scaleY:0.5668,x:623.7,y:726.3},0).wait(1).to({scaleX:0.5782,scaleY:0.5782,x:622.9,y:737.45},0).wait(1).to({scaleX:0.5895,scaleY:0.5895,x:622.15,y:749},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_אייפון = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// אייפון
	this.instance = new lib.אייפון("synched",0);
	this.instance.setTransform(271.9,379.05,0.9999,0.9999,14.9959,0,0,14.3,12.3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(511).to({_off:false},0).wait(1).to({regX:14.6,regY:12.4,rotation:14.9973,x:275.1,y:392.85},0).wait(1).to({x:278,y:406.45},0).wait(1).to({x:280.9,y:420.05},0).wait(1).to({x:283.8,y:433.65},0).wait(1).to({x:286.7,y:447.25},0).wait(1).to({x:289.65,y:460.85},0).wait(1).to({x:292.55,y:474.45},0).wait(1).to({x:295.45,y:488.05},0).wait(1).to({x:298.35,y:501.65},0).wait(1).to({x:301.25,y:515.25},0).wait(1).to({x:304.15,y:528.85},0).wait(1).to({x:307.1,y:542.5},0).wait(1).to({x:310,y:556.1},0).wait(1).to({x:312.9,y:569.7},0).wait(1).to({x:315.8,y:583.3},0).wait(1).to({x:318.7,y:596.9},0).wait(1).to({x:321.6,y:610.5},0).wait(1).to({x:324.55,y:624.1},0).wait(1).to({x:327.45,y:637.7},0).wait(1).to({x:330.35,y:651.3},0).wait(1).to({x:333.25,y:664.9},0).wait(1).to({x:336.15,y:678.5},0).wait(1).to({x:339.1,y:692.1},0).wait(1).to({scaleX:0.9998,scaleY:1.1845,rotation:0,skewX:47.7831,skewY:15.3426,x:339,y:696.95},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_איש_מפיל_אייפון = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// איש_מפיל_אייפון
	this.instance = new lib.ידימיןזזה("synched",0);
	this.instance.setTransform(217.9,372.45,1,1,0,0,0,56.4,37.9);

	this.instance_1 = new lib.שארהגוף("synched",0);
	this.instance_1.setTransform(181.85,310.5,0.9996,0.9996,0,0,0,55.6,163);

	this.instance_2 = new lib.נעלוגרב("synched",0);
	this.instance_2.setTransform(256.15,681.25,0.9995,0.9995,0,0,0,51.3,27.4);

	this.instance_3 = new lib.נעלוגרב("synched",0);
	this.instance_3.setTransform(159.15,675.9,0.9999,0.9999,0,0,0,50.2,26.4);

	this.instance_4 = new lib.רגלימיןאיש("synched",0);
	this.instance_4.setTransform(147.2,571,0.9967,0.9967,17.2266,0,0,49.9,110.1);

	this.instance_5 = new lib.רגלימיןאיש("synched",0);
	this.instance_5.setTransform(211.8,572.4,0.9978,0.9978,0,0,0,47.6,109.3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},511).wait(89));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_איש = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// איש
	this.instance = new lib.אישסוף("synched",0);
	this.instance.setTransform(-140.95,435.75,1,1,0,0,0,93.9,288.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(449).to({_off:false},0).wait(1).to({x:-135.5,startPosition:1},0).wait(1).to({x:-130.05,startPosition:2},0).wait(1).to({x:-124.6,startPosition:3},0).wait(1).to({x:-119.2,startPosition:4},0).wait(1).to({x:-113.75,startPosition:5},0).wait(1).to({x:-108.3,startPosition:6},0).wait(1).to({x:-102.9,startPosition:7},0).wait(1).to({x:-97.45,startPosition:8},0).wait(1).to({x:-92,startPosition:9},0).wait(1).to({x:-86.6,startPosition:10},0).wait(1).to({x:-81.15,startPosition:11},0).wait(1).to({x:-75.7,startPosition:12},0).wait(1).to({x:-70.3,startPosition:13},0).wait(1).to({x:-64.85,startPosition:14},0).wait(1).to({x:-59.4,startPosition:15},0).wait(1).to({x:-53.95,startPosition:16},0).wait(1).to({x:-48.55,startPosition:17},0).wait(1).to({x:-43.1,startPosition:18},0).wait(1).to({x:-37.65,startPosition:19},0).wait(1).to({x:-32.25,startPosition:20},0).wait(1).to({x:-26.8,startPosition:21},0).wait(1).to({x:-21.35,startPosition:22},0).wait(1).to({x:-15.95,startPosition:23},0).wait(1).to({x:-10.5,startPosition:24},0).wait(1).to({x:-5.05,startPosition:25},0).wait(1).to({x:0.35,startPosition:26},0).wait(1).to({x:5.8,startPosition:27},0).wait(1).to({x:11.25,startPosition:28},0).wait(1).to({x:16.65,startPosition:29},0).wait(1).to({x:22.1,startPosition:30},0).wait(1).to({x:27.55,startPosition:31},0).wait(1).to({x:33,startPosition:32},0).wait(1).to({x:38.4,startPosition:33},0).wait(1).to({x:43.85,startPosition:34},0).wait(1).to({x:49.3,startPosition:35},0).wait(1).to({x:54.7,startPosition:36},0).wait(1).to({x:60.15,startPosition:37},0).wait(1).to({x:65.6,startPosition:38},0).wait(1).to({x:71,startPosition:39},0).wait(1).to({x:76.45,startPosition:40},0).wait(1).to({x:81.9,startPosition:41},0).wait(1).to({x:87.3,startPosition:42},0).wait(1).to({x:92.75,startPosition:43},0).wait(1).to({x:98.15,startPosition:44},0).wait(1).to({x:103.55,startPosition:45},0).wait(1).to({x:109,startPosition:46},0).wait(1).to({x:114.45,startPosition:47},0).wait(1).to({x:119.9,startPosition:48},0).wait(1).to({x:125.3,startPosition:49},0).wait(1).to({x:130.75,startPosition:50},0).wait(1).to({x:136.2,startPosition:51},0).wait(1).to({x:141.6,startPosition:52},0).wait(1).to({x:147.05,startPosition:53},0).wait(1).to({x:152.5,startPosition:54},0).wait(1).to({x:157.9,startPosition:55},0).wait(1).to({x:163.35,startPosition:56},0).wait(1).to({x:168.8,startPosition:57},0).wait(1).to({x:174.2,startPosition:58},0).wait(1).to({x:179.65,startPosition:59},0).wait(1).to({x:185.1,startPosition:0},0).wait(1).to({x:190.55,y:435.8,startPosition:1},0).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_finger = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// finger
	this.instance = new lib.אגודל("synched",0);
	this.instance.setTransform(708.95,590.85,0.8181,1,0.2387,0,0,19.9,23.8);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(296));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.end_smiley = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.end("synched",0);
	this.instance.setTransform(278.15,279.65,3.7536,3.7536,0,0,0,74.1,74.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.end_smiley, new cjs.Rectangle(0,0,555.5,557), null);


(lib.Symbol2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.Symbol1();
	this.instance.setTransform(302.3,371.6,1,1,0,0,0,302.3,371.6);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,623.1,743), null);


(lib.Scene_1_start_end_smiley = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// start_end_smiley
	this.start = new lib.play();
	this.start.name = "start";
	this.start.setTransform(942.8,232.55,1.8106,1.8106,0,0,0,74.2,74.3);

	this.again = new lib.end_smiley();
	this.again.name = "again";
	this.again.setTransform(657.65,383.2,0.9999,0.9999,0,0,0,277.7,278.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.start}]}).to({state:[]},1).to({state:[{t:this.again}]},598).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_man_start = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// man_start
	this.instance = new lib.Bitmap7();
	this.instance.setTransform(728.4,570.15,0.2024,0.2097,23.4723);

	this.instance_1 = new lib.Bitmap6();
	this.instance_1.setTransform(750.15,519.2,0.2014,0.2063,23.2081);

	this.instance_2 = new lib.CachedBmp_354();
	this.instance_2.setTransform(705.45,615.15,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_353();
	this.instance_3.setTransform(700.5,507,0.5,0.5);

	this.instance_4 = new lib.CachedBmp_36();
	this.instance_4.setTransform(229.8,575.9,0.5,0.5);

	this.instance_5 = new lib.עין("synched",0);
	this.instance_5.setTransform(564.75,264.25,1,1,10.4876);

	this.instance_6 = new lib.CachedBmp_3();
	this.instance_6.setTransform(307.75,49.7,0.5,0.5);

	this.instance_7 = new lib.CachedBmp_7();
	this.instance_7.setTransform(307.75,49.7,0.5,0.5);

	this.instance_8 = new lib.CachedBmp_32();
	this.instance_8.setTransform(307.75,49.7,0.5,0.5);

	this.instance_9 = new lib.CachedBmp_15();
	this.instance_9.setTransform(307.75,49.7,0.5,0.5);

	this.instance_10 = new lib.אישהתחלה();
	this.instance_10.setTransform(532.1,423.9,1,1,0,0,0,302.3,374.2);

	this.instance_11 = new lib.Symbol2();
	this.instance_11.setTransform(532.1,426.5,1,1,0,0,0,302.3,371.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance_7},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},7).to({state:[{t:this.instance_8},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},6).to({state:[{t:this.instance_9},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},7).to({state:[{t:this.instance_10}]},7).to({state:[{t:this.instance_11}]},15).to({state:[{t:this.instance_11}]},17).to({state:[{t:this.instance_11}]},40).wait(197));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.RECOVER_אנימציהסופית = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0,1,599];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.start = this.start_end_smiley.start;
		var self= this;
		self.stop();
		self.start.addEventListener("click",startplaying);
		
		function startplaying(){
		self.gotoAndPlay(0);	
		
			}
	}
	this.frame_1 = function() {
		this.start = undefined;
	}
	this.frame_599 = function() {
		this.again = this.start_end_smiley.again;
		this.___loopingOver___ = true;
		var self=this;
		self.stop();
		self.again.addEventListener("click",playAgain);
		
		function playAgain() {
			self.gotoAndPlay(1);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(598).call(this.frame_599).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(640,360);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(47).to({scaleX:0.9748,scaleY:0.9748,x:643.9,y:367.95},0).wait(1).to({scaleX:0.9306,scaleY:0.9306,x:650.8064,y:381.8686},0).wait(1).to({scaleX:0.8865,scaleY:0.8865,x:657.7129,y:395.7871},0).wait(1).to({scaleX:0.8423,scaleY:0.8423,x:664.6193,y:409.7057},0).wait(1).to({scaleX:0.7982,scaleY:0.7982,x:671.5258,y:423.6243},0).wait(1).to({scaleX:0.754,scaleY:0.754,x:678.4322,y:437.5428},0).wait(1).to({scaleX:0.7099,scaleY:0.7099,x:685.3386,y:451.4614},0).wait(1).to({scaleX:0.6657,scaleY:0.6657,x:692.2451,y:465.3799},0).wait(1).to({scaleX:0.6216,scaleY:0.6216,x:699.1515,y:479.2985},0).wait(1).to({scaleX:0.5775,scaleY:0.5775,x:706.0579,y:493.2171},0).wait(1).to({scaleX:0.5333,scaleY:0.5333,x:712.9644,y:507.1356},0).wait(1).to({scaleX:0.4892,scaleY:0.4892,x:719.8708,y:521.0542},0).wait(1).to({scaleX:0.445,scaleY:0.445,x:726.7773,y:534.9728},0).wait(1).to({scaleX:0.4009,scaleY:0.4009,x:733.6837,y:548.8913},0).wait(1).to({scaleX:0.3567,scaleY:0.3567,x:740.5901,y:562.8099},0).wait(1).to({scaleX:0.3126,scaleY:0.3126,x:747.4966,y:576.7284},0).wait(1).to({scaleX:0.2684,scaleY:0.2684,x:754.403,y:590.647},0).wait(233).to({scaleX:0.9662,scaleY:0.9662,x:656.053,y:388.447},0).wait(304));

	// start_end_smiley_obj_
	this.start_end_smiley = new lib.Scene_1_start_end_smiley();
	this.start_end_smiley.name = "start_end_smiley";
	this.start_end_smiley.setTransform(942.4,232.4,1,1,0,0,0,942.4,232.4);
	this.start_end_smiley.depth = 0;
	this.start_end_smiley.isAttachedToCamera = 0
	this.start_end_smiley.isAttachedToMask = 0
	this.start_end_smiley.layerDepth = 0
	this.start_end_smiley.layerIndex = 0
	this.start_end_smiley.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.start_end_smiley).wait(599).to({regX:948.2,regY:265.1,scaleX:1.035,scaleY:1.035},0).wait(1));

	// מחייך_קופץ_obj_
	this.מחייך_קופץ = new lib.Scene_1_מחייך_קופץ();
	this.מחייך_קופץ.name = "מחייך_קופץ";
	this.מחייך_קופץ.depth = 0;
	this.מחייך_קופץ.isAttachedToCamera = 0
	this.מחייך_קופץ.isAttachedToMask = 0
	this.מחייך_קופץ.layerDepth = 0
	this.מחייך_קופץ.layerIndex = 1
	this.מחייך_קופץ.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.מחייך_קופץ).wait(99).to({regX:582.6,regY:493.9,scaleX:3.7255,scaleY:3.7255,y:-0.15},0).wait(27).to({regX:838.9,regY:666,scaleX:1,scaleY:1,x:256.3,y:172.1},0).wait(48).to({_off:true},1).wait(425));

	// בוכה_קופץ_obj_
	this.בוכה_קופץ = new lib.Scene_1_בוכה_קופץ();
	this.בוכה_קופץ.name = "בוכה_קופץ";
	this.בוכה_קופץ.depth = 0;
	this.בוכה_קופץ.isAttachedToCamera = 0
	this.בוכה_קופץ.isAttachedToMask = 0
	this.בוכה_קופץ.layerDepth = 0
	this.בוכה_קופץ.layerIndex = 2
	this.בוכה_קופץ.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.בוכה_קופץ).wait(130).to({regX:582.6,regY:493.9,scaleX:3.7255,scaleY:3.7255,y:-0.15},0).wait(35).to({regX:660.6,regY:664.5,scaleX:1,scaleY:1,x:78,y:170.6},0).wait(49).to({_off:true},1).wait(385));

	// מאוהב_קופץ_obj_
	this.מאוהב_קופץ = new lib.Scene_1_מאוהב_קופץ();
	this.מאוהב_קופץ.name = "מאוהב_קופץ";
	this.מאוהב_קופץ.depth = 0;
	this.מאוהב_קופץ.isAttachedToCamera = 0
	this.מאוהב_קופץ.isAttachedToMask = 0
	this.מאוהב_קופץ.layerDepth = 0
	this.מאוהב_קופץ.layerIndex = 3
	this.מאוהב_קופץ.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.מאוהב_קופץ).wait(178).to({regX:582.6,regY:493.9,scaleX:3.7255,scaleY:3.7255,y:-0.15},0).wait(28).to({regX:843.3,regY:653.2,scaleX:1,scaleY:1,x:260.7,y:159.3},0).wait(49).to({_off:true},1).wait(344));

	// כוכבים_קופץ_obj_
	this.כוכבים_קופץ = new lib.Scene_1_כוכבים_קופץ();
	this.כוכבים_קופץ.name = "כוכבים_קופץ";
	this.כוכבים_קופץ.depth = 0;
	this.כוכבים_קופץ.isAttachedToCamera = 0
	this.כוכבים_קופץ.isAttachedToMask = 0
	this.כוכבים_קופץ.layerDepth = 0
	this.כוכבים_קופץ.layerIndex = 4
	this.כוכבים_קופץ.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.כוכבים_קופץ).wait(213).to({regX:582.6,regY:493.9,scaleX:3.7255,scaleY:3.7255,y:-0.15},0).wait(33).to({regX:669.4,regY:653,scaleX:1,scaleY:1,x:86.8,y:159.1},0).wait(49).to({_off:true},1).wait(304));

	// איש_obj_
	this.איש = new lib.Scene_1_איש();
	this.איש.name = "איש";
	this.איש.depth = 0;
	this.איש.isAttachedToCamera = 0
	this.איש.isAttachedToMask = 0
	this.איש.layerDepth = 0
	this.איש.layerIndex = 5
	this.איש.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.איש).wait(449).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(1).to({regX:24.8,regY:435.7,scaleX:1,scaleY:1,x:-12.8,y:395.2},0).wait(60).to({_off:true},1).wait(89));

	// אייפון_obj_
	this.אייפון = new lib.Scene_1_אייפון();
	this.אייפון.name = "אייפון";
	this.אייפון.depth = 0;
	this.אייפון.isAttachedToCamera = 0
	this.אייפון.isAttachedToMask = 0
	this.אייפון.layerDepth = 0
	this.אייפון.layerIndex = 6
	this.אייפון.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.אייפון).wait(511).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(1).to({regX:310.1,regY:536.9,scaleX:1,scaleY:1,x:272.5,y:496.4},0).wait(88));

	// פנים_obj_
	this.פנים = new lib.Scene_1_פנים();
	this.פנים.name = "פנים";
	this.פנים.depth = 0;
	this.פנים.isAttachedToCamera = 0
	this.פנים.isAttachedToMask = 0
	this.פנים.layerDepth = 0
	this.פנים.layerIndex = 7
	this.פנים.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.פנים).wait(511).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(89));

	// איש_מפיל_אייפון_obj_
	this.איש_מפיל_אייפון = new lib.Scene_1_איש_מפיל_אייפון();
	this.איש_מפיל_אייפון.name = "איש_מפיל_אייפון";
	this.איש_מפיל_אייפון.depth = 0;
	this.איש_מפיל_אייפון.isAttachedToCamera = 0
	this.איש_מפיל_אייפון.isAttachedToMask = 0
	this.איש_מפיל_אייפון.layerDepth = 0
	this.איש_מפיל_אייפון.layerIndex = 8
	this.איש_מפיל_אייפון.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.איש_מפיל_אייפון).wait(508).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(92));

	// סמיילימחייך_obj_
	this.סמיילימחייך = new lib.Scene_1_סמיילימחייך();
	this.סמיילימחייך.name = "סמיילימחייך";
	this.סמיילימחייך.depth = 0;
	this.סמיילימחייך.isAttachedToCamera = 0
	this.סמיילימחייך.isAttachedToMask = 0
	this.סמיילימחייך.layerDepth = 0
	this.סמיילימחייך.layerIndex = 9
	this.סמיילימחייך.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.סמיילימחייך).wait(296).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(1).to({regX:787.6,regY:271.9,scaleX:1,scaleY:1,x:750,y:231.4},0).wait(303));

	// סמייליבוכהמצחוק_obj_
	this.סמייליבוכהמצחוק = new lib.Scene_1_סמייליבוכהמצחוק();
	this.סמייליבוכהמצחוק.name = "סמייליבוכהמצחוק";
	this.סמייליבוכהמצחוק.depth = 0;
	this.סמייליבוכהמצחוק.isAttachedToCamera = 0
	this.סמייליבוכהמצחוק.isAttachedToMask = 0
	this.סמייליבוכהמצחוק.layerDepth = 0
	this.סמייליבוכהמצחוק.layerIndex = 10
	this.סמייליבוכהמצחוק.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.סמייליבוכהמצחוק).wait(333).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(2).to({regX:776.2,regY:307.1,scaleX:1,scaleY:1,x:738.6,y:266.6},0).wait(265));

	// סמיילימאוהב_obj_
	this.סמיילימאוהב = new lib.Scene_1_סמיילימאוהב();
	this.סמיילימאוהב.name = "סמיילימאוהב";
	this.סמיילימאוהב.depth = 0;
	this.סמיילימאוהב.isAttachedToCamera = 0
	this.סמיילימאוהב.isAttachedToMask = 0
	this.סמיילימאוהב.layerDepth = 0
	this.סמיילימאוהב.layerIndex = 11
	this.סמיילימאוהב.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.סמיילימאוהב).wait(368).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(2).to({regX:758.1,regY:278,scaleX:1,scaleY:1,x:720.5,y:237.5},0).wait(230));

	// סמייליכוכבים_obj_
	this.סמייליכוכבים = new lib.Scene_1_סמייליכוכבים();
	this.סמייליכוכבים.name = "סמייליכוכבים";
	this.סמייליכוכבים.depth = 0;
	this.סמייליכוכבים.isAttachedToCamera = 0
	this.סמייליכוכבים.isAttachedToMask = 0
	this.סמייליכוכבים.layerDepth = 0
	this.סמייליכוכבים.layerIndex = 12
	this.סמייליכוכבים.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.סמייליכוכבים).wait(403).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(2).to({regX:763.7,regY:291.1,scaleX:1,scaleY:1,x:726.1,y:250.6},0).wait(195));

	// רקע_חדר_obj_
	this.רקע_חדר = new lib.Scene_1_רקע_חדר();
	this.רקע_חדר.name = "רקע_חדר";
	this.רקע_חדר.depth = 0;
	this.רקע_חדר.isAttachedToCamera = 0
	this.רקע_חדר.isAttachedToMask = 0
	this.רקע_חדר.layerDepth = 0
	this.רקע_חדר.layerIndex = 13
	this.רקע_חדר.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.רקע_חדר).wait(295).to({regX:582.6,regY:493.9,scaleX:3.7255,scaleY:3.7255,y:-0.15},0).wait(1).to({regX:37.6,regY:40.6,scaleX:1.035,scaleY:1.035,x:-0.05,y:0.05},0).wait(304));

	// שליחת_אימוגי_obj_
	this.שליחת_אימוגי = new lib.Scene_1_שליחת_אימוגי();
	this.שליחת_אימוגי.name = "שליחת_אימוגי";
	this.שליחת_אימוגי.setTransform(661.5,-109,1,1,0,0,0,661.5,-109);
	this.שליחת_אימוגי.depth = 0;
	this.שליחת_אימוגי.isAttachedToCamera = 0
	this.שליחת_אימוגי.isAttachedToMask = 0
	this.שליחת_אימוגי.layerDepth = 0
	this.שליחת_אימוגי.layerIndex = 14
	this.שליחת_אימוגי.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.שליחת_אימוגי).wait(105).to({regX:760.1,regY:464.7,scaleX:3.7255,scaleY:3.7255,x:661.25,y:-108.95},0).to({_off:true},191).wait(304));

	// finger_obj_
	this.finger = new lib.Scene_1_finger();
	this.finger.name = "finger";
	this.finger.setTransform(708.8,590.8,1,1,0,0,0,708.8,590.8);
	this.finger.depth = 0;
	this.finger.isAttachedToCamera = 0
	this.finger.isAttachedToMask = 0
	this.finger.layerDepth = 0
	this.finger.layerIndex = 15
	this.finger.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.finger).to({_off:true},296).wait(304));

	// man_start_obj_
	this.man_start = new lib.Scene_1_man_start();
	this.man_start.name = "man_start";
	this.man_start.setTransform(532.1,423.8,1,1,0,0,0,532.1,423.8);
	this.man_start.depth = 0;
	this.man_start.isAttachedToCamera = 0
	this.man_start.isAttachedToMask = 0
	this.man_start.layerDepth = 0
	this.man_start.layerIndex = 16
	this.man_start.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.man_start).wait(59).to({regX:678.8,regY:563.3,scaleX:2.2473,scaleY:2.2473,x:532.15,y:423.75},0).wait(40).to({regX:725.5,regY:607.7,scaleX:3.7255,scaleY:3.7255,x:532.35,y:423.8},0).to({_off:true},197).wait(304));

	// blue_background_obj_
	this.blue_background = new lib.Scene_1_blue_background();
	this.blue_background.name = "blue_background";
	this.blue_background.setTransform(636.3,357.2,1,1,0,0,0,636.3,357.2);
	this.blue_background.depth = 0;
	this.blue_background.isAttachedToCamera = 0
	this.blue_background.isAttachedToMask = 0
	this.blue_background.layerDepth = 0
	this.blue_background.layerIndex = 17
	this.blue_background.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.blue_background).to({_off:true},296).wait(304));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(377.6,186.4,916.1999999999999,621);
// library properties:
lib.properties = {
	id: '0A988691E02D7447A45140D4F912B470',
	width: 1280,
	height: 720,
	fps: 30,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_19.png?1618074523013", id:"CachedBmp_19"},
		{src:"images/CachedBmp_1.png?1618074523013", id:"CachedBmp_1"},
		{src:"images/CachedBmp_2.png?1618074523013", id:"CachedBmp_2"},
		{src:"images/RECOVER_אנימציה סופית_atlas_1.png?1618074522073", id:"RECOVER_אנימציה סופית_atlas_1"},
		{src:"images/RECOVER_אנימציה סופית_atlas_2.png?1618074522073", id:"RECOVER_אנימציה סופית_atlas_2"},
		{src:"images/RECOVER_אנימציה סופית_atlas_3.png?1618074522073", id:"RECOVER_אנימציה סופית_atlas_3"},
		{src:"images/RECOVER_אנימציה סופית_atlas_4.png?1618074522073", id:"RECOVER_אנימציה סופית_atlas_4"},
		{src:"images/RECOVER_אנימציה סופית_atlas_5.png?1618074522073", id:"RECOVER_אנימציה סופית_atlas_5"},
		{src:"images/RECOVER_אנימציה סופית_atlas_6.png?1618074522073", id:"RECOVER_אנימציה סופית_atlas_6"},
		{src:"images/RECOVER_אנימציה סופית_atlas_7.png?1618074522074", id:"RECOVER_אנימציה סופית_atlas_7"},
		{src:"images/RECOVER_אנימציה סופית_atlas_8.png?1618074522078", id:"RECOVER_אנימציה סופית_atlas_8"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['0A988691E02D7447A45140D4F912B470'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;