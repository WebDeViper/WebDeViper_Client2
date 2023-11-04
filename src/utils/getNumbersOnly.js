export default function getNumbersOnly(inputValue) {
  const numbersOnly = inputValue.replace(/[^0-9]/g, '');
  return numbersOnly;
}
