import { JwtPayload } from "jwt-decode";

export interface Product {
  productId: string;
  productName: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  productDescription: string;
  image: string;
  imagesCarousel: string[];
  quantity: number;
  status: number;
  categoryId: number;
  originId: number;
  locationId: number;
  quantityOrder?: number;
}

export interface ProductProps {
  id: number;
  title: string;
  originalPrice: number;
  discountPrice: number | null;
  description: string;
  image: string;
  discountPercent: number | null;
  quantity: number;
  productId: number;
  productName: string;
  price: number;
  productDescription: string;
  status: number;
  categoryId: number;
  originId: number;
  locationId: number;
  imagesCarousel?: string[];
}

export type ProductsInCategoryProps = {
  categoryId: number;
  categoryName: string;
  product: FilterProductProps[];
};

export type FilterProductProps = Pick<
  ProductApiProps,
  "productId" | "productName" | "image" | "status"
>;

export interface Category {
  categoryId: number;
  categoryName: string;
}

export interface Location {
  locationId: number;
  locationName: string;
  address: string;
}

export interface Origin {
  originId: number;
  originName: string;
}

export interface AddProduct {
  id: number;
  title: string;
  originalPrice: number;
  discountPrice: number;
  description: string;
  image: string;
  discountPercent: number;
  quantity?: number;
  imagesCarousel?: string[];
}

export interface Order {
  orderId: number;
  orderDate: string;
  totalPrice: number;
  id: string;
}

export interface State {
  isConfirmLoading: boolean;
  formValues: {
    productName: string;
    price: number;
    discountPercent: number;
    quantity: number;
    productDescription: string;
    image: string;
    categoryId?: number;
    originId?: number;
    locationId?: number;
    imagesCarousel?: string[];
  };
  categoryName: string;
  locationName: string;
  locationAddress: string;
  originName: string;
  categories: Category[];
  origins: Origin[];
  locations: Location[];
}

export interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductProps;
  onProductUpdate: (updatedProduct: ProductProps) => void;
}

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  onProductAdd: (newProduct: any) => void;
  onCategoryAdd: (category: Category) => Promise<void>;
  onLocationAdd?: (location: Location) => Promise<void>;
  onOriginAdd?: (origin: Origin) => Promise<void>;
}

export interface ProductDetailsModalProps {
  productId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface UploadImageProductProps {
  onFileChange: (fileChange: string) => void;
  initialImage?: string;
}

export interface ProductManagementState {
  products: ProductProps[];
  currentPage: number;
  dropdownVisible: number | null;
  isOpen: boolean;
  isSubmitting: boolean;
}

export type ProductManagementAction =
  | { type: "SET_PRODUCTS"; payload: ProductProps[] }
  | { type: "ADD_PRODUCT"; payload: ProductProps }
  | { type: "UPDATE_PRODUCT"; payload: ProductProps }
  | { type: "DELETE_PRODUCT"; payload: number }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "TOGGLE_DROPDOWN"; payload: number }
  | { type: "TOGGLE_MODAL" }
  | { type: "SET_SUBMITTING"; payload: boolean }
  | { type: "SET_CONFIRM_LOADING"; payload: boolean }
  | { type: "SET_FORM_VALUES"; payload: Partial<State["formValues"]> }
  | { type: "SET_CATEGORY_NAME"; payload: string }
  | { type: "SET_LOCATION_NAME"; payload: string }
  | { type: "SET_LOCATION_ADDRESS"; payload: string }
  | { type: "SET_ORIGIN_NAME"; payload: string }
  | { type: "SET_CATEGORIES"; payload: Category[] }
  | { type: "SET_ORIGINS"; payload: Origin[] }
  | { type: "SET_LOCATIONS"; payload: Location[] }
  | { type: "SET_IMAGES_CAROUSEL"; payload: string[] };

export type OrderManagementAction =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: Order[] }
  | { type: "FETCH_FAILURE"; payload: string }
  | { type: "DELETE_ORDER"; payload: string }
  | { type: "SET_ORDER_TO_DELETE"; payload: Order }
  | { type: "CLOSE_DELETE_MODAL" };

export interface ProductTableProps {
  currentProducts: ProductProps[];
  dropdownVisible: number | null;
  toggleDropdown: (productId: number) => void;
  handleProductDelete: (productId: number) => void;
  handleEditClick: (product: ProductProps) => void;
  handleViewDetails: (productId: number) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleClick: (pageNumber: number) => void;
}

export interface TableHeaderProps {
  text: string;
}

export interface TableCellProps {
  text: string;
}

export interface DropdownItemProps {
  text: string;
  onClick?: () => void;
}

export interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  text: string;
}

export type UserInformation = {
  name: string;
  mail: string;
  role: string;
  status: string;
  date: string;
  price: string;
};

export type ProductApiProps = Omit<Product, "imagesCarousel">;

export type ProductDetailProps = {
  productId: string;
  productName: string;
  price: number;
  discountPrice: number;
  discountPercent: number;
  productDescription: string;
  image: string;
  imagesCarousel: string[];
  quantity: number;
  status: number;
  categoryId: number;
  originId: number;
  locationId: number;
  quantityOrder?: number;
};

export type CardCarouselPropsPicked = Pick<
  ProductApiProps,
  | "productId"
  | "price"
  | "discountPercent"
  | "productName"
  | "image"
  | "discountPrice"
>;

export type InformationDecoded = JwtPayload & {
  name: string;
  email: string;
  nameid: string;
  role: string;
  exp: number;
  iat: number;
  iss: string;
};

export type UserInformationDetail = {
  id: string;
  fullName: string;
  userName: string;
  email: string;
  status: number;
  addresses: Address[];
};

export type Address = {
  addressId: string;
  addressName: string;
  street: string;
  phone: string;
  city: string;
  country: string;
  id: string;
};

export type UserInformationDetailProps = {
  data: UserInformationDetail;
};

export type Vouchers = {
  voucherId: number;
  code: string;
  discountPercent: number;
  quantity: number;
  dateFrom: Date;
  dateTo: Date;
  vouchersStatus: number;
};

