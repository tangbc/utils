var expect = require('chai').expect;
var _module = require('../src/string_replace');
var string_replace_array = _module.string_replace_array;
var string_replace_object = _module.string_replace_object;

describe('string_replace_array', function () {
	it('normal', function () {
		var result = string_replace_array('My name is {0}, live in {1}.', ['TANG', 'Guangzhou']);
		expect(result).to.equal('My name is TANG, live in Guangzhou.');
	});


	it('back to back', function () {
		var result = string_replace_array('My name is {0}{1}.', ['tang', 'bc']);
		expect(result).to.equal('My name is tangbc.');
	});


	it('at head and tail', function () {
		var result = string_replace_array('{0} is {1}', ['Talk', 'cheap']);
		expect(result).to.equal('Talk is cheap');
	});


	it('more macros', function () {
		var result = string_replace_array('{0}bc{1}ef{2}hi{3}kl{4}', ['A', 'D', 'G', 'J', 'M']);
		expect(result).to.equal('AbcDefGhiJklM');
	});


	it('use {} actually', function () {
		var result = string_replace_array('My name is {{0}}.', ['TANG']);
		expect(result).to.equal('My name is {TANG}.');
	});


	it('empty macroValues', function () {
		var result = string_replace_array('My name is {0}, live in {1}.', []);
		expect(result).to.equal('My name is {0}, live in {1}.');
	});
});


describe('string_replace_object', function () {
	it('normal', function () {
		var result = string_replace_object('My name is {name}, live in {loc}.', { name: 'TANG', loc: 'Guangzhou' });
		expect(result).to.equal('My name is TANG, live in Guangzhou.');
	});


	it('back to back', function () {
		var result = string_replace_object('My name is {first}{secound}.', { first: 'tang', secound: 'bc' });
		expect(result).to.equal('My name is tangbc.');
	});


	it('at head and tail', function () {
		var result = string_replace_object('{name} is {text}', { name: 'Talk', text: 'cheap' });
		expect(result).to.equal('Talk is cheap');
	});


	it('more macros', function () {
		var result = string_replace_object('{a}bc{d}ef{g}hi{j}kl{m}', {
			a: 'A',
			d: 'D',
			g: 'G',
			j: 'J',
			m: 'M'
		});
		expect(result).to.equal('AbcDefGhiJklM');
	});


	it('use {} actually', function () {
		var result = string_replace_object('My name is {{name}}.', { name: 'TANG' });
		expect(result).to.equal('My name is {TANG}.');
	});


	it('empty macroObject', function () {
		var result = string_replace_object('My name is {name}, live in {text}.', {});
		expect(result).to.equal('My name is {name}, live in {text}.');
	});
});

