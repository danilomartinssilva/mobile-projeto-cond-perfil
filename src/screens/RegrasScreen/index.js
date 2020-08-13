import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function RegrasScreen({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Regras',
      headerLeft: () => (
        <MaterialIcons
          name="menu"
          size={28}
          style={{margin: 8, paddingRight: 10}}
          onPress={() => navigation.openDrawer()}
        />
      ),
    });
  }, [navigation]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Regras</Text>
    </View>
  );
}
