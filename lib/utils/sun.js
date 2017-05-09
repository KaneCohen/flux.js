/**
 * Returns UTC formatted date.
 * @param  {Date}    date
 * @param  {integer} minutes
 * @return {Date}
 */
function formatDate(date, minutes) {
  let seconds = (minutes - Math.floor(minutes)) * 60;
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, minutes, seconds));
}

/**
 * Returns Julian century since J2000.0.
 * @param  {float} jd
 * @return {float}
 */
function calcTimeJulianCent(jd) {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Determines whether given year is a leap year.
 * @param  {integer}  yr
 * @return {boolean}
 */
function isLeapYear(yr) {
  return ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0);
}

/**
 * Returns day of year from JD2000.0.
 * @param  {float} jd
 * @return {float}
 */
function calcDoyFromJD(jd) {
  let z = Math.floor(jd + 0.5);
  let f = (jd + 0.5) - z;
  let A = z;
  
  if (z >= 2299161) {
    let alpha = Math.floor((z - 1867216.25) / 36524.25);
    A = z + 1 + alpha - Math.floor(alpha / 4);
  }
  
  let B = A + 1524;
  let C = Math.floor((B - 122.1) / 365.25);
  let D = Math.floor(365.25 * C);
  let E = Math.floor((B - D) / 30.6001);
  let day = B - D - Math.floor(30.6001 * E) + f;
  let month = (E < 14) ? E - 1 : E - 13;
  let year = (month > 2) ? C - 4716 : C - 4715;

  let k = (isLeapYear(year) ? 1 : 2);
  let doy = Math.floor((275 * month) / 9) - k * Math.floor((month + 9) / 12) + day - 30;
  return doy;
}

/**
 * Returns degrees based on given radians.
 * @param  {float} angleRad Angle in radians.
 * @return {float}
 */
function radToDeg(angleRad) {
  return (180.0 * angleRad / Math.PI);
}

/**
 * Returns radians based on given degrees.
 * @param  {float} angleDeg Andle in degrees.
 * @return {float}
 */
function degToRad(angleDeg) {
  return (Math.PI * angleDeg / 180.0);
}

/**
 * Returns the Geometric Mean Longitude of the Sun.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Geometric Mean Longitude of the Sun in degrees.
 */
function calcGeomMeanLongSun(t) {
  let L0 = 280.46646 + t * (36000.76983 + t * (0.0003032));
  
  while (L0 > 360.0) {
    L0 -= 360.0;
  }
  
  while (L0 < 0.0) {
    L0 += 360.0;
  }
  
  return L0;
}

/**
 * Returns Geometric Mean Anomaly of the Sun.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Geometric Mean Anomaly of the Sun in degrees.
 */
function calcGeomMeanAnomalySun(t) {
  return 357.52911 + t * (35999.05029 - 0.0001537 * t);
}

/**
 * Returns eccentricity of Earth's orbit.
 * @param  {float} t Numer of Julian centuries since J2000.0.
 * @return {float}
 */
function calcEccentricityEarthOrbit(t) {
  return 0.016708634 - t * (0.000042037 + 0.0000001267 * t);

}
/**
 * Returns equation of center for the Sun.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Center for the Sun in degrees.
 */
function calcSunEqOfCenter(t) {
  let m = calcGeomMeanAnomalySun(t);
  let mrad = degToRad(m);
  let sinm = Math.sin(mrad);
  let sin2m = Math.sin(mrad + mrad);
  let sin3m = Math.sin(mrad + mrad + mrad);
  return sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
}

/**
 * Returns true longitude of the Sun.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}  Longitude in degrees.
 */
function calcSunTrueLong(t) {
  let l0 = calcGeomMeanLongSun(t);
  let c = calcSunEqOfCenter(t);
  let O = l0 + c;
  return O;
}

/**
 * Returns apparent longitude of the Sun.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}  Longitude in degrees.
 */
function calcSunApparentLong(t) {
  let o = calcSunTrueLong(t);
  let omega = 125.04 - 1934.136 * t;
  let lambda = o - 0.00569 - 0.00478 * Math.sin(degToRad(omega));
  return lambda;
}

/**
 * Returns mean obliquity of the ecliptic.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Mean obliquity in defrees.
 */
function calcMeanObliquityOfEcliptic(t) {
  let seconds = 21.448 - t * (46.8150 + t * (0.00059 - t * (0.001813)));
  let e0 = 23.0 + (26.0 + (seconds / 60.0)) / 60.0;
  return e0;
}

