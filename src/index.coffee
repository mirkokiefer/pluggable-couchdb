
cradle = require 'cradle'
PluggableStore = require 'pluggable-store'

designDoc =
  ids:
    map: (doc) -> emit doc._id

class CouchDB
  constructor: ({hostname, port, auth, db}) ->
    @con = new(cradle.Connection)(hostname, port, cache: true, auth: auth)
    @db = @con.database db
  createdStore: (cb) -> @db.exists cb
  createStore: (cb) ->
    obj = this
    @db.create ->
      obj.db.save '_design/pluggable-store', designDoc, cb
  removeStore: (cb) -> @db.destroy cb
  write: (path, data, cb) -> @db.save path, data: data, cb
  read: (path, cb) -> @db.get path, (err, doc) -> if err then cb err else cb null, doc.data
  remove: (path, cb) -> @db.remove path, cb
  keys: (cb) -> @db.view 'pluggable-store/ids', (err, res) ->
    cb null, (id for {id} in res)

create = (opts) -> new PluggableStore adapter: (new CouchDB opts)
create.adapter = CouchDB
module.exports = create