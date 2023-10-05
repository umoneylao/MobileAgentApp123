export function replaceAll (str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace)
}


export function replaceAllForMultiRegex(str, finds, replace) {
  str = str.replace("(", "");
  str = str.replace(")", "");
  str = str.replace("\t", "");
  for (i = 0; i < finds.length; i++) {
    str = replaceAll(str, finds[i].toString(), replace)
    // AlertNative(str);
    // AlertNative(finds[i]);
  }
  return str
}


export function formatToDDMMYYYY (inputDate) {
  var date = new Date(inputDate)
  var month = date.getMonth() + 1 === 13 ? 12 : date.getMonth() + 1
  var d = date.getDate().toString()
  return date.getDate() + '/' + month + '/' + date.getFullYear()
}


export function formatNumber(text) {
  let number = replaceAll(text.trim(), ",", "")
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}