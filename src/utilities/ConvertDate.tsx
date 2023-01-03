const convertToDay = (date: number): string => {
    const convertedDate = new Date(date * 1000);
    const allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = allDays[convertedDate.getDay()];
    return dayName;
};

export { convertToDay };
