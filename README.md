## utils

Collect some useful JavaScript methods, sometimes you don't want to write again, just copy and paste.


## Methods

#### string_replace

* Usage: `string_replace(string, macroValues)`

* Replace any macro marks in a string template by index.

* Example:
	```javascript
	var result = string_replace('My name is {0}, live in {1}.', ['TANG', 'Guangzhou']);

	// result => 'My name is TANG, live in Guangzhou.'
	```

