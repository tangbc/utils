/**
 * A simple event emitter
 */

function Emitter (parasyte) {
	if (parasyte) {
		for (var handler in Emitter.prototype) {
			parasyte[handler] = Emitter.prototype[handler];
		}
		return parasyte;
	}
}

/**
 * register a event with a callback
 */
Emitter.prototype.on = function (event, callback) {
	if (!this._listenrs) {
		this._listenrs = {};
	}

	var listenrs = this._listenrs;
	(listenrs[event] = listenrs[event] || []).push(callback);
}

/**
 * register a event with a once-called callback
 */
Emitter.prototype.once = function (event, callback) {
	var onceHandler = function () {
		this.off(event, callback);
		callback.apply(this, arguments);
	}

	onceHandler._once = callback;
	this.on(event, onceHandler);
}

/**
 * cancel event, all or specify
 */
Emitter.prototype.off = function (event, callback) {
	if (!this._listenrs) {
		this._listenrs = {};
	}

	var listenrs = this._listenrs;
	var length = arguments.length;

	if (length === 0) {
		this._listenrs = {};
	} else if (length === 1) {
		delete listenrs[event];
	} else if (length === 2) {
		var binds = listenrs[event];
		var i = binds && binds.length || 0;

		while (i--) {
			var cb = binds[i];
			if ((cb._once || cb) === callback) {
				binds.splice(i, 1);
				break;
			}
		}
	}
}

/**
 * emit a event, args is optional
 */
Emitter.prototype.emit = function (event, args) {
	if (!this._listenrs) {
		this._listenrs = {};
	}

	var listenrs = this._listenrs;
	var binds = listenrs[event];
	var i = binds && binds.length || 0;

	while (i--) {
		binds[i].apply(this, args);
	}
}

module.exports = Emitter;
