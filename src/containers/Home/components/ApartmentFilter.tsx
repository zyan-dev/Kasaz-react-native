import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { dySize } from '../../../utils/responsive';
import { FilterParams } from '../../../redux/home/actions';
import {
  priceOptions,
  sqmOptions,
  MAX_SQUARE,
  MAX_PRICE,
} from '../../../utils/constants';
import Button from '../../../components/Button';

const customPickerStyles = {
  inputIOS: {
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    height: dySize(40),
    width: dySize(120),
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    height: dySize(40),
    width: dySize(120),
  },
};

interface FilterViewProps {
  visible: boolean;
  onSubmit: any;
  params?: FilterParams;
  props?: any;
  testID?: string;
}

const ApartmentFilterView: React.FC<FilterViewProps> = ({
  visible,
  onSubmit,
  params = {},
  testID = '',
}) => {
  const [minPrice, setMinPrice] = useState(params.minPrice || 0);
  const [maxPrice, setMaxPrice] = useState(params.maxPrice || MAX_PRICE);
  const [minSquare, setMinSquare] = useState(params.minSquare || 0);
  const [maxSquare, setMaxSquare] = useState(params.maxSquare || MAX_SQUARE);
  const [bedrooms, setBedrooms] = useState(params.bedrooms || 0);

  const onSaveFilterOptions = () => {
    onSubmit(minPrice, maxPrice, minSquare, maxSquare, bedrooms);
  };

  if (!visible) return null;
  return (
    <View testID={testID} style={styles.container}>
      <Text style={styles.sectionTitle}>Price (€)</Text>
      <View style={styles.sectionView}>
        <View style={[styles.sectionView, { width: dySize(120) }]}>
          <RNPickerSelect
            onValueChange={setMinPrice}
            value={minPrice}
            placeholder={{ label: 'Min', value: 0 }}
            useNativeAndroidPickerStyle={false}
            items={priceOptions}
            style={customPickerStyles}
            Icon={() => (
              <View style={styles.dropdownIconView}>
                <Icon name="chevron-down-outline" size={20} color="green" />
              </View>
            )}
          />
        </View>
        <Text style={styles.sectionTitle}>-</Text>
        <View style={[styles.sectionView, { width: dySize(120) }]}>
          <RNPickerSelect
            onValueChange={setMaxPrice}
            value={maxPrice}
            placeholder={{ label: 'Max', value: MAX_PRICE }}
            useNativeAndroidPickerStyle={false}
            items={priceOptions.filter((i: any) => i.value > minPrice)}
            style={customPickerStyles}
            Icon={() => (
              <View style={styles.dropdownIconView}>
                <Icon name="chevron-down-outline" size={20} color="green" />
              </View>
            )}
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>Square (m²)</Text>
      <View style={styles.sectionView}>
        <View style={[styles.sectionView, { width: dySize(120) }]}>
          <RNPickerSelect
            onValueChange={setMinSquare}
            value={minSquare}
            placeholder={{ label: 'Min', value: 0 }}
            useNativeAndroidPickerStyle={false}
            items={sqmOptions}
            style={customPickerStyles}
            Icon={() => (
              <View style={styles.dropdownIconView}>
                <Icon name="chevron-down-outline" size={20} color="green" />
              </View>
            )}
          />
        </View>
        <Text style={styles.sectionTitle}>-</Text>
        <View style={[styles.sectionView, { width: dySize(120) }]}>
          <RNPickerSelect
            onValueChange={setMaxSquare}
            value={maxSquare}
            placeholder={{ label: 'Max', value: MAX_SQUARE }}
            useNativeAndroidPickerStyle={false}
            items={sqmOptions.filter((i: any) => i.value > (minSquare || 0))}
            style={customPickerStyles}
            Icon={() => (
              <View style={styles.dropdownIconView}>
                <Icon name="chevron-down-outline" size={20} color="green" />
              </View>
            )}
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>Bedrooms</Text>
      <Picker
        selectedValue={bedrooms}
        style={{ height: dySize(150), width: dySize(120) }}
        onValueChange={(itemValue, itemIndex) => setBedrooms(Number(itemValue))}
      >
        <Picker.Item label="All" value={0} />
        <Picker.Item label="1+" value={1} />
        <Picker.Item label="2+" value={2} />
        <Picker.Item label="3+" value={3} />
        <Picker.Item label="4+" value={4} />
        <Picker.Item label="5+" value={5} />
      </Picker>
      <Button title="Save and Filter" onPress={onSaveFilterOptions} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: dySize(10),
  },
  sectionTitle: {
    fontSize: dySize(20),
    marginHorizontal: 10,
    height: dySize(24),
  },
  sectionView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: dySize(10),
  },
  dropdownIconView: {
    height: dySize(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default ApartmentFilterView;
