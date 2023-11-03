// —————————Menu Pruduct———————

import { Images } from '../themes'

export const groupMenuShopUnitel = [
    {
        id: '1',
        name: 'ShopUnitel',
        img: Images.ic_UnitelShop,
        navigate: 'ShopUnitel'
    },
    {
        id: '3',
        name: 'UnitelSalesman',
        img: Images.ic_UnitelSaler,
        navigate: 'UnitelSalesman'
    },
    {
        id: '2',
        name: 'UnitelCommission',
        img: Images.ic_UnitelServices,
        navigate: 'UnitelCommission'
    },
];


export const menuTranfer = [
    {
        id: '1',
        name: 'transferMoney',
        img: Images.ic_Deposit,
        navigate: 'TransferAgentToAgent'
    },
    {
        id: '4',
        name: 'transferToCustomerNoEwall',
        img: Images.ic_Deposit,
        navigate: 'TransferContainer'
    },
    {
        id: '2',
        name: 'transferToBank',
        img: Images.ic_tranferToBank,
        navigate: 'TranferToBank'
    },
];

export const menuTranferRole7 = [
    {
        id: '3',
        name: 'TransferAgentToAgent',
        img: Images.ic_RequestCash,
        navigate: 'TransferAgentToAgent'
    },
    {
        id: '2',
        name: 'transferToBank',
        img: Images.ic_tranferToBank,
        navigate: 'TranferToBank'
    },
];

export const menuCashIn = [
    {
        id: '1',
        name: 'transferToCustomerto',
        img: Images.ic_Requestumoney,
        navigate: 'CashInStackContainer'
    },
    {
        id: '2',
        name: 'PosCashin',
        img: Images.ic_Requestumoney,
        navigate: 'PosCashin'
    },
];

export const menuCashInRole33 = [
    {
        id: '1',
        name: 'transferToCustomerto',
        img: Images.ic_Requestumoney,
        navigate: 'CashInStackContainer'
    },
];

export const menuCashInRole7 = [
    {
        id: '1',
        name: 'transferToCustomerto',
        img: Images.ic_Requestumoney,
        navigate: 'CashInStackContainer'
    }
];

export const menuCashOutRole7 = [
    {
        id: '1',
        name: 'cashOutForPos',
        img: Images.ic_RequestCash,
        navigate: 'AgentCashOutContainer'
    }
];

export const menuCashOut = [
    {
        id: '1',
        name: 'cashOutForPos',
        img: Images.ic_RequestCash,
        navigate: 'AgentCashOutContainer'
    },
    //Chua test
    {
        id: '2',
        name: 'cashOutForCustomerNoEwallet',
        img: Images.ic_RequestCash,
        navigate: 'CashOutStackContainer'
    },

];

export const menuCustomerService = [
    {
        id: '1',
        name: 'TopUp',
        img: Images.ic_topup,
        navigate: 'TopUpContainer'
    },
    // {
    //     id: '2',
    //     name: 'PSTN',
    //     img: Images.ic_buydata,
    //     navigate: 'PstnContainer'
    // },
    {
        id: '3',
        name: 'internetPayment',
        img: Images.ic_internet_new,
        navigate: 'InternetContainer'
    },
    {
        id: '4',
        name: 'leasing',
        img: Images.ic_Leasing,
        navigate: 'LeasingContainer'
    },
    {
        id: '5',
        name: 'WaterBill',
        img: Images.icWaterBill,
        navigate: 'NampapaScreen'
    },
    // {
    //     id: '22',
    //     name: 'ElectricBill',
    //     img: Images.ic_ElectricityBill,
    //     navigate: 'Comingsoon' // ElectricBillContainer
    // },

    // {
    //     id: '6',
    //     name: 'GameUmoney',
    //     img: Images.icGame,
    //     navigate: 'GameScreen' // ElectricBillContainer
    // },

    // {
    //     id: '8',
    //     name: 'LVIInsurance',
    //     img: Images.ic_LVIInsurance,
    //     navigate: 'Comingsoon' // LVIInsuranceContainer
    // },
    // {
    //     id: '9',
    //     name: 'BuyLottery',
    //     img: Images.icBuyLottery,
    //     navigate: 'BuyLottery'
    // },
    {
        id: '10',
        name: 'APAInsurance',
        img: Images.iconAPA,
        navigate: 'APAInsurance'
    },
    // {
    //     id: '11',
    //     name: 'BuyLottery',
    //     img: Images.icBuyLottery,
    //     navigate: 'webviewScreen'
    // },

];

