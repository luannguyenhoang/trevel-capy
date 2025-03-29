export const replaceSeoRM = (input: string) => {
  // Định nghĩa các URL cần thay thế
  const localUrl = "http://localhost:3000";
  const targetUrl = "http://du-lich-viet-nam.local";
  
  // Xử lý các trường hợp có space ở đầu URL
  const localUrlWithSpace = ` ${localUrl}`;
  const targetUrlWithSpace = `${targetUrl}`;

  // Sử dụng regular expression để thay thế tất cả các trường hợp
  input = input.replace(new RegExp(localUrlWithSpace, 'g'), targetUrlWithSpace);
  input = input.replace(new RegExp(localUrl, 'g'), targetUrl);

  // Đảm bảo URL chính xác trong trường hợp mainEntityOfPage
  const mainEntityPattern = `"mainEntityOfPage":{"@id":"${targetUrl}`;
  if (input.includes(mainEntityPattern) && !input.includes(`${mainEntityPattern}/`)) {
    input = input.replace(mainEntityPattern, `"mainEntityOfPage":{"@id":"${targetUrl}/`);
  }

  return input;
};
