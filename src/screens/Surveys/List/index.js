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
  Title,
  InfoDescriptionContainer,
  Description,
} from './styles';
import {useSelector, useStore, useDispatch} from 'react-redux';
import Surveys from '../../../store/modules/surveys';
import {getProfile} from '../../../services/helper';
import reservas_icon from '../../../assets/icons/reservas-ico.png';

export default function SurveysListScreen({navigation}) {
  const surveys = useSelector((state) => state.surveys);
  const profile = useSelector((state) => state.profile);
  const store = useStore();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Surveys.loadSurveyRequest());
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Enquetes',
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
  function renderStatusItem(item) {
    if (item.status === 'waiting') {
      return (
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Aprovacao de evento', 'Deseja aprovar este evento', [
              {
                text: 'Sim, aprovar',
                onPress: () => {
                  dispatch(
                    Events.updateEventRequest({
                      id: item.id,
                      status: 'approved',
                    }),
                  );
                },
              },
              {
                text: 'Nao, alterar',
                onPress: () => {},
              },
              {
                text: 'Cancelar Evento',
                onPress: () => {
                  /*     dispatch(
                    Events.updateEventRequest({
                      id: item.id,
                      status: 'cancelled',
                    }),
                  ) */
                },
              },
            ]);
          }}>
          <FeatherIcon
            name="clock"
            size={20}
            style={{margin: 4, color: colors.white}}
          />
        </TouchableOpacity>
      );
    } else if (item.status === 'approved') {
      return (
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Cancelar Evento', 'Deseja cancelar este evento', [
              {
                text: 'Sim, cancelar',
                onPress: () => {
                  /*  dispatch(
                    Events.updateEventRequest({
                      id: item.id,
                      status: 'cancelled',
                    }),
                  ) */
                },
              },
              {
                text: 'Nao, alterar',
                onPress: () => {},
              },
              {
                text: 'Cancelar Evento',
                onPress: () => {
                  /*  dispatch(
                    Events.updateEventRequest({
                      id: item.id,
                      status: 'cancelled',
                    }),
                  ) */
                },
              },
            ]);
          }}>
          <FeatherIcon
            name="check-circle"
            size={20}
            style={{margin: 4, color: colors.white}}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Aprovar Evento', 'Deseja aprovar este evento', [
              {
                text: 'Sim, cancelar',
                onPress: () => {
                  /*  dispatch(
                    Events.updateEventRequest({
                      id: item.id,
                      status: 'approved',
                    }),
                  ) */
                },
              },
              {
                text: 'Nao, alterar',
                onPress: () => {},
              },
              {
                text: 'Aprovar Evento',
                onPress: () => {
                  /*   dispatch(
                    Events.updateEventRequest({
                      id: item.id,
                      status: 'cancelled',
                    }),
                  ) */
                },
              },
            ]);
          }}>
          <FeatherIcon name="x-circle" size={20} style={{margin: 4}} />
        </TouchableOpacity>
      );
    }
  }

  return (
    <Container>
      <ContainerTitle>
        <Image source={reservas_icon} />
        <InfoDescriptionContainer>
          <Title>Enquetes</Title>
          <Description>Confira as enquetes do seu condomínio</Description>
        </InfoDescriptionContainer>
      </ContainerTitle>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={surveys.items}
        renderItem={({item, index}) => (
          <Card>
            <ContainerInfo>
              <TitleEventText>{item.header}</TitleEventText>
            </ContainerInfo>
            <OptionsContainer>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SurveyShowScreen', {
                    id: item.id,
                  })
                }>
                <Ionicons
                  name="search"
                  size={20}
                  style={{margin: 4, color: colors.white}}
                />
              </TouchableOpacity>
            </OptionsContainer>
          </Card>
        )}
      />
      <FAB
        onPress={() => navigation.navigate('SurveysCreateScreen')}
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
