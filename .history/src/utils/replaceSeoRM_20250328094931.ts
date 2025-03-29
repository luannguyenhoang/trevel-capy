export const replaceSeoRM = (input: string) => {
  // Định nghĩa các URL cần thay thế
  const localUrl = "http://localhost:3000";
  const targetUrl = "http://du-lich-viet-nam.local";
  
  const localUrlWithSpace = ` ${localUrl}`;
  const targetUrlWithSpace = `${targetUrl}`;

  input = input.replace(new RegExp(localUrlWithSpace, 'g'), targetUrlWithSpace);
  input = input.replace(new RegExp(localUrl, 'g'), targetUrl);

  const mainEntityPattern = `"mainEntityOfPage":{"@id":"${targetUrl}`;
  if (input.includes(mainEntityPattern) && !input.includes(`${mainEntityPattern}/`)) {
    input = input.replace(mainEntityPattern, `"mainEntityOfPage":{"@id":"${targetUrl}/`);
  }

  return input;
};
