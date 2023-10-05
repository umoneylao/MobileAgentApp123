import React, { Component } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, Modal,
  FlatList, SafeAreaView, Dimensions, Alert, Platform, ScrollView
} from 'react-native';
import { Colors, Metrics, Fonts, Images } from '../../themes'
import { FullTextInput, SmallButton, FullNewButton, FlatListMoney } from '../../components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Constant from '../../utils/Constant'
import * as ValidationUtils from '../../utils/Validate'
import { formatNumber } from '../../utils/Formater'
import I18n from 'react-native-i18n'
import { isValidated, TRIM_SPACE } from '../../utils/Validate'
import { Animal } from '../../images'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
const radio_props = [
  { label: I18n.t('BuyForyourself'), value: 0 },
  { label: I18n.t('BuyForCustomers'), value: 1 }
];
const Money = [
  { id: 1, money: '3,000' },
  { id: 2, money: '5,000' },
  { id: 3, money: '10,000' },
  { id: 4, money: '50,000' },

]
class LotteryAnimal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountBuy: null,
      setModalVisibleShow: false,
      listAnimal: [],
      isDisableButton: true,
      Buy: [],
      arrayHolder: [],
      isDataBuy: false,
      buttonSelect: false,
      totalBuy: 0,
      setModalPhone: false,
      value: 0,
      showTxtInputPhone: false

    };
  }

  onChangeAmountBuy = (text) => {
    const { minAmount, maxAmount } = this.props;
    let errorAmountBuy = !isValidated(text, this.props.validateMoneyConst) ? I18n.t('enterMoney') : null;
    text = text.replace(ValidationUtils.REMOVE_FIRST_ZERO, '');
    text === '0' ? (text = '') : text;
    let tempText = text;

    let mMoney = parseInt(tempText.replace(/,/g, ''));

    if (minAmount) {
      let checkAmount = parseInt(mMoney) % 1000
      if (checkAmount != 0) {
        errorAmountBuy = I18n.t('formatAmount')
      }
      if (mMoney < minAmount) {
        errorAmountBuy = I18n.t('amountMustbefrom', { amount: formatNumber(minAmount + "") });
      }
      if (mMoney > maxAmount) {
        errorAmountBuy = I18n.t('amountMax', { amount: formatNumber(maxAmount + "") });
      }
    }
    this.setState({ amountBuy: formatNumber(text.trim()), errorAmountBuy, selectedMoney: null })
  }
  // ListAnimal
  onOpen() {
    this.props.onOpenListAnimal()
  }
  onShownumberLotterywinner() {
    this.setState({ setModalVisibleShow: true })
    this.getListFilms()
    this.setState({ isDisableButton: true, buttonSelect: false })
  }
  onCloes() {
    this.setState({ setModalVisibleShow: false })
    this.setState({ isDisableButton: true })
  }
  renderItemListNumber = (item, index) => {
    this.state.listAnimal
    return (
      this.state.isDisableButton ? (
        <TouchableOpacity style={styles.item} onPress={() => this.onGetdata(item, index)}>
          <View style={item.seleted == true ? styles.boderTrue : styles.boder}>
            <Image source={item.image_path} style={styles.img_Style} />
          </View>
        </TouchableOpacity>
      ) : item.seleted == true ?
        <TouchableOpacity style={styles.item} onPress={() => this.onGetdata(item, index)}>
          <View style={item.seleted == true ? styles.boderTrue : styles.boder}>
            <Image source={item.image_path} style={styles.img_Style} />
          </View>
        </TouchableOpacity>
        : <TouchableOpacity style={styles.item} onPress={() => this.onGetdata(item, index)} disabled>
          <View style={item.seleted == true ? styles.boderTrue : styles.boder}>
            <Image source={item.image_path} style={styles.img_Style} />
          </View>
        </TouchableOpacity>

    )
  }
  componentDidMount() {
    this.setState({ setModalPhone: true })
    this.getListFilms()
  }
  getListFilms = async () => {
    try {
      const res = Animal
      const newArray = res.map(e => {
        return {
          ...e,
          seleted: false
        }
      })
      this.setState({
        listAnimal: newArray
      })
    } catch (error) {
      console.log('error:', error);
    }
  }
  onGetdata(item, index) {
    const { listAnimal } = this.state;
    const newData = listAnimal.map(e => {
      if (e.id == item.id) {
        return {
          ...e,
          seleted: !e.seleted
        }
      }
      return {
        ...e,
        seleted: e.seleted
      }

    });
    const listSelected = newData.filter(e => e.seleted == true);
    if (listSelected.length >= 3) {
      this.setState({ isDisableButton: false, buttonSelect: true })

    }
    else {
      this.setState({ isDisableButton: true, buttonSelect: true })
    }

    this.setState({
      listAnimal: newData
    })

  }
  onSelect() {
    const { listAnimal } = this.state;
    const listSelected = listAnimal.filter(e => e.seleted == true);
    this.setState({ setModalVisibleShow: false, listSelected })

  }
  _renderItemAnimal = (item) => {
    return (
      <View style={styles.iconAnimal}>
        <TouchableOpacity onPress={() => this.onShownumberLotterywinner()} style={styles.iconAnimalNumberSelect}>
          <Image source={item.image_path} style={styles.iconAnimalNumberSelect} />
        </TouchableOpacity>
      </View>
    )
  }
  onPressDeleteBuy = (BuyLottery_id) => {
    Alert.alert(
      I18n.t("info"),
      I18n.t("deleteLottery"),
      [
        {
          text: I18n.t('cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: I18n.t('confirm'), onPress: () => this.handleDeleteBuy(BuyLottery_id)
        },
      ],
      { cancelable: false },
    );
  }
  handleDeleteBuy(BuyLottery_id) {
    const item = this.state.arrayHolder.filter(item => item.BuyLottery_id !== BuyLottery_id)
    let lotteryArray = [];
    if (item != null) {
      let i = 0;
      item.forEach((value) => {
        i++
        lotteryArray.push({
          'BuyLottery_id': i,
          'buyLottery': value.buyLottery,
          'amountBuy': value.amountBuy
        })
      })
      if (lotteryArray.length == 0) { this.setState({ isDataBuy: false }) }
      this.setState({ arrayHolder: lotteryArray })
    }
  }
  onPressProcessBuy() {
    const { amountBuy, listSelected, phone } = this.state
    const { minAmount, maxAmount, infoAccount } = this.props;

    if (listSelected.length == 1) {
      let listOne = listSelected[0].numBer || null
      let NumberBuy = listOne
      let list = [...this.state.arrayHolder, { 'BuyLottery_id': this.state.arrayHolder.length + 1, 'buyLottery': NumberBuy, 'amountBuy': amountBuy, 'phonNumber': phone ? phone : infoAccount.phoneNumber }]
      if (list.length == 1) {
        this.setState({
          arrayHolder: [...this.state.arrayHolder, {
            'BuyLottery_id': this.state.arrayHolder.length + 1, 'buyLottery': NumberBuy, 'amountBuy': amountBuy, 'phonNumber': phone ? phone : infoAccount.phoneNumber
          }]
        })
      } else {
        let newData = this.state.arrayHolder.map(value => {
          if (value.buyLottery === NumberBuy) {
            var strOldAmount = value.amountBuy.replace(",", "")
            var strNewAmount = amountBuy.replace(",", "")
            let sumTotal = parseInt(strOldAmount) + parseInt(strNewAmount)
            let lastAmount = sumTotal <= maxAmount ? sumTotal : maxAmount
            value.amountBuy = formatNumber(lastAmount + '')
            return value;
          }
          return value;
        });
        let itm = this.state.arrayHolder.filter(item => item.buyLottery === NumberBuy)
        if (itm.length > 0) {
          this.setState({ arrayHolder: newData })
        } else {
          this.setState({
            arrayHolder: [...this.state.arrayHolder, {
              'BuyLottery_id': this.state.arrayHolder.length + 1, 'buyLottery': NumberBuy, 'amountBuy': amountBuy, 'phonNumber': phone ? phone : infoAccount.phoneNumber
            }]
          })

        }
      }
      if (this.state.arrayHolder.length >= 0) {
        this.setState({ isDataBuy: true, listSelected: undefined, amountBuy: null })
      }
    }
    if (listSelected.length == 2) {
      let listOne = listSelected[0].numBer || null
      let listTwo = listSelected[1].numBer || null
      let NumberBuy = listOne + "," + listTwo
      let list = [...this.state.arrayHolder, { 'BuyLottery_id': this.state.arrayHolder.length + 1, 'buyLottery': NumberBuy, 'amountBuy': amountBuy, 'phonNumber': phone ? phone : infoAccount.phoneNumber }]
      if (list.length == 1) {
        this.setState({
          arrayHolder: [...this.state.arrayHolder, {
            'BuyLottery_id': this.state.arrayHolder.length + 1, 'buyLottery': NumberBuy, 'amountBuy': amountBuy, 'phonNumber': phone ? phone : infoAccount.phoneNumber
          }]
        })
      } else {
        let newData = this.state.arrayHolder.map(value => {
          if (value.buyLottery === NumberBuy) {
            var strOldAmount = value.amountBuy.replace(",", "")
            var strNewAmount = amountBuy.replace(",", "")
            let sumTotal = parseInt(strOldAmount) + parseInt(strNewAmount)
            let lastAmount = sumTotal <= maxAmount ? sumTotal : maxAmount
            value.amountBuy = formatNumber(lastAmount + '')
            return value;
          }
          return value;
        });
        let itm = this.state.arrayHolder.filter(item => item.buyLottery === NumberBuy)
        if (itm.length > 0) {
          this.setState({ arrayHolder: newData })
        } else {
          this.setState({
            arrayHolder: [...this.state.arrayHolder, {
              'BuyLottery_id': this.state.arrayHolder.length + 1, 'buyLottery': NumberBuy, 'amountBuy': amountBuy, 'phonNumber': phone ? phone : infoAccount.phoneNumber
            }]
          })

        }
      }
      if (this.state.arrayHolder.length >= 0) {
        this.setState({ isDataBuy: true, listSelected: undefined, amountBuy: null })
      }
    }
    if (listSelected.length == 3) {
      let listOne = listSelected[0].numBer || null
      let listTwo = listSelected[1].numBer || null
      let listTee = listSelected[2].numBer || null
      let NumberBuy = listOne + "," + listTwo + "," + listTee
      let list = [...this.state.arrayHolder, { 'BuyLottery_id': this.state.arrayHolder.length + 1, 'buyLottery': NumberBuy, 'amountBuy': amountBuy, 'phonNumber': phone ? phone : infoAccount.phoneNumber }]
      if (list.length == 1) {
        this.setState({
          arrayHolder: [...this.state.arrayHolder, {
            'BuyLottery_id': this.state.arrayHolder.length + 1, 'buyLottery': NumberBuy, 'amountBuy': amountBuy, 'phonNumber': phone ? phone : infoAccount.phoneNumber
          }]
        })
      } else {
        let newData = this.state.arrayHolder.map(value => {
          if (value.buyLottery === NumberBuy) {
            var strOldAmount = value.amountBuy.replace(",", "")
            var strNewAmount = amountBuy.replace(",", "")
            let sumTotal = parseInt(strOldAmount) + parseInt(strNewAmount)
            let lastAmount = sumTotal <= maxAmount ? sumTotal : maxAmount
            value.amountBuy = formatNumber(lastAmount + '')
            return value;
          }
          return value;
        });
        let itm = this.state.arrayHolder.filter(item => item.buyLottery === NumberBuy)
        if (itm.length > 0) {
          this.setState({ arrayHolder: newData })
        } else {
          this.setState({
            arrayHolder: [...this.state.arrayHolder, {
              'BuyLottery_id': this.state.arrayHolder.length + 1, 'buyLottery': NumberBuy, 'amountBuy': amountBuy, 'phonNumber': phone ? phone : infoAccount.phoneNumber
            }]
          })

        }
      }
      if (this.state.arrayHolder.length >= 0) {
        this.setState({ isDataBuy: true, listSelected: undefined, amountBuy: null })
      }
    }



  }
  _renderHeaderBuy() {
    return (
      <View style={styles.headerModel}>
        <View style={styles.itemHeader}>
          <Text style={{ color: Colors.txtNumber }}>{I18n.t('Type')}</Text>
        </View>
        <View style={styles.itemHeaderNumberText}>
          <Text style={{ color: Colors.txtNumber }}>{I18n.t('Number')}</Text>
        </View>
        <View style={styles.txtitemHeaderAmount}>
          <Text style={{ color: Colors.txtNumber }}>{I18n.t('Amount')}</Text>
        </View>
        <View style={styles.itemHeader}>
          <Text style={styles.txtEdit}>{I18n.t('edit')}</Text>
        </View>
      </View>
    )
  }
  _renderItemBuy(item, id) {

    return (
      <View style={styles.headerModel}>
        <View style={styles.itemHeader}>
          <Text style={styles.txtItem}>{item.BuyLottery_id}</Text>
        </View>
        <View style={styles.itemHeaderNumber}>
          <View style={styles.icon}>
            <Image source={Images.iocnAnimalBall} style={styles.iconDitits} />
          </View>
          <View style={styles.boxNumber}>
            <Text style={styles.txtItemColor}>{item.buyLottery}</Text>
          </View>
        </View>
        <View style={styles.txtitemHeaderAmount}>
          <Text style={styles.txtItem}>{item.amountBuy}</Text>
        </View>
        <TouchableOpacity onPress={() => this.onPressDeleteBuy(item.BuyLottery_id)} style={styles.itemHeader}>
          <Text>
            <Ionicons size={25} name='ios-trash-outline' color={Colors.iconColor} />
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  _renderFooterBuy = () => {
    let totalAmount = 0;
    let totalFooter = 0;
    this.state.arrayHolder.forEach((item) => {
      var strAmount = item.amountBuy
      var newAmount = strAmount.replace(",", "");
      totalAmount += parseInt(newAmount)
    });
    totalFooter = totalAmount > 0 ? totalAmount : 0
    return (
      <TouchableOpacity style={styles.containerItem}>
        <Text style={styles.txtItem}>{I18n.t('total')}</Text>
        <Text style={styles.txtItem}></Text>
        <Text style={styles.txtItem}>{(this.state.arrayHolder.length != '') ? formatNumber(totalAmount + '') : 0}</Text>
        <Text style={styles.txtItem}></Text>
      </TouchableOpacity>
    )
  }

  onPressBuyLottery() {
    const { showTxtInputPhone } = this.state
    this.setState({ setModalPhone: false })
    if (showTxtInputPhone === true) {
      this.props.onPressBuyLotteryAnimal(this.state.arrayHolder)
    } else {
      this.props.onPressBuyLotteryAnimal(this.state.arrayHolder)
    }
  }
  onRadio(value) {
    value.value === 1 ? this.setState({ showTxtInputPhone: true }) : value.value === 0 ? this.setState({ showTxtInputPhone: false }) : null
  }
  onPressToDetail(value) {
    this.setState({ setModalPhone: false })
  }
  onRadom = () => {
    var lstLottery = []
    var lstCount = ["1", "2", "3"];
    var countItem = lstCount[Math.floor(Math.random() * lstCount.length)];
    for (var i = 0; i < countItem; i++) {
      var item = Animal[Math.floor(Math.random() * Animal.length)];
      if (lstLottery.length == 0) {
        lstLottery.push(item)
      } else {
        let itm = lstLottery.filter(j => j.id === item.id)
        if (itm.length == 0) {
          lstLottery.push(item)
        }
      }
    }
    this.setState({
      listSelected: lstLottery
    })
  }
  onChangeNumberValue(text) {
    const { phone } = this.state
    text = text.replace(TRIM_SPACE, '');
    let errorPhone = !text || text.length < 1 ||
      !isValidated(text, this.props.validatePhoneConst) ? I18n.t(`${this.props.errorPhoneMessage}`) : ''
    this.setState({ phone: text, errorPhone })
  }
  onClearPhone() { this.setState({ phone: null }) }
  onClearAmountBuy() { this.setState({ amountBuy: null }) }

  getMoney(item) {
    this.setState({ amountBuy: item })
  }
  onCloesShow() {

  }
  render() {
    const { pagSell } = this.props
    const { amountBuy, errorAmountBuy, listSelected, isDataBuy, getTotal,
      errorPhone, phone, value, showTxtInputPhone } = this.state
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
          <View style={styles.header}>
            <Text style={styles.textConten}>{I18n.t('Animal')}</Text>
          </View>
          <View style={styles.main}>
            {showTxtInputPhone == true
              ?
              (<View style={styles.txtPhone}>
                <FullTextInput
                  label={I18n.t('phoneNumber')}
                  placeholder={I18n.t('inputThePhoneHere')}
                  returnKeyType='done'
                  keyboardType='number-pad'
                  value={phone}
                  maxLength={13}
                  error={errorPhone}
                  onChangeUserName={(text) => this.onChangeNumberValue(text)}
                  iconLeft='facebook'
                  iconRight='close'
                  textError={I18n.t('enterMoney')}
                  onclick={() => this.onClearPhone()}
                />
              </View>
              )
              : null}
            {listSelected != undefined ?
              <View style={styles.boxSelecttrue}>
                <FlatList
                  data={listSelected}
                  renderItem={({ item, index }) => this._renderItemAnimal(item, index)}
                  extraData={this.state}
                  keyExtractor={item => item.id}
                  horizontal={true}
                />
              </View>
              :
              <View style={styles.boxSelect}>
                <TouchableOpacity onPress={() => this.onShownumberLotterywinner()} style={styles.iconAnimalNumber}>
                  <Image source={Images.ic_Animal} style={styles.iconAnimalNumber} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onShownumberLotterywinner()} style={styles.iconAnimalNumber}>
                  <Image source={Images.ic_Animal} style={styles.iconAnimalNumber} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onShownumberLotterywinner()} style={styles.iconAnimalNumber}>
                  <Image source={Images.ic_Animal} style={styles.iconAnimalNumber} />
                </TouchableOpacity>
              </View>
            }
            <View style={{ top: 0, marginBottom: 20 }}>
              <FullTextInput
                label={I18n.t('money')}
                placeholder={I18n.t('enterAmount')}
                returnKeyType='done'
                keyboardType='number-pad'
                value={amountBuy}
                error={errorAmountBuy}
                maxLength={13}
                onChangeUserName={(text) => this.onChangeAmountBuy(text)}
                iconLeft='facebook'
                iconRight='close'
                textError={I18n.t('enterMoney')}
                onclick={() => this.onClearAmountBuy()}
              />
            </View>

            <FlatListMoney getMoney={(item) => this.getMoney(item)} Money={Money} />

            <View style={styles.button}>
              {showTxtInputPhone == true ?
                (<SmallButton
                  text={I18n.t('addList')}
                  onPress={() => this.onPressProcessBuy()}
                  isDisable={(!amountBuy || errorAmountBuy || !phone || errorPhone || !listSelected) ? true : this.state.arrayHolder.length > 9 ? true : false}
                />) :
                (<SmallButton
                  text={I18n.t('addList')}
                  onPress={() => this.onPressProcessBuy()}
                  isDisable={(!amountBuy || errorAmountBuy || !listSelected) ? true : this.state.arrayHolder.length > 9 ? true : false}
                />)}
              <TouchableOpacity style={styles.btnRandom} onPress={() => this.onRadom()}>
                <Text style={styles.txtRandom}>{I18n.t('Random')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {isDataBuy ? (
            <View>
              <View style={styles.headerAimal}>
                <Text style={{ color: Colors.txtNumber, fontSize: 15, left: 10 }}>{I18n.t('listLottery')}</Text>
              </View>
              <View style={styles.mainSelectAnimal}>
                <FlatList
                  data={this.state.arrayHolder}
                  renderItem={({ item, index }) => this._renderItemBuy(item, index)}
                  extraData={this.state}
                  keyExtractor={item => item.id}
                  ListHeaderComponent={() => this._renderHeaderBuy()}
                  ListFooterComponent={() => this._renderFooterBuy()}
                />
              </View>
            </View>
          ) : null}

        </ScrollView>
        {
          isDataBuy ? (
            <View style={{ justifyContent: 'center', padding: 20 }}>
              <FullNewButton
                text={I18n.t('txtNext')}
                onPress={() => this.onPressBuyLottery()}
                isDisable={(this.state.arrayHolder.length >= 1) ? false : true}
              />
            </View>
          ) : null
        }
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModalVisibleShow}
          onRequestClose={() => {
            this.setState({ setModalVisibleShow: false })
          }}
        >
          <View style={styles.centeredView}>
            <SafeAreaView>
              <View style={{ width: '100%', height: '100%' }}>

                <View style={{
                  width: '100%', height: 40, backgroundColor: Colors.white,
                  flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20
                }}>
                  <View style={{ width: '20%', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => this.onCloes()}>
                      <Text>
                        <Ionicons name='arrow-back' size={24} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: '60%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold', textTransform: "uppercase", }}>{I18n.t('ChooseAnimals')}</Text>
                  </View>
                  <View style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                    {/* <Text style={{ fontSize: 16, fontWeight: 'bold', color: Colors.txtUpLight, textTransform: "uppercase", }}>{I18n.t('HistoryLottery')}</Text> */}
                  </View>
                </View>

                <View style={{ padding: 10, width: '100%', marginBottom: 100 }}>
                  <FlatList
                    data={this.state.listAnimal}
                    renderItem={({ item, index }) => this.renderItemListNumber(item, index)}
                    keyExtractor={(item) => {
                      return item.id;
                    }}
                    extraData={this.state}
                    numColumns={5}
                  />


                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end', width: '100%', marginTop: -70 }}>
                  {this.state.buttonSelect ? (
                    <TouchableOpacity onPress={() => this.onSelect()} style={{ width: '100%', height: 50, backgroundColor: Colors.orange, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold', textTransform: "uppercase", }}>{I18n.t('success')}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => this.onSelect()} disabled style={{ width: '100%', height: 50, backgroundColor: Colors.grayDark, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={{ color: Colors.white, fontSize: 16, fontWeight: 'bold', textTransform: "uppercase", }}>{I18n.t('success')}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </SafeAreaView>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.setModalPhone}
          onRequestClose={() => {
            this.setState({ setModalPhone: false })
          }}
        >
          <View style={styles.centered}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{I18n.t('PleaseSelectPurchase')}</Text>
              <RadioForm
                radio_props={radio_props}
                initial={value}
                formHorizontal={true}
                labelHorizontal={true}
                animation={true}
                buttonWrapStyle={{ marginLeft: 10 }}
                labelStyle={{ fontSize: 15, color: Colors.backColor, paddingHorizontal: 20, }}
                onPress={(value) => { this.onRadio({ value }) }}
              />
              <View style={{ width: '100%', height: 50, marginBottom: 10, top: 10 }}>
                <FullNewButton
                  text={I18n.t('txtNext')}
                  onPress={() => this.onPressToDetail()}
                />
              </View>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    );
  }
}

export default LotteryAnimal;
LotteryAnimal.defaultProps = {
  validatePhoneConst: Constant.VALIDATE_LAOS,
  errorPhoneMessage: 'incorrectPhoneNumber3',
  errorMoneyMessage: 'incorrectMoneyCode',
  validateMoneyConst: Constant.VALIDATE_MONEY,
  validateTransNote: Constant.VALIDATE_NON_SPECIAL,
  errorTransNoteMessage: 'nameIsNotEmpty',
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  main: {
    height: null,
    marginHorizontal: 20,
    margin: 30,
  },
  boxSelect: {
    width: '100%',
    height: 108,
    justifyContent: 'space-between',
    borderRadius: 5,
    borderColor: Colors.steel,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 30,
    alignItems: 'center',
    marginBottom: 20
  },
  boxSelecttrue: {
    width: '100%',
    height: 108,
    justifyContent: 'space-between',
    borderRadius: 5,
    borderColor: Colors.orange,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    marginBottom: 20
  },
  iconAnimalNumber: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  button: {

    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  mainbuttonTab: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'center', alignItems: 'center'
  },
  header: {
    width: '100%',
    height: null,
    backgroundColor: Colors.bgLight,
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 10
  },

  item: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: Dimensions.get('window').width / 4,
    padding: 10
  },

  img_Style: {
    height: 77,
    width: 47,
    resizeMode: "contain",
    padding: 20,
    borderRadius: 10
  },

  boder: {

  },
  boderTrue: {
    borderColor: Colors.orange,
    borderRadius: 5,
    borderWidth: 1
  },
  iconAnimal: {
    justifyContent: 'center',
    flex: 1,
    padding: 10
  },
  iconAnimalNumberSelect: {

    width: 80,
    height: 80,
    resizeMode: "contain",
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  mainSelectAnimal: {
    // flex: 1,
    height: null,
    marginHorizontal: 20,

  },
  headerAimal: {
    backgroundColor: Colors.bgLight,
    width: '100%',
    height: null,
    // justifyContent: 'space-between',
    padding: 10,
    flexDirection: 'row'

  },
  containerItem: {
    flex: 1,
    padding: 5,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: Metrics.baseMargin,
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.white,
  },
  txtItem: {
    fontSize: Fonts.size.medium,
    margin: 7
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 19
  },
  logoNCC: {
    width: 50,
    height: 50,
  },
  textConten: {
    left: 10,
    color: '#9C9C9C'
  },
  headerModel: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.borderGrey,

  },
  txtRandom: {
    fontSize: 14,
    color: '#3275E0',
    fontWeight: 'bold'
  },
  btnRandom: {
    width: null,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: 'rgb(206, 234, 253)',
    padding: 10,
  },
  txtItemColor: {
    flex: 1,
    fontSize: Fonts.size.medium,
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    margin: 10,
    color: '#3275E0',
    borderRadius: 5,
    backgroundColor: Colors.numberColor
  },
  txtLabel: {
    color: Colors.orange
  },
  txtPhone: {
    marginBottom: 20
  },
  centered: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: "center",
    backgroundColor: 'rgba(224, 224, 224, 0.6)'
  },
  modalView: {
    width: '100%',
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: "center",
    height: '50%'
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 20
  },
  itemHeader: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEdit: {
    color: Colors.txtNumber
  },
  //-
  itemHeaderNumber: {
    width: '35%',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  itemHeaderNumberText: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  //-
  itemHeaderAmount: {
    width: '45%',
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    left: 10
  },
  boxNumber: {
    backgroundColor: 'rgb(206, 234, 253)',
    borderRadius: 5,
    left: 4,
    alignItems: 'flex-start',
    height: 40,
    justifyContent: 'center'
  },
  iconDitits: {
    width: 25,
    height: 25,
    alignItems: 'flex-start',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 40
  },
  txtitemHeaderAmount: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconDelete: {
    width: 25,
    height: 25
  }

})