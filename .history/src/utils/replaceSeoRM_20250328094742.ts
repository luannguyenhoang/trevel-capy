export const replaceSeoRM = (input: string) => {
  // Đổi URL từ localhost sang domain chính thức
  const localUrl = "http://localhost:3000";
  const productionUrl = "https://dulichvietnam.com"; // Cập nhật URL này thành domain thực tế của bạn
  
  // Thay thế tất cả các URL localhost bằng URL production
  return input.replace(new RegExp(localUrl, 'g'), productionUrl);
};
