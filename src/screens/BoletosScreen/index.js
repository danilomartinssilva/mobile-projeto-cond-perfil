import React, {useEffect, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BoletosScreen({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Boletos',
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
    <View style={{flex: 1}}>
      <WebView
        originWhitelist={['*']}
        source={{uri: 'https://www.brcondominio.com.br/condomino'}}
      />
    </View>
  );
}
