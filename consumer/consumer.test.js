const { Pact } = require("@pact-foundation/pact");
const { like, eachLike, term } = require("@pact-foundation/pact").Matchers;
const { fetchMovies, fetchSingleMovie, addNewMovie } = require("./consumer");
const path = require("path");
const port = 4000;

const provider = new Pact({
  consumer: "movie consumer",
  provider: "movie provider",
  port,
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  dir: path.resolve(process.cwd(), "pacts"),
  logLevel: "INFO",
});

describe("Movies Service", () => {
  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  const movieBodyExpectation = {
    id: like(1),
    name: like("The Shawshank Redemption"),
    year: like(1994),
  };

  const movie = {
    id: 5,
    name: "Doctor Strange in the Multiverse of Madness",
    year: 2022,
  };

  describe("When a request is made to fetch all movies", () => {
    beforeEach(() =>
      provider.setup().then(() => {
        provider.addInteraction({
          state: "have a list of movies",
          uponReceiving: "a request to list all movies",
          withRequest: {
            method: "GET",
            path: "/movies",
          },
          willRespondWith: {
            status: 200,
            body: eachLike(
              {
                id: 1,
                name: like("Movie 1"),
                year: like(2008),
              },
              { min: 5 }
            ),
          },
        });
      })
    );
    test("should return the correct data", async () => {
      const response = await fetchMovies(provider.mockService.baseUrl);
      expect(response).toHaveLength(5);
    });
  });

  describe("when a request is made to fetch a single movie by ID", () => {
    beforeEach(() =>
      provider.addInteraction({
        state: "has a movie with ID 1",
        uponReceiving: "a request for a movie with ID 1",
        withRequest: {
          method: "GET",
          path: term({ generate: "/movies/1", matcher: "/movies/[0-9]+" }),
        },
        willRespondWith: {
          status: 200,
          body: movieBodyExpectation,
        },
      })
    );

    test("should return an movie", async () => {
      const response = await fetchSingleMovie(provider.mockService.baseUrl, 1);
      expect(response).toHaveProperty("id", 1);
    });
  });

  describe("when a request is made to create a new movie", () => {
    beforeEach(() =>
      provider.addInteraction({
        state: "create a new movie",
        uponReceiving: "a request to create a new movie",
        withRequest: {
          method: "POST",
          path: "/movies",
          body: like(movie),
          headers: {
            "Content-Type": "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          body: like(movie),
        },
      })
    );

    test("should create a new movie", async () => {
      const response = await addNewMovie(provider.mockService.baseUrl, movie);
      expect(response).toMatchObject(movie);
    });
  });
});
