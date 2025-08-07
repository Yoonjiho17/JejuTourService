function getBaseTime() {
  const h = new Date().getHours();
  const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];
  const closest = baseTimes.reduce((prev, curr) =>
    Math.abs(curr - h) < Math.abs(prev - h) ? curr : prev
  );
  return String(closest).padStart(2, "0") + "00";
}

export default getBaseTime;
