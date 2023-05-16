export const api = `${process.env.REACT_APP_BACKEND}/api/`;
export const generatePublicUrl = (fileName) => {
  return `${process.env.REACT_APP_BACKEND}/public/${fileName}`;
};
