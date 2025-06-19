import { StyleSheet, View } from "react-native";
import { Searchbar } from 'react-native-paper';
import RepositorySortPicker from "./RepositorySortPicker";

const RepositoryListHeader = ({ searchKeyword, setSearchKeyword, selectedSort, setSelectedSort }) => (
  <View>
    <Searchbar
      placeholder="Search"
      value={searchKeyword}
      onChangeText={setSearchKeyword}
      style={styles.header}
    />

    <RepositorySortPicker selectedSort={selectedSort} onChange={setSelectedSort} />
  </View>
)

const styles = StyleSheet.create({
  header: {
    margin: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
});

export default RepositoryListHeader;
