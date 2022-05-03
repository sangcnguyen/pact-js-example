const path = require("path");
const { Verifier } = require("@pact-foundation/pact");

const app = require("./provider");

app.listen(3000, () => console.log(`Listening on http://localhost:3000`));

describe("Pact Verification", () => {
  let opts = {
    provider: "movie%20provider",
    logLevel: "DEBUG",
    providerBaseUrl: "http://localhost:3000/",
    pactBrokerUrl: "https://test.pactflow.io",
    consumerVersionTags: ["dev"],
    providerVersionTags: ["dev"],
    publishVerificationResult: true,
    providerVersion: "1.0.1",
    pactBrokerUsername: "dXfltyFMgNOFZAxr8io9wJ37iUpY42M",
    pactBrokerPassword: "O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1",
  };

  test("should validate the expectations of movie-consumer", () => {
    const verifier = new Verifier(opts);
    return verifier.verifyProvider();
  });
});
