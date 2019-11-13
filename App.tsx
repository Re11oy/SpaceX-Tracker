import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StatusBar } from 'react-native';
import DashboardScreen from './src/Components/DashboardScreen';
import { TABBAR_ICONS, TABS } from './src/constants';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { theme } from './src/theme';
import { ThemeProvider } from 'styled-components/native';
import LaunchDetailsScreen from './src/Components/LaunchDetailsScreen';
import LaunchCalendarScreen from './src/Components/LaunchCalendarScreen/LaunchCalendarScreen';
import launchesStore from './src/Models/LaunchesStore';
import newsStore from './src/Models/NewsStore';
import { Provider } from 'mobx-react';
import SettingsScreen from './src/Components/SettingsScreen/SettingsScreen';
import NewsScreen from './src/Components/NewsScreen/NewsScreen';
import LinksScreen from './src/Components/LaunchCalendarScreen/LinksScreen';
import GalleryScreen from './src/Components/GalleryScreen/GalleryScreen';
import LibrariesScreen from './src/Components/SettingsScreen/LibrariesScreen';

const Dashboard = createStackNavigator({
  dashboard: {
    screen: DashboardScreen,
    navigationOptions: {
      title: 'Dashboard',
      header: null,
      headerBackTitle: null
    }
  },
  details: { screen: LaunchDetailsScreen }
});

const LaunchCalendar = createStackNavigator({
  launchCalendar: {
    screen: LaunchCalendarScreen,
    navigationOptions: {
      title: 'Launch calendar',
      header: null,
      headerBackTitle: null
    }
  },
  details: { screen: LaunchDetailsScreen },
  links: { screen: LinksScreen },
  gallery: { screen: GalleryScreen }
});

const News = createStackNavigator({
  news: {
    screen: NewsScreen,
    navigationOptions: {
      title: 'News',
      header: null,
      headerBackTitle: null
    }
  }
});

const Settings = createStackNavigator({
  search: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
      header: null,
      headerBackTitle: null
    }
  },
  libraries: { screen: LibrariesScreen }
});

const Navigation = createBottomTabNavigator(
  {
    [TABS.Home]: Dashboard,
    [TABS.Calendar]: LaunchCalendar,
    [TABS.News]: News,
    // [TABS.Search]: Search,
    [TABS.Settings]: Settings
  },
  {
    initialRouteName: TABS.Settings,
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        const iconName = TABBAR_ICONS[routeName];
        return <Icon name={iconName} size={20} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: theme.colors.inactive,
      showLabel: true,
      style: {
        backgroundColor: theme.colors.cardBackground
      }
    }
  }
);

const AppContainer = createAppContainer(Navigation);

const App: React.FC = () => {
  return (
    <Provider launches={launchesStore} news={newsStore}>
      <ThemeProvider theme={theme}>
        <>
          <StatusBar barStyle="light-content" />
          <AppContainer />
        </>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
