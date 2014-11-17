// New Relic agent configuration.
 // 'trace' is most useful to New Relic when diagnosing
 // 'info' and higher will impose the least overhead
exports.config = {
  app_name : ['Desert Island Suicide'],
  license_key : process.env.NEW_RELIC_LICENSE_KEY,
  logging : {
    level : 'info'
  }
};
