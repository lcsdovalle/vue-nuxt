import dayjs from 'dayjs'

export default (context, inject) => {
  console.log("RUnning dayjs")
  inject('dayjs', dayjs)
}
