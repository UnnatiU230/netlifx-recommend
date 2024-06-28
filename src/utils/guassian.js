const { sqrt, exp, PI } = Math;

function gaussian(x, mean = 0, variance = 1) {
  const coefficient = 1 / sqrt(2 * PI * variance);
  const exponent = -((x - mean) ** 2) / (2 * variance);
  return coefficient * exp(exponent);
}

module.exports = gaussian;

