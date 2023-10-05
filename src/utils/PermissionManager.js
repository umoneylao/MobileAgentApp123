import { Platform, PermissionsAndroid } from 'react-native';
import { CAMERA, VALIDATE_LEASED_LINE, PERMISSION_RESULTS, READ_CONTACTS, WRITE_CONTACTS } from './Constant';
import I18n from 'react-native-i18n';
import { Toast } from '../components';
import Permission from 'react-native-permissions'
import { checkPermission } from 'react-native-android-permissions';

async function requestCamera() {
  try {
    const granted = await PermissionsAndroid.request(
      CAMERA,
      {
        'title': I18n.t('appName') + I18n.t('cameraPermission'),
        'message': I18n.t('appName') + I18n.t('needsYourGrantOf') + I18n.t('cameraPermission')
          + I18n.t('scanQRCode')
      }
    )
    if (granted === PERMISSION_RESULTS.GRANTED) {
      Toast(I18n.t('cameraPermission') + I18n.t('granted'));
      return true;
    } else if (granted === PERMISSION_RESULTS.NEVER_ASK_AGAIN) {
      Toast(I18n.t('youShouldAllowAppToUseCamera'));
      return false;
    } else {
      Toast(I18n.t('cameraPermission') + I18n.t('denied'));
      return false;
    }
  } catch (err) {
    Toast(err)
    return false;
  }
}

export async function isGrantedCamera() {
  if (PermissionsAndroid.check(CAMERA)) {
    return true;
  } else {
    requestCamera();
  }
}

async function requestContact() {
  if (Platform.OS === 'android') {
    Permission.request('contacts').then(response => {
      switch (response.trim()) {
        case PERMISSION_RESULTS.GRANTED:
          Toast(I18n.t('contactPermission') + I18n.t('granted'));
          return true;
        case PERMISSION_RESULTS.RESTRICTED:
          Toast(I18n.t('youShouldAllowAppToUseContact'));
          return false;
        case PERMISSION_RESULTS.DENIED:
          Toast(I18n.t('contactPermission') + I18n.t('denied'));
          return false;
      }
    })
  }
}

export async function isGrantedContact() {
  checkPermission(READ_CONTACTS).then((result) => {
    return true;
  }, (result) => {
    requestContact()
    return false;
  });
}

