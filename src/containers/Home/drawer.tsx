import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

const HomeDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="Home" onPress={() => props.navigation.closeDrawer()} />
    </DrawerContentScrollView>
  );
};

export default HomeDrawer;
