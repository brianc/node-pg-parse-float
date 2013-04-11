var timeoutSeconds = 5;
var tid = setTimeout(function() {
  throw new Error('Tests did not finish within ' + timeoutSeconds + ' seconds');
}, timeoutSeconds * 1000);

var assert = require('assert');
var async = require('async');
var ok = require('okay');
var pg = require('pg');

var setup = function() {
  before(function(done) {
    this.client = new pg.Client();
    this.client.connect();
    var client = this.client;
    client.query('CREATE TEMP TABLE floatz(small FLOAT4, big FLOAT8, num NUMERIC)', ok(function(result) {
      client.query('INSERT INTO floatz(small, big, num) VALUES($1, $2, $3)', [1.1, '2.2', 3.3], ok(function(result) {
        done();
      }));
    }));
  });
};

var teardown = function() {
  after(function(done) {
    this.client.on('end', done);
    this.client.end();
  });
};

describe('existing (string) functionality', function() {
  setup();

  it('returns floats as strings', function(done) {
    var client = this.client;
    client.query('SELECT * FROM floatz', ok(function(result) {
      assert(result, 'should have returned result');
      assert(result.rows, 'result should have rows');
      assert.equal(result.rows.length, 1, 'should have 1 row but returned ' + result.rows.length);
      var row = result.rows.pop();
      assert.strictEqual(row.small, '1.1');
      assert.strictEqual(row.big, '2.2');
      assert.strictEqual(row.num, '3.3');
      done();
    }));
  });

  teardown();
});

describe('new (parseFloat) functionality', function() {
  before(function() {
    //load the pg-parse-float module
    require(__dirname)(pg);
  });

  setup();

  it('returns floats as floats', function(done) {
    var client = this.client;
    client.query('SELECT * FROM floatz', ok(function(result) {
      assert(result, 'should have returned result');
      assert(result.rows, 'result should have rows');
      assert.equal(result.rows.length, 1, 'should have 1 row but returned ' + result.rows.length);
      var row = result.rows.pop();
      assert.strictEqual(row.small, 1.1);
      assert.strictEqual(row.big, 2.2);
      assert.strictEqual(row.num, 3.3);
      done();
    }));
  });

  teardown();
});
