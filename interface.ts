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
}

export interface Product {
  id: number;
  title: string;
  originalPrice: number;
  discountPrice: number;
  description: string;
  image: string;
  discountPercent: number;
  quantity?: number;
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
  };
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
  | { type: "SET_FORM_VALUES"; payload: Partial<State['formValues']> };

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
