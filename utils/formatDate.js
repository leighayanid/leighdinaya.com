export const formatDate = (date) => {
  if (!date) {
    return ''
  }

  const options = { year: 'numeric', day: 'numeric', month: 'long' }
  return new Date(date).toLocaleDateString('en', options)
}
