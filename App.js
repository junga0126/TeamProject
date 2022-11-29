import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack'
import Login from './Screens/Login';
import SignUp from './Screens/SignUp';
import Home from './Screens/Home';
import Test from './Screens/Test';
import StartTest from './Screens/StartTest';
import Strategy from './Screens/Strategy';
import Prompt from './Screens/Prompt';

const Stack = createStackNavigator();
//
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'
        screenOptions={{
          headerStyle:{backgroundColor:"#89EE"},
          geaderTitleStyle:{fontWeight:"bold", color:'black'}
        }}
      >
        <Stack.Screen 
          name ="SignUp"
          component={SignUp}
          options = {{title:"SignUp Screen"}}
        />
        <Stack.Screen 
          name='Home'
          component={Home}
          options = {{title:"Home Screen"}}
        />
        <Stack.Screen 
          name='Login' 
          component={Login}
          options = {{title:"Login Screen"}}
        />
        <Stack.Screen 
          name='Test' 
          component={Test}
          options = {{title:"Test Screen"}}
        />
        <Stack.Screen 
          name='StartTest' 
          component={StartTest}
          options = {{title:"StartTest Screen"}}
        />
        <Stack.Screen 
          name='Strategy' 
          component={Strategy}
          options = {{title:"Strategy Screen"}}
        />
        <Stack.Screen 
          name='Prompt' 
          component={Prompt}
          options = {{title:"Prompt Screen"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}