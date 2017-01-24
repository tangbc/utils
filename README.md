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

#### Emitter

* Usage: `new Emiter()`

* A simple event emitter.

* Example:
	```javascript
	var emitter = new Emitter();
	emitter.on('foo', func);
	emitter.once('bar', func);
	emitter.emit('bar', [123]);
	emitter.off('bar', func);
	emitter.off('foo');

	var data = {a: 123};
	var emitData = new Emitter(data);
	emitData.a === 123 // true
	emitData.on('foo', func);
	emitData.once('bar', func);
	emitData.emit('bar', [123]);
	emitData.off('bar', func);
	emitData.off('foo');
	```
