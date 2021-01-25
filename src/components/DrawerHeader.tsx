import React from 'react';
import {View, Image, StyleSheet, ViewPropTypes} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {Logo} from '../assets/images/_index';
import {dySize} from '../utils/responsive';

const styles = StyleSheet.create({
  container: {
    height: dySize(80),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: dySize(20),
    paddingHorizontal: dySize(12),
    backgroundColor: 'white',
    zIndex: 10,
  },
  hambugerIcon: {
    fontSize: dySize(30),
  },
  drawerIcon: {
    height: dySize(50),
    width: dySize(150),
    resizeMode: 'contain',
  },
});

interface DrawerHeaderProps {
  onPressHambuger: any;
}

const DrawerHeader: React.FC<DrawerHeaderProps> = ({onPressHambuger}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPressHambuger()}>
        <Icon name="menu-outline" size={30} style={styles.hambugerIcon} />
      </TouchableOpacity>
      <Image source={Logo} style={styles.drawerIcon} />
    </View>
  );
};

export default DrawerHeader;
