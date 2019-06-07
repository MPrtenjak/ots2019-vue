import moment from 'moment'

function CountDown(countDownInMinutes) {
  if (typeof CountDown.duration  == 'undefined') {
    CountDown.duration = countDownInMinutes || 15
  }
}

CountDown.prototype.reset = function () {
  let endTime = moment().add(CountDown.duration, 'minutes')
  localStorage.setItem('endTime', endTime.format('YYYY-MM-DD HH:mm:ss'))

  return endTime
}

CountDown.prototype.read = function () {
  let endTime = localStorage.getItem('endTime')
  if (endTime) return moment(endTime)

  return this.reset()
}

CountDown.prototype.calculate = function () {
  let endTime = this.read()
  let currentTime = moment()

  let dur
  let prefix
  if (currentTime < endTime) {
    dur = endTime - currentTime
    prefix = ''
  } else {
    dur = currentTime - endTime;
    prefix = '-'
  }

  let timeLeftInMin = (((prefix === '') ? 1 : -1) * dur) / (60 * 1000)
  let limeLeftInProc = (timeLeftInMin < 0) ? 0 : ((100 * timeLeftInMin) / CountDown.duration)
  return {
    limeLeftInProc,
    formatedTimeLeftInSec: prefix + moment(dur).format('mm:ss')
  }
}

export default CountDown