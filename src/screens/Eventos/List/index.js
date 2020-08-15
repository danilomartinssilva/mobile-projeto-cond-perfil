import React, {useLayoutEffect} from 'react'
import {View, Text} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function EventosListScreen ({navigation}) {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Eventos',
      headerLeft: () => (
        <MaterialIcons
          name='menu'
          size={28}
          style={{margin: 8, paddingRight: 10}}
          onPress={() => navigation.openDrawer()}
        />
      ),
    })
  }, [navigation])
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Eventos</Text>
    </View>
  )
}
