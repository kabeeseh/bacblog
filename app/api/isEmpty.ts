export function isEmpty(arr: Array<string>) {
  for (let i = 0;i<arr.length;i++) {
    if (arr[i] == "") {
      return true
    }
  }
  return false
}
