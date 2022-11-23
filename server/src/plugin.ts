export const loggingPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext) {
    console.log('Request started! Query:\n' + requestContext.request.query);

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart(requestContext) {
        console.log('Parsing started!');
        return async (err) => {
          if (err) {
            console.error(err);
          }
        };
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart(requestContext) {
        console.log('Validation started!');
        return async (errs) => {
          if (errs) {
            errs.forEach((err) => console.error(err));
          }
        };
      },

      async executionDidStart() {
        console.log('Execution started!');
        return {
          async executionDidEnd(err) {
            if (err) {
              console.error(err);
            }
          },
        };
      },
    };
  },
};
