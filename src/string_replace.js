/**
 * replace any macro marks in a string template by index.
 * @param   {String}  string       [string template]
 * @param   {Array}   macroValues  [macro values]
 * @return  {String}
 */
function string_replace (string, macroValues) {
	return ({}).toString.call(macroValues) === '[object Array]' ? ('' + string).replace(/\%(\d+)|\{\d+\}/g, function (match) {
		return macroValues[match[1]] || match;
	}) : string;
}

module.exports = string_replace;
