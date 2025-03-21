export type source = {
  readonly acf: acf;
};

export type acf = {
  readonly navbar: Navbar;
  readonly comment: Comment;
  readonly package_tour: PackageTour;
  readonly banner: Banner;
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
export type TourItem = {
  readonly loai_tour: string;
  readonly gia_tien: string;
  readonly dich_vu: string;
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
  readonly banner1: TourItem;
  readonly banner2: TourItem;
  readonly banner3: TourItem;
};
