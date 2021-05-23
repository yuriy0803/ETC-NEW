/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
      modulePrefix: 'open-etc-pool',
      environment: environment,
      rootURL: '/',
      locationType: 'hash',
      EmberENV: {
        FEATURES: {
          // Here you can enable experimental features on an ember canary build
          // e.g. 'with-controller': true
        }
      },
  
      APP: {
        // API host and port
        ApiUrl: '//192.168.178.29//',
  
        // HTTP mining endpoint
        HttpHost: 'http://192.168.178.29',
        HttpPort: 8888,
  
        // Stratum mining endpoint
        StratumHost: 'etc.pool-node.com',
        StratumPort: 8008,
        StratumHost1: 'pplns-etc.pool-node.com',
        StratumPort1: 8008,
  
        // The ETC network used (classic, mordor)
        Network: 'classic',

        // Fee and payout details
        PoolFee: '0.1%',
        PayoutThreshold: '0.5 ETC',
  
        // For network hashrate (change for your favourite fork)
      BlockTime: 14,
      BlockReward: 3.2,
      Blockpreis: 3200000000,
      Unit: 'ETC',
    }
  };
  
    if (environment === 'development') {
      /* Override ApiUrl just for development, while you are customizing
        frontend markup and css theme on your workstation.
      */
      ENV.APP.ApiUrl = 'http://localhost:8080/'
      // ENV.APP.LOG_RESOLVER = true;
      // ENV.APP.LOG_ACTIVE_GENERATION = true;
      // ENV.APP.LOG_TRANSITIONS = true;
      // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
      // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }
  
    if (environment === 'test') {
      // Testem prefers this...
      ENV.locationType = 'none';
  
      // keep test console output quieter
      ENV.APP.LOG_ACTIVE_GENERATION = false;
      ENV.APP.LOG_VIEW_LOOKUPS = false;
  
      ENV.APP.rootElement = '#ember-testing';
    }
  
    if (environment === 'production') {
  
    }
  
    return ENV;
  };
  