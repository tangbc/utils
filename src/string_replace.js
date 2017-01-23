/**
 * replace any macro marks in a
 * string template by Array index
 * @param   {String}  string       [string template]
 * @param   {Array}   macroValues  [macro value array]
 * @return  {String}
 */
function string_replace_array (string, macroValues) {
	return string.replace(/\%(\d+)|\{\d+\}/g, function (match) {
		return macroValues[match[1]] || match;
	});
}

/**
 * replace any macro marks in a
 * string template by Object key
 * @param   {String}  string       [string template]
 * @param   {Object}   macroObject [macro object]
 * @return  {String}
 */
function string_replace_object (string, macroObject) {
	return string.replace(/\{(\w+)\}/g, function (match, key) {
		return macroObject.hasOwnProperty(key) ? macroObject[key] : match;
	});
}

module.exports = {
	string_replace_array: string_replace_array,
	string_replace_object: string_replace_object
};
