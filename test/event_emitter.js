var chai = require('chai');
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
var Emitter = require('../src/event_emitter');

chai.use(sinonChai);

describe('event emitter', function () {
	it('simple & with arguments', function () {
		var cb = sinon.spy();
		var emitter = new Emitter();

		emitter.on('foo', cb);
		emitter.emit('foo');
		expect(cb).to.have.been.calledWith();
		expect(cb).to.have.been.callCount(1);

		// emit with arguments
		emitter.emit('foo', [123]);
		expect(cb).to.have.been.calledWith(123);

		var obj = {};
		emitter.emit('foo', [obj]);
		expect(cb).to.have.been.calledWith(obj);

		// emit times
		expect(cb).to.have.been.callCount(3);
	});


	it('bind several callbacks to same event', function () {
		var cb1 = sinon.spy();
		var cb2 = sinon.spy();
		var cb3 = sinon.spy();
		var emitter = new Emitter();

		emitter.on('foo', cb1);
		emitter.on('foo', cb2);
		emitter.on('foo', cb3);

		emitter.emit('foo');
		expect(cb1).to.have.been.calledWith();
		expect(cb2).to.have.been.calledWith();
		expect(cb3).to.have.been.calledWith();
	});


	it('bind diffrent events', function () {
		var cbFoo = sinon.spy();
		var cbBar1 = sinon.spy();
		var cbBar2 = sinon.spy();
		var emitter = new Emitter();

		emitter.on('foo', cbFoo);
		emitter.on('bar', cbBar1);
		emitter.on('bar', cbBar2);

		emitter.emit('foo');
		expect(cbFoo).to.have.been.calledWith();

		emitter.emit('bar', ['aaa']);
		expect(cbBar1).to.have.been.calledWith('aaa');
		expect(cbBar2).to.have.been.calledWith('aaa');
	});


	it('emit async', function (done) {
		var cb1 = sinon.spy();
		var cb2 = sinon.spy();
		var emitter = new Emitter();

		emitter.on('foo', cb1);
		emitter.on('foo', cb2);

		setTimeout(function () {
			emitter.emit('foo', [123]);
			expect(cb1).to.have.been.calledWith(123);
			expect(cb2).to.have.been.calledWith(123);
			done();
		}, 1000);
	});


	it('bind once event', function () {
		var cb = sinon.spy();
		var emitter = new Emitter();

		emitter.once('foo', cb);

		emitter.emit('foo');
		expect(cb).to.have.been.calledWith();
		expect(cb).to.have.been.callCount(1);

		emitter.emit('foo');
		emitter.emit('foo');
		emitter.emit('foo');
		expect(cb).to.have.been.callCount(1);
	});


	it('off an event callback', function () {
		var cb1 = sinon.spy();
		var cb2 = sinon.spy();
		var emitter = new Emitter();

		emitter.on('foo', cb1);
		emitter.on('foo', cb2);

		emitter.emit('foo');
		expect(cb1).to.have.been.callCount(1);
		expect(cb2).to.have.been.callCount(1);

		emitter.off('foo', cb2);
		emitter.emit('foo');
		expect(cb1).to.have.been.callCount(2);
		expect(cb2).to.have.been.callCount(1);
	});


	it('off an event\'s all callbacks', function () {
		var cb1 = sinon.spy();
		var cb2 = sinon.spy();
		var emitter = new Emitter();

		emitter.on('foo', cb1);
		emitter.on('foo', cb2);

		emitter.emit('foo');
		expect(cb1).to.have.been.callCount(1);
		expect(cb2).to.have.been.callCount(1);

		emitter.off('foo');
		emitter.emit('foo');
		expect(cb1).to.have.been.callCount(1);
		expect(cb2).to.have.been.callCount(1);
	});


	it('off all event', function () {
		var cb1 = sinon.spy();
		var cb2 = sinon.spy();
		var cb3 = sinon.spy();
		var emitter = new Emitter();

		emitter.on('foo', cb1);
		emitter.on('foo', cb2);
		emitter.on('bar', cb3);

		emitter.emit('foo');
		expect(cb1).to.have.been.callCount(1);
		expect(cb2).to.have.been.callCount(1);
		emitter.emit('bar');
		expect(cb3).to.have.been.callCount(1);

		emitter.off();
		emitter.emit('foo');
		emitter.emit('bar');
		expect(cb1).to.have.been.callCount(1);
		expect(cb2).to.have.been.callCount(1);
		expect(cb3).to.have.been.callCount(1);
	});


	it('parasyte object', function () {
		var cb = sinon.spy();
		var data = {a: 123};
		var emitData = new Emitter(data);

		var context;
		function test () {
			cb();
			context = this;
		}

		expect(emitData.a).to.equal(123);

		expect(typeof emitData.on).to.equal('function');
		expect(typeof emitData.emit).to.equal('function');

		emitData.on('foo', test);
		emitData.emit('foo');
		expect(cb).to.have.been.callCount(1);
		expect(context).to.equal(emitData);
	});

});
