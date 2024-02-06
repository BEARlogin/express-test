function dev() {
  process.once('SIGUSR2', () => {
    process.kill(process.pid, 'SIGUSR2');
  });

  process.once('SIGINT', () => {
    process.kill(process.pid, 'SIGINT');
  }); 

  process.on('SIGHUP', () => {
    // eslint-disable-next-line no-process-exit
    process.exit(1); 
  });  
}

module.exports = dev;
