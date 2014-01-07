/**
 * Main script
 */
var html = require('./template'),
	$	 = require('jquery');
	
/**
 * Init bracket
 * @param  {[type]} size [description]
 * @return {[type]}      [description]
 */
module.exports = function(size) {
	document.write(html);
}

/**
 * Generate data
 * 
 * @param  {[type]} size [description]
 * @return {[type]}      [description]
 */
var zenData = function(size) {
	// Return array of data
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
	
}