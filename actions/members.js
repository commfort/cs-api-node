var forcifier = require("forcifier")
  , utils = require("../utils")
  , _ = require("underscore")

exports.membersList = {
  name: "membersList",
  description: "Fetches all members. Method: GET",
  inputs: {
    required: [],
    optional: [],
  },
  authenticated: false,
  outputExample: {},
  version: 2.0,
  run: function(api, connection, next){
    api.members.list(function(data){
      utils.processResponse(data, connection);
      next(connection, true);
    });
  }
};

exports.membersFetch = {
  name: "membersFetch",
  description: "Fetches a specific member. Method: GET",
  inputs: {
    required: ['membername'],
    optional: ['fields'],
  },
  authenticated: false,
  outputExample: { id: "a0IK0000007NIQmMAO", name: "jeffdonthemic"},
  version: 2.0,
  run: function(api, connection, next){
    // enforce the pass list of field or if null, use the default member list of fields
    var fields =  connection.params.fields != null ? forcifier.enforceList(connection.params.fields) : api.configData.defaults.memberFields;
    api.members.fetch(connection.params.membername, fields, function(data){
      utils.processResponse(data, connection);
      next(connection, true);
    });
  }
};

exports.membersChallenges = {
  name: "membersChallenges",
  description: "Fetches a specific member's challenges. Method: GET",
  inputs: {
    required: ['membername'],
    optional: [],
  },
  authenticated: false,
  outputExample: { { "0" : { "id": "2885", "name": "Port the CloudSpokes API to Node.js", "challenge_type" : "Code", "top_prize": "100" } },
  version: 2.0,
  run: function(api, connection, next){
    api.members.challenges(connection.params.membername, function(data){
      utils.processResponse(data, connection);
      next(connection, true);
    });
  }
};