import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListSearch';

const sortingOptions = {
  LATEST: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  HIGHEST_RATED: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  LOWEST_RATED: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' },
}

export const RepositioryListContainer = ({ repositories, selectedSort, setSelectedSort, searchKeyword, setSearchKeyword, onEndReached }) => {
  const repositoryNodes = repositories?.edges?.map(edge => edge.node) || [];
  const navigate = useNavigate()

  return (

    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={
        ({ item }) => (
          <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
            <RepositoryItem item={item} />
          </Pressable>
        )
      }
      ListHeaderComponent={<RepositoryListHeader selectedSort={selectedSort} setSelectedSort={setSelectedSort} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState('LATEST');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);
  const { orderBy, orderDirection } = sortingOptions[selectedSort] || sortingOptions.LATEST;
  const { repositories, fetchMore } = useRepositories({ first: 5, orderBy, orderDirection, searchKeyword: debouncedKeyword });

  const onEndReached = () => {
    fetchMore();
  };

  return (
    <RepositioryListContainer
      repositories={repositories}
      onEndReached={onEndReached}
      selectedSort={selectedSort}
      setSelectedSort={setSelectedSort}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};


const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  container: {
    padding: 15,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  language: {
    color: '#ffffff',
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    borderRadius: 5,
    padding: 4,
  },
  info: {
    flexShrink: 1,
  },

});

export default RepositoryList;
