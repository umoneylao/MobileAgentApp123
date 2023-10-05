import I18n from 'react-native-i18n'
import { AlertNative } from '../components'

export const handleResponseCode = (responseCode, params) => {
  var text = I18n.t(responseCode.toString(), params)
  var specialResponseCode = [10309, 10120, 10845, 10836, 10832, 10935, 10151, 10934, 10933, 10113, 10833, 10157, 99998, 10155, 10156, 10119, 10175, 10115, 10122, 10576]
  const found = specialResponseCode.find(id => id == responseCode.toString());
  if (found) {
    text = I18n.t(responseCode.toString());
  } else {
    text = I18n.t('transactionIsUnsuccessful')
  }
  AlertNative(text);
}