/**
 * Returns corrected obliquity of the ecliptic.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Corrected obliquity in defrees.
 */
function calcObliquityCorrection(t) {
  let e0 = calcMeanObliquityOfEcliptic(t);
  let omega = 125.04 - 1934.136 * t;
  let e = e0 + 0.00256 * Math.cos(degToRad(omega));
  return e;
}

/**
 * Returns declination of the Sun.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Declination of the Sun in degrees.
 */
function calcSunDeclination(t) {
  let e = calcObliquityCorrection(t);
  let lambda = calcSunApparentLong(t);

  let sint = Math.sin(degToRad(e)) * Math.sin(degToRad(lambda));
  let theta = radToDeg(Math.asin(sint));
  return theta;
}

/**
 * Returns difference between true solar time and mean time.
 * @param  {float} t Number of Julian centuries since J2000.0.
 * @return {float}   Difference in minutes.
 */
function calcEquationOfTime(t) {
  let epsilon = calcObliquityCorrection(t);
  let l0 = calcGeomMeanLongSun(t);
  let e = calcEccentricityEarthOrbit(t);
  let m = calcGeomMeanAnomalySun(t);

  let y = Math.pow(Math.tan(degToRad(epsilon) / 2.0), 2);

  let sin2l0 = Math.sin(2.0 * degToRad(l0));
  let sinm = Math.sin(degToRad(m));
  let cos2l0 = Math.cos(2.0 * degToRad(l0));
  let sin4l0 = Math.sin(4.0 * degToRad(l0));
  let sin2m = Math.sin(2.0 * degToRad(m));

  let Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0 - 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;
  return radToDeg(Etime) * 4.0;
}

/**
 * Returns the hour angle of the Sun at sunrize for the latitude.
 * @param  {float} angle
 * @param  {float} lat      Latitude of the observer in degrees.
 * @param  {float} solarDec Declination angle of the Sun in degrees.
 * @return {float}
 */
function calcHourAngle(angle, lat, solarDec) {
  let latRad = degToRad(lat);
  let sdRad = degToRad(solarDec);
  let HAarg = (Math.cos(degToRad(90 + angle)) / (Math.cos(latRad) * Math.cos(sdRad)) - Math.tan(latRad) * Math.tan(sdRad));
  let HA = Math.acos(HAarg);
  return HA;
}

/**
 * Checks whether given input is a number.
 * @param  {string}  inputVal
 * @return {boolean}
 */
function isNumber(inputVal) {
  let oneDecimal = false;
  let inputStr = '' + inputVal;
  for (let i = 0; i < inputStr.length; i++) {
    let oneChar = inputStr.charAt(i);
    if (i === 0 && (oneChar === '-' || oneChar === '+')) {
      continue;
    }
    if (oneChar === '.' && !oneDecimal) {
      oneDecimal = true;
      continue;
    }
    if (oneChar < '0' || oneChar > '9') {
      return false;
    }
  }
  return true;
}

function getJD(date) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let A = Math.floor(year / 100);
  let B = 2 - A + Math.floor(A / 4);
  let JD = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
  return JD;
}

/**
 * Returns Date of the solar noon for a given day at the given location.
 * @param  {flaot} jd         Number of Julian centuries since J2000.0.
 * @param  {float} longitude
 * @param  {Date}  date
 * @return {Date}
 */
function calcSolNoon(jd, longitude, date) {
  let tnoon = calcTimeJulianCent(jd - longitude / 360.0);
  let eqTime = calcEquationOfTime(tnoon);
  let solNoonOffset = 720.0 - (longitude * 4) - eqTime; // In minutes.
  let newt = calcTimeJulianCent(jd + solNoonOffset / 1440.0);
  eqTime = calcEquationOfTime(newt);
  let solNoonLocal = 720 - (longitude * 4) - eqTime; // In minutes.
  
  while (solNoonLocal < 0.0) {
    solNoonLocal += 1440.0;
  }
  
  while (solNoonLocal >= 1440.0) {
    solNoonLocal -= 1440.0;
  }
  
  return formatDate(date, solNoonLocal);
}

/**
 * Returns Date based on a given julian date input.
 * @param  {float} jd
 * @return {Date}
 */
