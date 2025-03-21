export type Source = {
  readonly acf: Acf;
};

export type Acf = {
  readonly navbar: Navbar;
  readonly comment: Comment;
  readonly package_tour: PackageTour;
  readonly banner: Banner;
  readonly mien_bac_content: MienBacContent;
  readonly title: Titles;
};

export type Navbar = {
  readonly tieu_de: string;
  readonly noi_dung_tieu_de: string;
  readonly anh_navbar: string;
  readonly tieu_de_2: string;
};

export type CommentItem = {
  readonly tieu_de: string;
  readonly noi_dung: string;
  readonly hinh_anh: string;
  readonly ten_user: string;
};
export type TourItem = {
  readonly loai_tour: string;
  readonly gia_tien: string;
  readonly dich_vu: string;
};
export type BannerItem = {
  readonly title1: string;
  readonly title2: string;
};
export type MienBacContentItem = {
  readonly dia_diem: string;
  readonly hinh_anh: string;
  readonly ghi_chu: string;
  readonly noi_dung: string;
};

export type Comment = {
  readonly comment1: CommentItem;
  readonly comment2: CommentItem;
  readonly comment3: CommentItem;
};
export type PackageTour = {
  readonly tour_tieu_chuan: TourItem;
  readonly tour_cao_cap: TourItem;
  readonly tour_tron_goi_vip: TourItem;
};
export type Banner = {
  readonly banner1: BannerItem;
  readonly banner2: BannerItem;
  readonly banner3: BannerItem;
};
export type MienBacContent = {
  readonly nhom_1: MienBacContentItem;
  readonly nhom_2: MienBacContentItem;
  readonly nhom_3: MienBacContentItem;
};
export type TitlesMienBac = {
  readonly title: string;
  readonly anh_title: string;
};
