
assert = require 'assert'
createCouchDB = require '../lib/index'
genericTests = require 'pluggable-store-tests'

couchStore = -> createCouchDB hostname: 'localhost', port: 5984, db: 'test'

describe 'couch store adapter', genericTests couchStore