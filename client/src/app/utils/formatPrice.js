import wNumb from "wnumb";

export function formatPrice(str) {
  const Format = wNumb({
    thousand: " ",
    suffix: " ₽"
  });
  return Format.to(str);
}
