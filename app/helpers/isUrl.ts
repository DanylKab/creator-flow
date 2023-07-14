export const isUrl = (text: string) => {
  const urlPattern = /^(http|https):\/\/[^ "]+$/;
  return urlPattern.test(text);
};
