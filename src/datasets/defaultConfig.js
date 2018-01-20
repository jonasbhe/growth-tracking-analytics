const defaultColors = {
  SD0_1: '#BADA55',
  SD1_2: '#dede32',
  SD2_3: '#ff7070',
  SD3_4: '#777777',
};

const defaultLabels = {
  SD0_1: 'SD 0-1',
  SD1_2: 'SD 1-2',
  SD2_3: 'SD 2-3',
  SD3_4: 'SD 3+',
};

const descriptions = {
  SD0_1: '0-1 Standard deviation range',
  SD1_2: '1-2 Standard deviation range',
  SD2_3: '2-3 Standard deviation range',
  SD3_4: '3+ Standard deviation range',
};

const defaultAnimation = {
  threshold: 1,
  speed: 1,
  radius: 1,
};

const defaultConfig = {
  colors: defaultColors,
  labels: defaultLabels,
  scale: 1,
  display: 'pz',
  animation: defaultAnimation,
};

const validateConfig = config => {
  const { colors, labels, scale, display, animation } = config;

  if (
    Object.keys(config).length !== Object.keys(defaultConfig).length ||
    !colors ||
    !labels ||
    !scale ||
    !display ||
    !animation
  )
    return false;

  if (
    Object.values(colors).length !== 4 ||
    !colors.SD0_1 ||
    !colors.SD1_2 ||
    !colors.SD2_3 ||
    !colors.SD3_4
  )
    return false;
  if (!Object.values(colors).every(color => typeof color === 'string'))
    return false;

  if (
    Object.values(labels).length !== 4 ||
    !labels.SD0_1 ||
    !labels.SD1_2 ||
    !labels.SD2_3 ||
    !labels.SD3_4
  )
    return false;
  if (!Object.values(labels).every(label => typeof label === 'string'))
    return false;

  if (typeof scale !== 'number') return false;

  const validDisplay = { p: '-', z: '-', zp: '-', pz: '-' };
  if (!validDisplay[display]) return false;

  if (
    Object.values(animation).length !== 3 ||
    !animation.threshold ||
    !animation.speed ||
    !animation.radius
  )
    return false;
  if (!Object.values(animation).every(a => typeof a === 'number')) return false;

  return true;
};

export {
  defaultColors,
  defaultLabels,
  defaultAnimation,
  descriptions,
  defaultConfig,
  validateConfig,
};
