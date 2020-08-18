import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {colors, spacing} from '../theme';

const OkCancelView = ({cancelText, okText, onCancel, onOk, children}) => {
  return (
    <View style={styles.okCancelContainer}>
      {children}
      <View style={[styles.buttons, styles.spacing]}>
        <View style={{paddingRight: spacing.sm}}>
          <Button
            style={styles.button}
            mode={'text'}
            compact={true}
            onPress={onCancel}>
            {cancelText}
          </Button>
        </View>
        <View style={{paddingLeft: spacing.sm}}>
          <Button
            style={styles.button}
            mode={'text'}
            compact={true}
            onPress={onOk}>
            {okText}
          </Button>
        </View>
      </View>
    </View>
  );
};

OkCancelView.defaultProps = {
  onOk: () => {},
  onCancel: () => {},
  okText: 'Ok',
  cancelText: 'Cancelar',
};

const styles = StyleSheet.create({
  okCancelContainer: {
    backgroundColor: colors.background,
    borderTopColor: colors.textLighter,
    borderTopWidth: StyleSheet.hairlineWidth,
    height: 42,
  },
  spacing: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  buttons: {
    alignContent: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    minWidth: 64,
  },
});

export default OkCancelView;
