/**
 * Main script
 */
var Emitter = require('emitter')

var layout 	= require('./template'),
	$	 	= require('jquery'),
	_	 	= require('underscore');

/**
 * Sample bracket data
 */
var bracketData = {
	games: [
		// Round 1
		[
			[1,2], [3,4], [5,6]
		],
		// Round 2
		[
			[7], [8], [9], [10,11]
		],
		// Round 3
		[
			[], []
		],
		// Final round
		[
			[]
		]
	]
};

/**
 * Init bracket
 * @param  {[type]} size [description]
 * @return {[type]}      [description]
 */
module.exports = Bracket;

function Bracket(size, el) {
	if (!(this instanceof Bracket)) return new Bracket(size, el);

	Emitter.call(this);

	this.size = size;
	this.$el = el !== undefined ? $(el) : $('body');

	this.zenData();
	this.zenLayout();
	this.drawRounds();
}

Bracket.prototype = new Emitter;

/**
 * Generate data
 * 
 * @param  {[type]} size [description]
 * @return {[type]}      [description]
 */
var zenData = function() {
	// Get min & max closet power of 2
	var power = getMinAndMaxClosetPowerOf2(this.size);
	// Calculate number of round
	this.numberOfRound = powerOf2(power.max);
	// Calculate number of games
	this.numberOfGame = this.size - 1;
	// Calculate number of byes
	this.numberOfByes = power.max - this.size;
	// Calculate number of first round game
	this.numberOfFirstRoundGame = this.size - power.min;
}


var zenLayout = function() {
	this.$el.html(layout);
}

/**
 * Draw a game
 * @param  {[type]} p1  Player 1
 * @param  {[type]} p2  Player 2
 * @param  {[type]} pos Game position (top, middle, bottom)
 * @return {[type]}     [description]
 */
var drawAGame = function(p1, p2, pos) {

}

/**
 * Draw a bracket
 * @param  {[type]} type Bracket type L1, L2, T
 * @return {[type]}      [description]
 */
var drawABracket = function(type) {

}

/**
 * Draw a round with round name & games data
 * @param  {String} name  [description]
 * @param  {Array} games [description]
 * @return {Void}       [description]
 */
var drawARound = function(name, games) {
	this.$el.find('tr').append('<td></td>');
}

var drawRounds = function() {
	var _this = this;
	_.each(bracketData.games, function(games){
		_this.drawARound('Round', games);
	});
}

Bracket.prototype.zenData = zenData;
Bracket.prototype.zenLayout = zenLayout;
Bracket.prototype.drawAGame = drawAGame;
Bracket.prototype.drawABracket = drawABracket;
Bracket.prototype.drawARound = drawARound;
Bracket.prototype.drawRounds = drawRounds;

/**
 * Get min and max closet power of 2
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
var getMinAndMaxClosetPowerOf2 = function(n) {
	n--;
    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16;
    n++;
    
    return {
        max: n,
        min: n - (n >> 1)
    };
}

/**
 * [powerOf2 description]
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
var powerOf2 = function(n) {
	return Math.log(n) / Math.log(2);
}