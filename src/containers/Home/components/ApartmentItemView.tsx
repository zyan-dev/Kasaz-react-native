import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Apartment } from '../../../redux/types/Apartment';
import { dySize } from '../../../utils/responsive';

interface ApartmentItemViewProps {
  data: Apartment;
  onPressZoom: any;
}

const ApartmentItemView: React.FC<ApartmentItemViewProps> = ({
  data,
  onPressZoom,
}) => {
  return (
    <View style={styles.apartmentItem}>
      <Swiper
        showsButtons
        scrollEnabled={false}
        style={styles.swiper}
        nextButton={
          <Icon
            name="chevron-forward-outline"
            size={30}
            style={styles.arrowIcon}
          />
        }
        prevButton={
          <Icon
            name="chevron-back-outline"
            size={30}
            style={styles.arrowIcon}
          />
        }
      >
        {data.images.map((image: string) => (
          <View style={styles.apartmentImage} key={image} testID={image}>
            <FastImage
              style={styles.apartmentImage}
              source={{
                uri: image,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        ))}
      </Swiper>
      <View style={styles.priceView}>
        <View>
          <Text style={styles.priceText}>{`${data.price} €`}</Text>
          <Text style={styles.subPriceText}>{`${(data.price / data.sqm).toFixed(
            3
          )} € / m²`}</Text>
        </View>
        <TouchableOpacity onPress={onPressZoom}>
          <View style={styles.zoomView}>
            <Icon name="eye-outline" size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.infoView}>
        <View style={styles.infoItem}>
          <Icon name="walk-outline" size={30} />
          <Text style={styles.infoText}>{`${data.sqm} m²`}</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoItem}>
          <Icon name="bed-outline" size={30} />
          <Text style={styles.infoText}>{`${data.bedrooms} bedrooms`}</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  apartmentItem: {
    marginBottom: dySize(20),
  },
  swiper: {
    height: dySize(300),
  },
  apartmentImage: {
    width: dySize(375),
    height: dySize(300),
  },
  arrowIcon: {
    backgroundColor: '#FFFFFFAA',
    padding: 10,
  },
  priceView: {
    height: dySize(80),
    marginTop: dySize(-80),
    padding: dySize(20),
    backgroundColor: '#FFFFFF44',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  priceText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  subPriceText: {
    fontSize: dySize(18),
  },
  title: {
    fontSize: dySize(20),
    color: 'darkblue',
    padding: dySize(20),
    fontWeight: 'bold',
    backgroundColor: 'white',
  },
  infoView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: dySize(20),
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  divider: {
    height: dySize(30),
    width: 1,
    marginHorizontal: dySize(20),
    backgroundColor: 'black',
  },
  infoText: {
    fontSize: dySize(18),
  },
  infoItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoomView: {
    width: dySize(40),
    height: dySize(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dySize(20),
    backgroundColor: '#FFFFFFAA',
  },
});

export default ApartmentItemView;