function dayString(jd) {
  if (jd < 900000 || jd > 2817000) {
    return 'error';
  } else {
    let z = Math.floor(jd + 0.5);
    let f = jd + 0.5 - z;
    let A;
    if (z < 2299161) {
      A = z;
    } else {
      let alpha = Math.floor((z - 1867216.25) / 36524.25);
      A = z + 1 + alpha - Math.floor(alpha / 4);
    }
    let B = A + 1524;
    let C = Math.floor((B - 122.1) / 365.25);
    let D = Math.floor(365.25 * C);
    let E = Math.floor((B - D) / 30.6001);
    let day = B - D - Math.floor(30.6001 * E) + f;
    let month = (E < 14) ? E - 1 : E - 13;
    let year = ((month > 2) ? C - 4716 : C - 4715);
    return new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  }
}

/**
 * Returs time in minutes of UTC for a sunrise or sunset at a given day and location.
 * @param  {integer} rise     1 - sunrise, 0 - sunset.
 * @param  {float}   angle
 * @param  {float}   JD
 * @param  {float}   latitude
 * @param  {float}   longitude
 * @return {float}
 */
function calcSunriseSetUTC(rise, angle, JD, latitude, longitude) {
  let t = calcTimeJulianCent(JD);
  let eqTime = calcEquationOfTime(t);
  let solarDec = calcSunDeclination(t);
  let hourAngle = calcHourAngle(angle, latitude, solarDec);
  if (! rise) hourAngle = -hourAngle;
  let delta = longitude + radToDeg(hourAngle);
  let timeUTC = 720 - (4.0 * delta) - eqTime;
  return timeUTC;
}

/**
 * Returs time in minutes  for a sunrise or sunset at a given day and location.
 * @param  {integer} rise     1 - sunrise, 0 - sunset.
 * @param  {float}   angle
 * @param  {float}   JD
 * @param  {float}   latitude
 * @param  {float}   longitude
 * @return {float}
 */
function calcSunriseSet(rise, angle, JD, date, latitude, longitude) {
  let timeUTC = calcSunriseSetUTC(rise, angle, JD, latitude, longitude);
  let newTimeUTC = calcSunriseSetUTC(rise, angle, JD + timeUTC / 1440.0, latitude, longitude);
  if (isNumber(newTimeUTC)) {
    return formatDate(date, newTimeUTC);
  } else {
    let doy = calcDoyFromJD(JD);
    // No sunrise/set found.

    if ((latitude > 66.4 && doy > 79 && doy < 267) ||
      (latitude < -66.4 && (doy < 83 || doy > 263))
    ) {
      // Previous sunrise/next sunset.
      let jdy = calcJDofNextPrevRiseSet(! rise, rise, angle, JD, latitude, longitude);
      return dayString(jdy);
    } else {
      // Previous sunset/next sunrise.
      let jdy = calcJDofNextPrevRiseSet(rise, rise, angle, JD, latitude, longitude);
      return dayString(jdy);
    }
  }
}

/**
 * Calculate julian day of the next or previous sunrise or sunset.
 * @param  {integer} next      Indicator of next or previous day.
 * @param  {integer} rise      indicator of sunrise or sunset we are interested in.
 * @param  {float}   angle
 * @param  {float}   JD
 * @param  {float}   latitude
 * @param  {float}   longitude
 * @return {float}
 */
function calcJDofNextPrevRiseSet(next, rise, angle, JD, latitude, longitude) {
  let julianday = JD;
  let increment = (next ? 1.0 : -1.0);

  let time = calcSunriseSetUTC(rise, angle, julianday, latitude, longitude);

  while (! isNumber(time)) {
    julianday += increment;
    time = calcSunriseSetUTC(rise, angle, julianday, latitude, longitude);
  }

  return julianday;
}

/**
 * Sun with helper functions helping us determine various details about Sun
 * position in the sky at a given time, date and location.
 * @type {class}
 */
class Sun {
  /**
   * Initializes class instance with a given date and location.
   * @param  {Date} date
   * @param  {float} latitude
   * @param  {float} longitude
   * @return {undefined}
   */
  constructor(date, latitude, longitude) {
    this.date = date;
    this.latitude = latitude;
    this.longitude = longitude;
    this.julianDate = getJD(date);
  }

  /**
   * Returns time where current Sun object will be at the highest point (noon).
   * @return {Date}
   */
  get solarNoon() {
    return calcSolNoon(this.julianDate, this.longitude, this.date);
  }

  /**
   * Returns time when current Sun object reaches given angle.
   * @param  {float}   angle
   * @param  {integer} rising
   * @return {Date}
   */
  timeAtAngle(angle, rising) {
    return calcSunriseSet(rising, angle, this.julianDate, this.date, this.latitude, this.longitude);
  }
}

export default Sun;
