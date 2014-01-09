/**
 * Main script
 */
var Emitter = require('emitter');

var layout  = require('./template'),
    bracketTemplate = require('./bracket');

var $      = require('jquery'),
	_      = require('underscore');

_.templateSettings = {
    interpolate : /\{\{(.+?)\}\}/g,
    evaluate: /\[\[(.+?)\]\]/g
};

/**
 * Sample bracket data
 */
var bracketData = {
	games: [
        /*Round 1*/
		[
            [{id: 8, score: 0, name: "A"}, {id: 9, score: 0, name: "B"}]
        ],
        /*Round 2*/
        [
            [{id: 1, score: 0, name: "C"}], 
            [{id: 4, score: 0, name: "D"}, {id: 5, score: 0, name: "E"}],
            [{id: 2, score: 0, name: "F"}, {id: 7, score: 0, name: "T"}],
            [{id: 3, score: 0, name: "S"}, {id: 6, score: 0, name: "Y"}]
        ],
        /*Round 3*/
        [
            [{id: 0, name: "?"}, {id: 0, name: "?"}],
            [{id: 0, name: "?"}, {id: 0, name: "?"}]
        ],
        /*Round 4*/
        [
            [{id: 0, name: "?"}, {id: 0, name: "?"}]
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
 * @param  {[type]} game
 * @param  {[type]} round
 * @param  {[type]} position (0,1)
 * @return {[type]}      [description]
 */
var drawABracket = function(game, round, position) {
    $('#round_' + round).append(_.template(bracketTemplate, {
        p1: game.shift(),
        p2: game.shift(),
        position: position
    }));
}

/**
 * Draw a round with round name & games data
 * @param  {String} name  [description]
 * @param  {Array} games [description]
 * @param  {Int}    i   [Round order]
 * @return {Void}       [description]
 */
var drawARound = function(name, games, i) {
    var _this = this;
    
    /*Create new td element which holder a round game*/
    var td = $('<td/>', {
        id: 'round_' + i
    });
    
    /*Append new round*/
	this.$el.find('.bracket-holder').append(td);
    
    _.each(games, function(game, order){
        /*If in second round*/
        if(i === 1 && bracketData.games[i-1][order] !== undefined && bracketData.games[i-1][order].length == 2) {
            /*Added bracket space before*/
            _this.drawABracket([], i);
        }
        
        if(_.isArray(game[0])) {
            _.each(game, function(m, p){
                _this.drawABracket(m, i, p);
            });
        } else {
            _this.drawABracket(game, i, 1);
        }
    });
}

var drawRounds = function() {
	var _this = this;
	_.each(bracketData.games, function(games, i){
		_this.drawARound('Round', games, i);
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