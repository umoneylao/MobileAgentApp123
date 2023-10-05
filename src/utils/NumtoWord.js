function hto (ff) {
  var sNum3 = ''
  var p1 = ''
  var p2 = ''
  var p3 = ''

  var hy = ''
  var n1 = new Array('', 'one', 'two', 'three', 'four', 'five', 'six',
    'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve',
    'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen',
    'eighteen', 'nineteen')

  var n2 = new Array('', '', 'twenty', 'thirty', 'forty',
    'fifty', 'sixty', 'seventy', 'eighty', 'ninety')

  sNum3 = ff
  var j = sNum3.length
  var h3 = sNum3.substring((j - 3), (j - 3) + 1)
  if (h3 > 0) {
    p3 = n1[h3] + ' hundred '
  } else { p3 = '' }

  var t2 = parseInt(sNum3.substring((j - 2), (j - 2) + 1), 10)
  var u1 = parseInt(sNum3.substring((j - 1), (j - 1) + 1), 10)
  var tu21 = parseInt(sNum3.substring((j - 2), (j - 2) + 2), 10)

  if (tu21 === 0) {
    p1 = ''
    p2 = ''
  } else if ((t2 < 1) && (u1 > 0)) {
    p2 = ''
    p1 = n1[u1]
  } else if (tu21 < 20) {
    p2 = ''
    p1 = n1[tu21]
  } else if ((t2 > 1) && (u1 === 0)) {
    p2 = n2[t2]
    p1 = ''
  } else {
    p2 = n2[t2] + '-'
    p1 = n1[u1]
  }

  ff = p3 + p2 + p1

  return ff
}

function stripBad (string) {
  for (var i = 0, output = '', valid = '0123456789.'; i < string.length; i++) {
    if (valid.indexOf(string.charAt(i)) !== -1) {
      output += string.charAt(i)
    }
  }
  return output
}

export function GetNumber2d (sNumber, sNumbec) {
  var gf = ''
  var gg = ''
  var gh = ''
  var gi = ''
  var gj = ''
  var gc = 'zero'
  var dd = ''
  var cc = ''

  sNumber = stripBad(sNumber)
  sNumber = parseInt(sNumber, 10)
  var sNum2 = String(sNumber)

  sNumbec = stripBad(sNumbec)
  sNumbec = parseInt(sNumbec, 10)
  var sNumc = String(sNumbec)

  if (sNumber === 1) { dd = ' dollar ' } else { dd = ' dollars ' }
  if (sNumbec === 1) { cc = ' cent' } else { cc = ' cents' }

  if (sNumbec < 1) { gc = 'zero' }
  if (sNumc === '') { gc = 'zero' }
  if (sNumc > 0) { gc = hto(sNumc) }

  var j = sNum2.length
  var hNum2 = sNum2.substring((j - 3), ((j - 3) + 3))

  if (hNum2 > 0) {
    gf = hto(hNum2) + ''
  }

  var tNum2 = sNum2.substring((j - 6), (j - 6) + 3)
  if (tNum2 > 0) {
    gg = hto(tNum2) + ' thousand '
  }

  var mNum2 = sNum2.substring((j - 9), (j - 9) + 3)
  if (mNum2 > 0) {
    gh = hto(mNum2) + ' million '
  }

  var bNum2 = sNum2.substring((j - 12), (j - 12) + 3)
  if (bNum2 > 0) {
    gi = hto(bNum2) + ' billion '
  }

  var trNum2 = sNum2.substring((j - 15), (j - 15) + 3)
  if (trNum2 > 0) {
    gj = hto(trNum2) + ' trillion '
  }

  if (sNumber < 1) {
    gf = 'zero'
  }

  if (j > 15) {
    gj = ' Your number is too big for me to spell'
    gi = ''
    gh = ''
    gg = ''
    gf = ''
  }
  var dds = gj + gi + gh + gg + gf
  if (dds === '') { dds = 'zero' }

  return ' ' + dds + dd + ' and ' + gc + ' ' + cc
}