export const menuPOSService = [
    // {
    //     id: '1',
    //     name: 'uploadPrize',
    //     img: Images.ic_Deposit,
    //     navigate: 'SokxayService'
    // },
    {
        id: '2',
        name: 'AgentRegisterForUser',
        img: Images.ic_Register,
        navigate: 'PreRegister'//AgentRegForUserContainer
    },
    {
        id: '3',
        name: 'AgentRequestEMoney',
        img: Images.ic_RequestCash,
        navigate: 'AgentRequestEMoneyContainer'//
    },
    {
        id: '4',
        name: 'AgentRequestCash',
        img: Images.ic_Requestumoney,
        navigate: 'RequestCashContainer'//
    },
    {
        id: '5',
        name: 'approvalTransaction',
        img: Images.ic_Requestumoney,
        navigate: 'ApprovalTransection'//
    },
    {
        id: '6',
        name: 'MenuWorldBank',
        img: Images.ic_worldBank,
        navigate: 'MenuWorldBank'//
    },
    {
        id: '18',
        name: 'Debtsettlement',
        img: Images.ic_Requestumoney,
        navigate: 'Debtsettlement'
    },
    // {
    //     id: '7',
    //     name: 'Testapp',
    //     img: Images.ic_Requestumoney,
    //     navigate: 'Testapp'//  ViewCertificate
    // },
];

export const menuPOSServiceRole7 = [
    // {
    //     id: '1',
    //     name: 'uploadPrize',
    //     img: Images.ic_Deposit,
    //     navigate: 'SokxayService'
    // },
    // {
    //     id: '2',
    //     name: 'CheckCommission',
    //     img: Images.ic_Deposit,
    //     navigate: 'CheckCommission'
    // },
    {
        id: '3',
        name: 'AgentRequestEMoney',
        img: Images.ic_RequestCash,
        navigate: 'AgentRequestEMoneyContainer'
    },
    {
        id: '4',
        name: 'AgentRequestCash',
        img: Images.ic_Requestumoney,
        navigate: 'RequestCashContainer'
    },
    {
        id: '5',
        name: 'approvalTransaction',
        img: Images.ic_Requestumoney,
        navigate: 'ApprovalTransection'//
    },
    {
        id: '6',
        name: 'MenuWorldBank',
        img: Images.ic_worldBank,
        navigate: 'MenuWorldBank'//
    },
    // {
    //     id: '7',
    //     name: 'Testapp',
    //     img: Images.ic_Requestumoney,
    //     navigate: 'Testapp'//  ViewCertificate
    // },

];

