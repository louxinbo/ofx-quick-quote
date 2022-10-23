export function numberWithCommas(num: string | undefined) {
  return num ? num.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '';
}
