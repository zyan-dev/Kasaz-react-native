import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './Home';
import HomeDrawer from './drawer';

const Drawer = createDrawerNavigator();

const AuthStack: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <HomeDrawer {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default AuthStack;