// menuScratch Role 1
export const menuScratch = [
    {
        id: '1',
        name: 'transferMoney',
        img: Images.ic_Deposit,
        navigate: 'TransferAgentToAgent'
    },
    {
        id: '2',
        name: 'transferToCustomerNoEwall',
        img: Images.ic_Deposit,
        navigate: 'TransferContainer'
    },
    {
        id: '3',
        name: 'transferToBank',
        img: Images.ic_tranferToBank,
        navigate: 'TranferToBank'
    },
    {
        id: '4',
        name: 'transferToCustomerto',
        img: Images.ic_Requestumoney,
        navigate: 'CashInStackContainer'
    },
    {
        id: '5',
        name: 'PosCashin',
        img: Images.ic_Requestumoney,
        navigate: 'PosCashin'
    },
    {
        id: '6',
        name: 'TopUp',
        img: Images.ic_topup,
        navigate: 'TopUpContainer'
    },
    {
        id: '7',
        name: 'PSTN',
        img: Images.ic_buydata,
        navigate: 'PstnContainer'
    },
    {
        id: '8',
        name: 'internetPayment',
        img: Images.ic_internet_new,
        navigate: 'InternetContainer'
    },
    {
        id: '9',
        name: 'leasing',
        img: Images.ic_Leasing,
        navigate: 'LeasingContainer'
    },
    {
        id: '10',
        name: 'WaterBill',
        img: Images.icWaterBill,
        navigate: 'NampapaScreen'
    },
    // {
    //     id: '11',
    //     name: 'ElectricBill',
    //     img: Images.ic_ElectricityBill,
    //     navigate: 'Comingsoon' // ElectricBillContainer
    // },
    // {
    //     id: '12',
    //     name: 'GameUmoney',
    //     img: Images.icGame,
    //     navigate: 'GameScreen' // ElectricBillContainer
    // },
    // {
    //     id: '13',
    //     name: 'LVIInsurance',
    //     img: Images.ic_LVIInsurance,
    //     navigate: 'Comingsoon' // LVIInsuranceContainer
    // },
    // {
    //     id: '14',
    //     name: 'BuyLottery',
    //     img: Images.icBuyLottery,
    //     navigate: 'BuyLottery'
    // },
    // {
    //     id: '15',
    //     name: 'uploadPrize',
    //     img: Images.ic_Deposit,
    //     navigate: 'SokxayService'
    // },
    {
        id: '16',
        name: 'AgentRegisterForUser',
        img: Images.ic_Register,
        navigate: 'PreRegister'//AgentRegForUserContainer
    },
    {
        id: '17',
        name: 'AgentRequestEMoney',
        img: Images.ic_RequestCash,
        navigate: 'AgentRequestEMoneyContainer'//
    },
    {
        id: '18',
        name: 'AgentRequestCash',
        img: Images.ic_Requestumoney,
        navigate: 'RequestCashContainer'//
    },
    {
        id: '19',
        name: 'approvalTransaction',
        img: Images.ic_Requestumoney,
        navigate: 'ApprovalTransection'//
    },
    {
        id: '20',
        name: 'MenuWorldBank',
        img: Images.ic_worldBank,
        navigate: 'MenuWorldBank'//
    },
    // {
    //     id: '21',
    //     name: 'Testapp',
    //     img: Images.ic_Requestumoney,
    //     navigate: 'Testapp'//
    // },
    {
        id: '21',
        name: 'Debtsettlement',
        img: Images.ic_Requestumoney,
        navigate: 'Debtsettlement'
    },
    {
        id: '22',
        name: 'APAInsurance',
        img: Images.iconAPA,
        navigate: 'APAInsurance'
    }
    ,
    // {
    //     id: '23',
    //     name: 'Ekyc',
    //     img: Images.ic_topup,
    //     navigate: 'TopUpContainer'
    // }
];

