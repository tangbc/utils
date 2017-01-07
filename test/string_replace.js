var expect = require('chai').expect;
var string_replace = require('../src/string_replace');

describe('string_replace', function () {
	it('normal', function () {
		var result = string_replace('My name is {0}, live in {1}.', ['TANG', 'Guangzhou']);
		expect(result).to.equal('My name is TANG, live in Guangzhou.');
	});


	it('back to back', function () {
		var result = string_replace('My name is {0}{1}.', ['tang', 'bc']);
		expect(result).to.equal('My name is tangbc.');
	});


	it('at head and tail', function () {
		var result = string_replace('{0} is {1}', ['Talk', 'cheap']);
		expect(result).to.equal('Talk is cheap');
	});


	it('more macros', function () {
		var result = string_replace('{0}bc{1}ef{2}hi{3}kl{4}', ['A', 'D', 'G', 'J', 'M']);
		expect(result).to.equal('AbcDefGhiJklM');
	});


	it('use {} actually', function () {
		var result = string_replace('My name is {{0}}.', ['TANG']);
		expect(result).to.equal('My name is {TANG}.');
	});


	it('empty macroValues', function () {
		var result = string_replace('My name is {0}, live in {1}.', []);
		expect(result).to.equal('My name is {0}, live in {1}.');
	});


	it('no macroValues', function () {
		var result = string_replace('My name is {0}, live in {1}.');
		expect(result).to.equal('My name is {0}, live in {1}.');
	});


	it('incorrect data type', function () {
		expect(string_replace('a {0} c', {'0': 'b'})).to.equal('a {0} c');
		expect(string_replace([1, 2, 3])).to.eql([1, 2, 3]);
		expect(string_replace({}, [1, 2, 3])).to.equal('[object Object]');
	});
});
