export function subtractDays(date: Date, numberOfDays: number) {
  const localDate = new Date(date.getTime())
  localDate.setDate(localDate.getDate() - numberOfDays)

  return localDate
}
