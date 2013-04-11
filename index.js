//you need to pass in the pg module
//to have this module initialize the type parsers

//technically you can just have this globally initialize
//when its required but I think this is more explicit & cleaner.

var pgParseFloats = module.exports = function(pg) {
  //the type & OID match for the float types
  var types = {
    FLOAT4: 700,
    FLOAT8: 701,
    NUMERIC: 1700,
    FLOAT4_ARRAY: 1021,
    FLOAT8_ARRAY: 1022,
    NUMERIC_ARRAY: 1231
  };
  //just use the built-in V8 parseFloat implementation
  pg.types.setTypeParser(types.FLOAT4, 'text', parseFloat);
  pg.types.setTypeParser(types.FLOAT8, 'text', parseFloat);
  pg.types.setTypeParser(types.NUMERIC, 'text', parseFloat);

  //TODO array parsers
};

//you can find the OID -> TYPE map like this:
//client.query('select oid, typname from pg_type where typtype = \'b\' order by oid')
