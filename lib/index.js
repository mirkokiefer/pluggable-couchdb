// Generated by CoffeeScript 1.4.0
(function() {
  var CouchDB, cradle, designDoc;

  cradle = require('cradle');

  designDoc = {
    ids: {
      map: function(doc) {
        return emit(doc._id);
      }
    }
  };

  CouchDB = (function() {

    function CouchDB(_arg) {
      var auth, db, hostname, port;
      hostname = _arg.hostname, port = _arg.port, auth = _arg.auth, db = _arg.db;
      this.con = new cradle.Connection(hostname, port, {
        cache: true,
        auth: auth
      });
      this.db = this.con.database(db);
    }

    CouchDB.prototype.createdStore = function(cb) {
      return this.db.exists(cb);
    };

    CouchDB.prototype.createStore = function(cb) {
      var obj;
      obj = this;
      return this.db.create(function() {
        return obj.db.save('_design/pluggable-store', designDoc, cb);
      });
    };

    CouchDB.prototype.removeStore = function(cb) {
      return this.db.destroy(cb);
    };

    CouchDB.prototype.write = function(path, data, cb) {
      return this.db.save(path, {
        data: data
      }, cb);
    };

    CouchDB.prototype.read = function(path, cb) {
      return this.db.get(path, function(err, doc) {
        if (err) {
          return cb(err);
        } else {
          return cb(null, doc.data);
        }
      });
    };

    CouchDB.prototype.remove = function(path, cb) {
      return this.db.remove(path, cb);
    };

    CouchDB.prototype.keys = function(cb) {
      return this.db.view('pluggable-store/ids', function(err, res) {
        var id;
        return cb(null, (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = res.length; _i < _len; _i++) {
            id = res[_i].id;
            _results.push(id);
          }
          return _results;
        })());
      });
    };

    return CouchDB;

  })();

  module.exports = CouchDB;

}).call(this);