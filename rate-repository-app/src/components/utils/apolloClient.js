import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { relayStylePagination } from '@apollo/client/utilities';
import Constants from 'expo-constants';

const { apolloUri } = Constants.expoConfig.extra;

const httpLink = createHttpLink({
    uri: apolloUri,
})

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                repositories: relayStylePagination(),
            }
        },
        Repository: {
            fields: {
                reviews: relayStylePagination(),
            }
        }
    }
})

const createApolloClient = (authStorage) => {
    const authLink = setContext(async (_, { headers }) => {
        try {
            const accessToken = await authStorage.getAccessToken();
            return {
                headers: {
                    ...headers,
                    authorization: accessToken ? `Bearer ${accessToken}` : ''
                },
            };
        } catch (e) {
            console.error(e)
            return { headers };
        }
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache
    });
};

export default createApolloClient;
