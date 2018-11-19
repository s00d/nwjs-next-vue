process.on('uncaughtException', function(error) {
  var message = '[' + (new Date()).toISOString() + '] ' +
                error.stack + '\n' +
                Array(81).join('-') + '\n\n';

  require('fs').appendFileSync('error.log', message);

  process.exit(1)
})
