import React, { Component } from 'react'
import Toast from 'react-native-root-toast'
import I18n from 'react-native-i18n'

export default function ToastComponent(content) {
  let contentDetail = content || null
  if (contentDetail) {
    if (I18n.t(contentDetail).includes('missing') && I18n.t(contentDetail).includes(contentDetail) && I18n.t(contentDetail).includes('translation')) {

    } else {
      contentDetail = I18n.t(contentDetail);
    }
    return (
      Toast.show(contentDetail, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
      })
    )
  }
}
