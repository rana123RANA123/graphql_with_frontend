import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: 'http://localhost:8000', // Update with your GraphQL server URL
});

const authLink = setContext((_, { headers }) => {
    // Add your auth logic here if needed
    return {
        headers: {
            ...headers,
        },
    };
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
