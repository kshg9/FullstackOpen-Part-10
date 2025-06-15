import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';

import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
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

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const {repositories} = useRepositories()
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

export default RepositoryList;
