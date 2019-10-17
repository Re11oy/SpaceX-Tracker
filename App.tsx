import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import DashboardScreen from './src/Components/DashboardScreen';
import { TABBAR_ICONS, TABS } from './src/constants';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import theme from './src/theme';

const Dashboard = createStackNavigator({
  dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: 'Dashboard',
      header: null,
      headerBackTitle: null
    }
  }
  // details: { screen: LaunchDetailsScreen }
});

const Navigation = createBottomTabNavigator(
  {
    [TABS.Home]: Dashboard,
    [TABS.Calendar]: Dashboard
    // [TABS.News]: News,
    // [TABS.Search]: Search,
    // [TABS.Settings]: Settings
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        const iconName = TABBAR_ICONS[routeName];
        return <Icon name={iconName} size={20} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: theme.inactive,
      showLabel: true,
      style: {
        backgroundColor: theme.cardBackground
      }
    }
  }
);

export const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </>
  );
};

export default createAppContainer(Navigation);
