const getAcf = (data) => data?.[0]?.acf;

const getSimple = (data) => ({
  description: getAcf(data)?.description,
  heading: getAcf(data)?.heading
});

export default { getSimple };
