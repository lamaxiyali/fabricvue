/**
 * Created by jiachenpan on 17/3/8.
 */
export default function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}
export default function addDate () {
  let nowDate = new Date()
  let date = {
    year: nowDate.getFullYear(),
    month: nowDate.getMonth() + 1,
    date: nowDate.getDate()
  }
  this.systemTime = date.year + '-' + date.month + '-' + date.date
}
