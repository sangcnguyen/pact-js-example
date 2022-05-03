let publisher = require("@pact-foundation/pact-node");
let path = require("path");

let opts = {
  pactFilesOrDirs: [path.resolve(process.cwd(), "pacts")],
  pactBroker: "https://test.pactflow.io/",
  pactBrokerUsername: "dXfltyFMgNOFZAxr8io9wJ37iUpY42M",
  pactBrokerPassword: "O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1",
  consumerVersion: "1.0.1",
  providerVersion: "1.0.1",
  tags: "dev",
};

publisher.publishPacts(opts);
