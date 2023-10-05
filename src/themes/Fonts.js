import {Platform} from 'react-native'

const type = {
  base: 'Avenir-Book',
  bold: 'Avenir-Black',
  emphasis: 'HelveticaNeue-Italic'
}

const size = {
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 22,
  h5: Platform.OS === 'ios' ? 20: 19,
  h6: 19,
  input: 18,
  regular: Platform.OS === 'ios' ? 18 : 17,
  fifSize: Platform.OS === 'ios' ? 16 : 15,
  medium: Platform.OS === 'ios' ? 14 : 13,
  small: Platform.OS === 'ios' ? 10 : 11,
  tiny: 10
}

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: 'bold',
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.emphasis,
    fontSize: size.h3
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.emphasis,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  }
}

export default {
  type,
  size,
  style
}
