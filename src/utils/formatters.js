export function formatCardNumber(value) {
  const raw = value.replace(/\D/g, '').substring(0, 16)
  return raw.replace(/(.{4})(?=.)/g, '$1  ')
}

export function formatExpiry(value) {
  let raw = value.replace(/\D/g, '').substring(0, 4)
  return raw.length > 2 ? raw.substring(0, 2) + ' / ' + raw.substring(2) : raw
}

export function formatFee(durationKey) {
  const map = { '30': 498, '60': 996, '90': 1494 }
  const fee = map[durationKey] || 996
  return 'R\u00A0' + fee.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
}
