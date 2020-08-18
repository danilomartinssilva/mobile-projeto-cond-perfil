import React, {useLayoutEffect, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {dimensions, colors, spacing} from '../../../theme';
import {format, parseISO} from 'date-fns';
import {FAB} from 'react-native-paper';
import {
  Container,
  Card,
  ContainerInfo,
  TitleEventText,
  InfoEventText,
  OptionsContainer,
} from './styles';
import {useSelector, useStore, useDispatch} from 'react-redux';
import Condominiums from '../../../store/modules/condominiums';

export default function CondominiumsListScreen({navigation}) {
  const condominiums = useSelector((state) => state.condominiums);
  const store = useStore();
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !store.getState().condominiums ||
      !store.getState().condominiums.items ||
      !store.getState().condominiums.items.length
    ) {
      dispatch(Condominiums.loadCondominiumRequest());
    }
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Condominios',
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
  function formatDate(date) {
    let convertDate = format(parseISO(date), 'd-MM-yyyy');
    return convertDate;
  }
  return (
    <Container>
      <FlatList
        data={condominiums.items}
        renderItem={({item, index}) => (
          <Card>
            <ContainerInfo>
              <TitleEventText>{item.name}</TitleEventText>
              <InfoEventText>Sem mais descrições</InfoEventText>
            </ContainerInfo>
            <OptionsContainer>
              <TouchableOpacity>
                <Ionicons name="search" size={20} style={{margin: 4}} />
              </TouchableOpacity>
            </OptionsContainer>
          </Card>
        )}
      />
      <FAB
        onPress={() => navigation.navigate('CondominiumsCreateScreen')}
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 50,
        }}
        small
        icon="plus"
      />
    </Container>
  );
}
