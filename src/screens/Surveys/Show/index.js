import React, {useLayoutEffect, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Images,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FeatherIcon from 'react-native-vector-icons/Feather';
import {dimensions, colors, spacing} from '../../../theme';
import {format, parseISO} from 'date-fns';
import PDFView from 'react-native-view-pdf';

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
import Surveys from '../../../store/modules/surveys';
import {getProfile} from '../../../services/helper';
import api from '../../../services/api';
import WebView from 'react-native-webview';

export default function SurveyShowScreen({navigation, route}) {
  const surveys = useSelector((state) => state.surveys);

  const dispatch = useDispatch();
  const {id} = route.params;

  useEffect(() => {
    dispatch(Surveys.showSurveyRequest(id));
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Realize sua votação',
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
        {/*  <Image source={reservas_icon} /> */}
        <InfoDescriptionContainer>
          <Title>Enquetes</Title>
          <Description>
            Realize sua participação, escolhendo uma opção a baixo!
          </Description>
        </InfoDescriptionContainer>
      </ContainerTitle>

      {!!surveys.detail &&
        !!surveys.detail.questions &&
        !!surveys.detail.questions.length && (
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={surveys.detail.questions}
            ListHeaderComponent={() => (
              <ContainerInfo>
                <TitleEventText>{surveys.detail.header}</TitleEventText>
              </ContainerInfo>
            )}
            renderItem={({item, index}) => (
              <Card>
                {surveys.detail && !surveys.detail.voted && (
                  <OptionsContainer>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(Surveys.addVoteRequest(item.id));
                      }}>
                      <FeatherIcon
                        name="circle"
                        size={20}
                        style={{margin: 4, color: colors.white}}
                      />
                    </TouchableOpacity>
                  </OptionsContainer>
                )}
                <ContainerInfo>
                  <TitleEventText>
                    {item.question} - {item.total} votos
                  </TitleEventText>
                </ContainerInfo>
              </Card>
            )}
          />
        )}
    </Container>
  );
}