export const menuScratchRole33 = [
    {
        id: '1',
        name: 'transferMoney',
        img: Images.ic_Deposit,
        navigate: 'TransferAgentToAgent'
    },
    {
        id: '2',
        name: 'transferToCustomerNoEwall',
        img: Images.ic_Deposit,
        navigate: 'TransferContainer'
    },
    {
        id: '3',
        name: 'transferToBank',
        img: Images.ic_tranferToBank,
        navigate: 'TranferToBank'
    },
    {
        id: '4',
        name: 'transferToCustomerto',
        img: Images.ic_Requestumoney,
        navigate: 'CashInStackContainer'
    },
    {
        id: '6',
        name: 'TopUp',
        img: Images.ic_topup,
        navigate: 'TopUpContainer'
    },
    {
        id: '7',
        name: 'PSTN',
        img: Images.ic_buydata,
        navigate: 'PstnContainer'
    },
    {
        id: '8',
        name: 'internetPayment',
        img: Images.ic_internet_new,
        navigate: 'InternetContainer'
    },
    {
        id: '9',
        name: 'leasing',
        img: Images.ic_Leasing,
        navigate: 'LeasingContainer'
    },
    {
        id: '10',
        name: 'WaterBill',
        img: Images.icWaterBill,
        navigate: 'NampapaScreen'
    },
    // {
    //     id: '11',
    //     name: 'ElectricBill',
    //     img: Images.ic_ElectricityBill,
    //     navigate: 'Comingsoon' // ElectricBillContainer
    // },
    // {
    //     id: '12',
    //     name: 'GameUmoney',
    //     img: Images.icGame,
    //     navigate: 'GameScreen' // ElectricBillContainer
    // },
    // {
    //     id: '13',
    //     name: 'LVIInsurance',
    //     img: Images.ic_LVIInsurance,
    //     navigate: 'Comingsoon' // LVIInsuranceContainer
    // },
    // {
    //     id: '14',
    //     name: 'BuyLottery',
    //     img: Images.icBuyLottery,
    //     navigate: 'BuyLottery'
    // },
    // {
    //     id: '15',
    //     name: 'uploadPrize',
    //     img: Images.ic_Deposit,
    //     navigate: 'SokxayService'
    // },
    {
        id: '16',
        name: 'AgentRegisterForUser',
        img: Images.ic_Register,
        navigate: 'PreRegister'//AgentRegForUserContainer
    },
    {
        id: '17',
        name: 'AgentRequestEMoney',
        img: Images.ic_RequestCash,
        navigate: 'AgentRequestEMoneyContainer'//
    },
    {
        id: '18',
        name: 'AgentRequestCash',
        img: Images.ic_Requestumoney,
        navigate: 'RequestCashContainer'//
    },
    {
        id: '19',
        name: 'approvalTransaction',
        img: Images.ic_Requestumoney,
        navigate: 'ApprovalTransection'//
    },
    {
        id: '20',
        name: 'MenuWorldBank',
        img: Images.ic_worldBank,
        navigate: 'MenuWorldBank'//
    },
    // {
    //     id: '21',
    //     name: 'Testapp',
    //     img: Images.ic_Requestumoney,
    //     navigate: 'Testapp'//
    // },
    {
        id: '22',
        name: 'Debtsettlement',
        img: Images.ic_Requestumoney,
        navigate: 'Debtsettlement'
    },
    {
        id: '23',
        name: 'APAInsurance',
        img: Images.iconAPA,
        navigate: 'APAInsurance'
    }
];

export const menuScratchRole7 = [
    {
        id: '1',
        name: 'TransferAgentToAgent',
        img: Images.ic_RequestCash,
        navigate: 'TransferAgentToAgent'
    },
    {
        id: '2',
        name: 'transferToBank',
        img: Images.ic_tranferToBank,
        navigate: 'TranferToBank'
    },
    {
        id: '3',
        name: 'TopUp',
        img: Images.ic_topup,
        navigate: 'TopUpContainer'
    },
    {
        id: '4',
        name: 'PSTN',
        img: Images.ic_buydata,
        navigate: 'PstnContainer'
    },
    {
        id: '5',
        name: 'internetPayment',
        img: Images.ic_internet_new,
        navigate: 'InternetContainer'
    },
    {
        id: '6',
        name: 'leasing',
        img: Images.ic_Leasing,
        navigate: 'LeasingContainer'
    },
    {
        id: '7',
        name: 'WaterBill',
        img: Images.icWaterBill,
        navigate: 'NampapaScreen'
    },
    // {
    //     id: '8',
    //     name: 'ElectricBill',
    //     img: Images.ic_ElectricityBill,
    //     navigate: 'Comingsoon' // ElectricBillContainer
    // },
    // {
    //     id: '9',
    //     name: 'GameUmoney',
    //     img: Images.icGame,
    //     navigate: 'GameScreen' // ElectricBillContainer
    // },
    {
        id: '10',
        name: 'LVIInsurance',
        img: Images.ic_LVIInsurance,
        navigate: 'HomeScreen' // LVIInsuranceContainer
    },
    // {
    //     id: '11',
    //     name: 'BuyLottery',
    //     img: Images.icBuyLottery,
    //     navigate: 'BuyLottery'
    // },
    // {
    //     id: '12',
    //     name: 'uploadPrize',
    //     img: Images.ic_Deposit,
    //     navigate: 'SokxayService'
    // },
    {
        id: '14',
        name: 'AgentRequestEMoney',
        img: Images.ic_RequestCash,
        navigate: 'AgentRequestEMoneyContainer'//
    },
    {
        id: '15',
        name: 'AgentRequestCash',
        img: Images.ic_Requestumoney,
        navigate: 'RequestCashContainer'//
    },
    {
        id: '16',
        name: 'approvalTransaction',
        img: Images.ic_Requestumoney,
        navigate: 'ApprovalTransection'//
    },
    {
        id: '17',
        name: 'MenuWorldBank',
        img: Images.ic_worldBank,
        navigate: 'MenuWorldBank'//
    },
    {
        id: '18',
        name: 'Debtsettlement',
        img: Images.ic_Requestumoney,
        navigate: 'Debtsettlement'
    },
    {
        id: '19',
        name: 'APAInsurance',
        img: Images.iconAPA,
        navigate: 'APAInsurance'
    }
];


