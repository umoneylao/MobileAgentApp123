import { put, takeLatest, call } from 'redux-saga/effects'
import { GET_PACKAGE_APA_FAILED,GET_PACKAGE_APA_SUCCESS,GET_PACKAGE_APA,
  GET_PACKAGE_OPTION_APA, GET_PACKAGE_OPTION_APA_FAILED, GET_PACKAGE_OPTION_APA_SUCCESS,
  PAY_MENT_INSURANCE, PAY_MENT_INSURANCE_FAILED, PAY_MENT_INSURANCE_SUCCESS
} from '../actions/types'
import { getPackageInsurance, getOptionPackageInsurance, paymentInsurance } from '../utils/Api'

function* callPackageInsurance() {
    try {
      const response = yield getPackageInsurance();
      if (response.ok && response.status === 200) {
        if (response.data.ApaRequestList.ApaRequestListModel.length >= 1) {
          yield put({ type: GET_PACKAGE_APA_SUCCESS, data: response.data })
        } else {
          yield put({ type: GET_PACKAGE_APA_FAILED })
        }
      } else {
        yield put({ type: GET_PACKAGE_APA_FAILED })
      }
    } catch (error) {
      yield put({ type: GET_PACKAGE_APA_FAILED, data: { error: error } })
    }
  }
  export function* watcPackageInsurance() {
    yield takeLatest(GET_PACKAGE_APA, callPackageInsurance)
  }



function* callOptionPackageInsurance(action) {
  try {
    const response = yield getOptionPackageInsurance(action.item);
    console.log('ApaRequestDetailListModel:', response.data)
    if (response.ok && response.status === 200) {
      if (response.data.ApaRequestDetailList.ApaRequestDetailListModel.length >= 1) {
        yield put({ type: GET_PACKAGE_OPTION_APA_SUCCESS, data: response.data })
      } else {
        yield put({ type: GET_PACKAGE_OPTION_APA_FAILED })
      }
    } else {
      yield put({ type: GET_PACKAGE_OPTION_APA_FAILED })
    }
  } catch (error) {
    yield put({ type: GET_PACKAGE_OPTION_APA_FAILED, data: { error: error } })
  }
}
export function* watcOptionPackageInsurance() {
  yield takeLatest(GET_PACKAGE_OPTION_APA, callOptionPackageInsurance)
}

function* callPaymentInsurance(action) {
  try {
      const dataReturn = yield paymentInsurance(action.data)
      // console.log('dataReturn:', dataReturn)
      // console.log('data:', dataReturn.config.data)
      yield put({ type: PAY_MENT_INSURANCE_SUCCESS, data: dataReturn })
  } catch (error) {
      yield put({ type: PAY_MENT_INSURANCE_FAILED, error })
  }
}
export function* watcPaymentInsurance() {
  yield takeLatest(PAY_MENT_INSURANCE, callPaymentInsurance)
}



