import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { dySize } from '../utils/responsive';

interface SearchInputProps {
  width?: number;
  placeholder?: string;
  onChange: any;
}

const SearchInput: React.FC<SearchInputProps> = ({
  width = dySize(345),
  placeholder = 'Search by...',
  onChange,
}) => {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        placeholder={placeholder}
      />
      <Icon name="search-outline" size={30} style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    overflow: 'hidden',
  },
  input: {
    height: dySize(30),
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 20,
  },
  searchIcon: {
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
  },
});

export default SearchInput;
