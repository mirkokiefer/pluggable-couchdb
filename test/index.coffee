
assert = require 'assert'
PluggableStore = require 'pluggable-store'
CouchAdapter = require '../lib/index'
genericTests = require 'pluggable-store-tests'

couchStore = -> new PluggableStore adapter: (new CouchAdapter hostname: 'localhost', port: 5984, db: 'test')

describe 'couch store adapter', genericTests couchStore