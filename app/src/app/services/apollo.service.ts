/**
 * Path of child
 *
 * authorization', `Bearer ${token}`)
      };
    });

    const errorLink: ApolloLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );

      if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    const httpLink: ApolloLink = this.httpLink.create({ uri: environment.apollo.url });

    this.apollo.create({
      link: ApolloLink.from([authLink, errorLink, httpLink]),
      cache: new InMemoryCache()
    });

    this._apolloClient = this.apollo;

    return this._apolloClient;
  }
}
