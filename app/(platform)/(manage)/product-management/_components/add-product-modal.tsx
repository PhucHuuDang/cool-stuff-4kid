import React, { useReducer } from "react";
import {
  Modal,
  Form,
  Input,
  Row,
  Col,
  InputNumber,
  message,
  Typography,
  Divider,
} from "antd";
import {
  DollarSign,
  List,
  SquarePlus,
  Percent,
  PackageSearch,
  Image as ImageIcon,
} from "lucide-react";
import axios from "axios";
import { UploadImageProduct } from "./upload-image-product";
import {
  State,
  AddModalProps,
  Product,
  ProductManagementAction,
} from "@/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDongSign } from "@fortawesome/free-solid-svg-icons";

const { Title } = Typography;
const initialState: State = {
  isConfirmLoading: false,
  formValues: {
    productName: "",
    price: 0,
    discountPercent: 0,
    productDescription: "",
    quantity: 0,
    image: "",
  },
};

const reducer = (state: State, action: ProductManagementAction): State => {
  switch (action.type) {
    case "SET_CONFIRM_LOADING":
      return { ...state, isConfirmLoading: action.payload };
    case "SET_FORM_VALUES":
      return {
        ...state,
        formValues: { ...state.formValues, ...action.payload },
      };
    default:
      return state;
  }
};

const AddProductModal: React.FC<AddModalProps> = ({
  setIsOpen,
  isOpen,
  onProductAdd,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  const handleFileChange = (newFileChange: string) => {
    dispatch({ type: "SET_FORM_VALUES", payload: { image: newFileChange } });
    form.setFieldsValue({ image: newFileChange });
  };

  const handleFormChange = (changedValues: Partial<State["formValues"]>) => {
    dispatch({ type: "SET_FORM_VALUES", payload: changedValues });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      dispatch({ type: "SET_CONFIRM_LOADING", payload: true });

      const response = await axios.post<Product>(
        "https://milkapplicationapi.azurewebsites.net/api/Product/CreateProducts",
        {
          ...values,
          categoryId: 1,
          originId: 1,
          locationId: 1,
        },
      );

      await onProductAdd(response.data);
      message.success("Product created successfully");
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        message.error(
          `Failed to create product: ${error.response.data.message || error.message}`,
        );
      } else if (error instanceof Error) {
        message.error(`Failed to create product: ${error.message}`);
      } else {
        message.error("Failed to create product");
      }
    } finally {
      dispatch({ type: "SET_CONFIRM_LOADING", payload: false });
    }
  };

  return (
    <Modal
      title={
        <Title level={3} className="mb-0 text-blue-600">
          Add New Product
        </Title>
      }
      open={isOpen}
      confirmLoading={state.isConfirmLoading}
      onCancel={handleCancel}
      onOk={handleOk}
      width={700}
      className="add-product-modal"
    >
      <Divider />
      <Form
        form={form}
        initialValues={state.formValues}
        onValuesChange={handleFormChange}
        layout="vertical"
        className="p-4"
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="productName"
              rules={[
                { required: true, message: "Please input product name" },
                {
                  min: 5,
                  message: "Product name must be at least 5 characters",
                },
              ]}
              label="Product Name"
            >
              <Input
                prefix={
                  <PackageSearch className="site-form-item-icon mr-2 text-blue-500" />
                }
                placeholder="Enter product name"
                autoFocus
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="quantity"
              rules={[{ required: true, message: "Please input quantity" }]}
              label="Quantity"
            >
              <InputNumber
                className="w-full"
                prefix={
                  <SquarePlus className="site-form-item-icon mr-2 text-green-500" />
                }
                placeholder="Enter quantity"
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item
              name="price"
              rules={[{ required: true, message: "Please input price" }]}
              label="Price"
            >
              <InputNumber
                className="w-full"
                prefix={
                  <FontAwesomeIcon
                    icon={faDongSign}
                    className="h-5 w-5 text-green-600"
                  />
                }
                placeholder="Nhập giá"
                min={0}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="discountPercent"
              rules={[
                { required: true, message: "Please input discount percent" },
              ]}
              label="Discount Percent"
            >
              <InputNumber
                className="w-full"
                prefix={
                  <Percent className="site-form-item-icon mr-2 text-orange-500" />
                }
                placeholder="Enter discount %"
                min={0}
                max={100}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="productDescription"
          rules={[
            { required: true, message: "Please input product description" },
          ]}
          label="Product Description"
        >
          <div className="flex items-start">
            <List
              className="mr-2 mt-2 flex-shrink-0 text-purple-500"
              size={18}
            />
            <Input.TextArea
              placeholder="Enter product description"
              rows={4}
              className="flex-grow"
            />
          </div>
        </Form.Item>
        <Form.Item
          name="image"
          rules={[{ required: true, message: "Please select image" }]}
          label="Product Image"
        >
          <UploadImageProduct
            onFileChange={handleFileChange}
            initialImage={state.formValues.image}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { AddProductModal };
