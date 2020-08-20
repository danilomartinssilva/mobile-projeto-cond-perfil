import React, {useState, forwardRef} from 'react';
import collect from 'collect.js';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  InteractionManager,
  TextInput as TextInputNative,
  Text,
} from 'react-native';

import {
  Appbar,
  Checkbox,
  Divider,
  List,
  Searchbar,
  TextInput,
} from 'react-native-paper';

import DismissKeyboard from '../components/DismissKeyboard';

import StyledListEmpty from '../components/StyledListEmpty';
import StyledSearchBarGroup from '../components/StyledSearchBarGroup';
import {colors, images, spacing} from '../theme';

import InputForm from '../components/InputForm';

const StyledModalField = (props) => {
  const {
    avatar,
    data,
    enabled,
    placeholder,
    label,
    loading,
    mode,
    errors,
    onChangeValue,
    search,
    selectedValue,
    title,
  } = props;

  /**
   * @description FIXME: no iOS está com problema na animação com hardware.
   */
  const hardwareAccelerated = Platform.select({
    ios: false,
    default: true,
  });

  const searchedValue = {
    items: [],
    query: '',
    searching: false,
  };

  let defaultProps = {editable: false};

  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState(selectedValue);
  const [searched, setSearched] = useState(searchedValue);

  if (loading === true) {
    defaultProps = {
      ...defaultProps,
      render: () => {
        return (
          <View style={styles.loading}>
            <ActivityIndicator size={'small'} />
          </View>
        );
      },
    };
  }

  /**
   * @description Obter o valor correto para o label.
   */
  const getLabelSelected = (value) => {
    if (typeof data === 'undefined') {
      return;
    }

    if (mode === 'multiple') {
      return `${value.length} selecionado(s)`;
    }

    const collection = collect(data).where('value', value).first();

    return collection ? collection.label : '';
  };

  /**
   * @description Exibe o modal.
   */
  const onVisibleModal = () => {
    if (enabled === false || loading === true) {
      return;
    }

    InteractionManager.runAfterInteractions(() => {
      setVisible(true);
    });
  };

  /**
   * @description Oculta o modal.
   */
  const onHiddenModal = () => {
    setVisible(false);
    setSearched(searchedValue);
  };

  /**
   * @description Popula a lista com os valores filtrados.
   */
  const onSearch = (value) => {
    const text = value.trim().toLowerCase();
    const filtered = data.filter((item) => {
      return item.label.toLowerCase().indexOf(text) !== -1;
    });
    setSearched({items: filtered, query: value, searching: true});
  };

  /**
   * @description Método para disparar a ação de seleção de um item.
   */
  const onPressItemSelected = (value) => {
    setValues(value);
    onHiddenModal();
    onChangeValue(value);
  };

  /**
   * @description Método para disparar a ação de seleção de múltiplos items.
   */
  const onPressItemChecked = (value) => {
    let tmp = [...values];

    if (tmp.includes(value)) {
      tmp.splice(tmp.indexOf(value), 1);
    } else {
      tmp.push(value);
    }

    setValues(tmp);
    onChangeValue(tmp);
  };

  /**
   * @description Renderiza o item da lista.
   */
  const renderItem = ({item}) => {
    let itemProps = {
      title: item.label,
    };

    if (item.description) {
      itemProps.description = item.description;
    }

    if (mode === 'simple') {
      const onPress = () => onPressItemSelected(item.value);
      itemProps = {...itemProps, onPress};
    }

    if (mode === 'multiple') {
      const status = values.includes(item.value) ? 'checked' : 'unchecked';
      const left = () => <Checkbox status={status} />;
      const onPress = () => onPressItemChecked(item.value);
      itemProps = {...itemProps, left, onPress};
    }

    return <List.Item {...itemProps} />;
  };

  /**
   * @description Renderiza um alerta de lista vazia.
   */
  const renderListEmpty = () => (
    <StyledListEmpty
      title={'Buscamos por toda parte!'}
      body={'Infelizmente, não encontramos nada.'}
      image={images.empty_search}
    />
  );

  /**
   * @description Uma otimização que permite pular a medição do conteúdo.
   **/
  const getItemLayout = (_data, index) => ({
    length: 56,
    offset: 56 * index,
    index,
  });

  const renderSeparator = () => (
    <Divider
      style={
        avatar
          ? styles.marginAvatar
          : mode === 'multiple'
          ? styles.marginMultiple
          : styles.marginText
      }
    />
  );

  return (
    <>
      <TouchableOpacity onPress={onVisibleModal} activeOpacity={0.8}>
        <InputForm
          editable={false}
          placeholder={placeholder}
          messageError={errors}
          value={getLabelSelected(values)}
          label={label}
          style={{marginHorizontal: 10}}></InputForm>
      </TouchableOpacity>

      <Modal
        animationType={'slide'}
        hardwareAccelerated={hardwareAccelerated}
        onRequestClose={onHiddenModal}
        transparent={false}
        visible={visible}>
        <View style={styles.container}>
          <Appbar.Header style={styles.appbar}>
            <Appbar.Content title={title} />
            <Appbar.Action icon={'close'} onPress={onHiddenModal} />
          </Appbar.Header>

          {search === true && (
            <StyledSearchBarGroup>
              <DismissKeyboard>
                <Searchbar
                  placeholder="Pesquisar"
                  value={searched.query}
                  onChangeText={(value) => onSearch(value)}
                />
              </DismissKeyboard>
            </StyledSearchBarGroup>
          )}

          {searched.searching === false && (
            <FlatList
              data={data}
              keyExtractor={(item) => String(item.value)}
              ItemSeparatorComponent={renderSeparator}
              renderItem={renderItem}
              ListEmptyComponent={renderListEmpty}
              getItemLayout={getItemLayout}
            />
          )}

          {searched.searching === true && (
            <FlatList
              data={searched.items}
              keyExtractor={(item) => String(item.value)}
              keyboardShouldPersistTaps={'handled'}
              ItemSeparatorComponent={renderSeparator}
              renderItem={renderItem}
              ListEmptyComponent={renderListEmpty}
              getItemLayout={getItemLayout}
            />
          )}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  appbar: {
    elevation: 0,
    backgroundColor: colors.primaryLight,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  loading: {
    marginHorizontal: spacing.sm,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 58,
  },
  marginText: {
    marginLeft: spacing.md,
  },
  marginAvatar: {
    marginLeft: spacing.sm * 9,
  },
  marginMultiple: {
    marginLeft: spacing.sm * 6,
  },
});

StyledModalField.defaultProps = {
  avatar: false,
  enabled: true,
  loading: false,
  mode: 'simple',
  search: false,
  title: 'Selecione',
};

export default StyledModalField;
