export const removeS3Signature = (url: string) => {
  const urlWithoutSignature = url.split("?")[0];
  return urlWithoutSignature;
};
