export const formatDate = (date) => {
  if (!date) {
    return ''
  }

  const options = { year: 'numeric', month: 'long' }
  return new Date(date).toLocaleDateString('en', options)
}