// role 1 show pos chash in 

//menuHeader
export const menuHeader = [
    {
        id: '1',
        name: 'transfer',
        img: Images.ic_Transfer,
        navigate: 'MenuTransfer'
    },
    {
        id: '2',
        name: 'transferToCustomer',
        img: Images.icTranfer,
        navigate: 'MenuCashIn'
    },
    {
        id: '3',
        name: 'agentCashOut',
        img: Images.ic_CashOutNew,
        navigate: 'MenuCashOut'
    },
    {
        id: '4',
        name: 'qrTransference',
        img: Images.ic_QRScan,
        navigate: 'QrScanScreen'
    }
];

//menu setting
export const menuSetting = [

    {
        id: '2',
        name: 'setting',
        img: Images.mdi_settings,
        navigate: 'Setting'
    },

    // {
    //     id: '3',
    //     name: 'UpgradeAccount', // InviteNewUserNotes
    //     img: Images.ic_historyTranfer,
    //     navigate: 'Comingsoon'
    // },
    {
       
            id: '3',
            name: 'callCenter',
            img: Images.icon_call,
            navigate: 'CallCenter'
    },

    // {
    //     id: '4',
    //     name: 'LinkedBankAccount', // InviteNewUserNotes
    //     img: Images.ic_changePIN,
    //     navigate: 'Comingsoon'
    // },
    {
        id: '32',
        name: 'InviteNewUserNotes', // InviteNewUserNotes
        img: Images.mdi_face,
        navigate: 'InviteFriend'
    },
    // {
    //     id: '5',
    //     name: 'searchForListOfAgent',
    //     img: Images.ic_FindNearbyPOS,
    //     navigate: 'test' //FindAgent
    // },
    {
        id: '6',
        name: 'share', // share 
        img: Images.ic_TermCondition,
        navigate: 'ShareScreen'
    },
    {
        id: '7',
        name: 'AboutUmoney', // share
        img: Images.icAbout,
        navigate: 'Comingsoon'
    },
    {
        id: '8',
        name: 'signOut', // share
        img: Images.ic_Logout,
        navigate: 'Loguot'
    }
];

//leasing
export const menuLeasing = [
    {
        id: 'LEASING_WELCOM',
        title: 'Welcome',
        img: Images.ic_welcome
    },
    {
        id: 'LEASING_AEON',
        title: 'Aeon Credit',
        img: Images.ic_aecon
    },


];

export const menuLottery = [
    {
        id: '1',
        name: 'lottery',
        img: Images.ic_SokxayLottery,
        navigate: 'LotteryContainer'
    },
    {
        id: '2',
        name: 'NCCLottery',
        img: Images.icNCCLottery,
        navigate: 'LotteryNCC'
    },


];



