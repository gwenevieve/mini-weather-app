const convertToFarenheit = (temperature: number): number => {
  return Math.round((temperature * 9) / 5 + 32);
};

export { convertToFarenheit };
