## utils

Collect some useful JavaScript methods, sometimes you don't want to write again, just copy and paste.


## Methods

#### string_replace_array

* Usage: `string_replace_array(string, macroValues)`

* Replace any macro marks in a string template by Array index.

* Example:
	```javascript
	var result = string_replace_array('My name is {0}, live in {1}.', ['TANG', 'Guangzhou']);

	// result => 'My name is TANG, live in Guangzhou.'
	```

#### string_replace_object

* Usage: `string_replace_object(string, macroObject)`

* Replace any macro marks in a string template by Object key.

* Example:
	```javascript
	var result = string_replace_object('My name is {name}, live in {loc}.', { name: 'TANG', loc: 'Guangzhou' });

	// result => 'My name is TANG, live in Guangzhou.'
	```

