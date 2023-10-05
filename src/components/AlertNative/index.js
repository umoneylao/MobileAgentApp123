import React, { Component } from 'react'
import { Alert } from 'react-native'
import I18n from 'react-native-i18n'
export default function AlertNative(content, notification) {
  let msg;
  if (null === content) {
    msg = I18n.t('NoResponsePleaseTryAgain');
  } else {
    msg = I18n.t(content);
    if (msg.includes('missing') && msg.includes(content) && msg.includes("translation")) {
      msg = content;
    }
  }
  let notify;
  if (!notification) {
    notify = I18n.t('info')
  } else {
    notify = I18n.t(notification);
    if (notify.includes('missing') && notify.includes(notification) && notify.includes('translation')) {
      notify = notification;
    }
  }
  return (
    Alert.alert(
      notify,
      msg,
    )
  )
}
