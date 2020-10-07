import React, {useLayoutEffect, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
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
  ContainerTitle,
  InfoDescriptionContainer,
  Title,
  Description,
} from './styles';
import {useSelector, useStore, useDispatch} from 'react-redux';
import PrivateNotices from '../../../store/modules/privatenotices';
import {getProfile} from '../../../services/helper';
import convencoes_icon from '../../../assets/icons/convencoes-ico.png';

export default function PrivateNoticeListScreen({navigation}) {
  const privatenotices = useSelector((state) => state.privatenotices);
  const profile = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(PrivateNotices.loadPrivateNoticeRequest());
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Caixa de Entrada ',
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
      <ContainerTitle>
        <Image source={convencoes_icon} />
        <InfoDescriptionContainer>
          <Title>Caixa de Entrada</Title>
          <Description>Confira todas as suas mensagens</Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={privatenotices.items}
        renderItem={({item, index}) => (
          <Card>
            <ContainerInfo>
              <TitleEventText>{item.title}</TitleEventText>
              <InfoEventText>Descricao:{item.description}</InfoEventText>
              <InfoEventText>
                Data de modificação: {formatDate(item.updated_at)}
              </InfoEventText>
            </ContainerInfo>
            <OptionsContainer>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ConventionsShowScreen', {
                    id: item.id,
                  })
                }>
                <Ionicons
                  name="document-outline"
                  size={20}
                  style={{margin: 4, color: 'white'}}
                />
              </TouchableOpacity>
            </OptionsContainer>
          </Card>
        )}
      />
      {getProfile(profile) === 'SINDICO' && (
        <FAB
          onPress={() => navigation.navigate('PrivateNoticeCreateScreen')}
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 50,
          }}
          small
          icon="plus"
        />
      )}
    </Container>
  );
}
