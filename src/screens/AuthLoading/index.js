import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import bggif from '../../assets/br.gif';
import {dimensions} from '../../theme';
import {useStore} from 'react-redux';
export default function AuthLoading({navigation}) {
  const store = useStore();
  useEffect(() => {
    setTimeout(() => {
      const {auth} = store.getState();
      if (auth.signed) {
        navigation.navigate('AppStack');
      } else {
        navigation.navigate('AuthStack');
      }
    }, 8000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={bggif}
        resizeMode="contain"
        style={{
          height: dimensions.height,
          width: dimensions.width,
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
    </View>
  );
}
