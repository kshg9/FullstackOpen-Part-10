import { Picker } from '@react-native-picker/picker';

const RepositorySortPicker = ({ selectedSort, onChange }) => {
  return (
    <Picker selectedValue={selectedSort} onValueChange={onChange}>
      <Picker.Item label="Sort by" value="" enabled={false} color='#7F8CAA' />
      <Picker.Item label="Latest repositories" value="LATEST" />
      <Picker.Item label="Highest rated repositories" value="HIGHEST_RATED" />
      <Picker.Item label="Lowest rated repositories" value="LOWEST_RATED" />
    </Picker>
  );
};

export default RepositorySortPicker;
