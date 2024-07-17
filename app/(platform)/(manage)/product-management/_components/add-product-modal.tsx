import React, { useReducer, useState, useEffect } from "react";
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
  Tabs,
  Button,
  Select,
} from "antd";
import {
  List,
  SquarePlus,
  Percent,
  PackageSearch,
  Folder,
  MapPin,
  Globe,
} from "lucide-react";
import axios from "axios";
import { UploadImageProduct } from "./upload-image-product";
import {
  State,
  AddModalProps,
  AddProduct,
  ProductManagementAction,
  Category,
  Location,
  Origin,
} from "@/interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDongSign } from "@fortawesome/free-solid-svg-icons";

const { Title } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const initialState: State = {
  isConfirmLoading: false,
  formValues: {
    productName: "",
    price: 0,
    discountPercent: 0,
    productDescription: "",
    quantity: 1,
    image: "",
    categoryId: undefined,
    originId: undefined,
    locationId: undefined,
    imagesCarousel: [],
  },
  categoryName: "",
  locationName: "",
  locationAddress: "",
  originName: "",
  categories: [],
  origins: [],
  locations: [],
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
    case "SET_CATEGORY_NAME":
      return { ...state, categoryName: action.payload };
    case "SET_LOCATION_NAME":
      return { ...state, locationName: action.payload };
    case "SET_LOCATION_ADDRESS":
      return { ...state, locationAddress: action.payload };
    case "SET_ORIGIN_NAME":
      return { ...state, originName: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_ORIGINS":
      return { ...state, origins: action.payload };
    case "SET_LOCATIONS":
      return { ...state, locations: action.payload };
    case "SET_IMAGES_CAROUSEL":
      return {
        ...state,
        formValues: { ...state.formValues, imagesCarousel: action.payload },
      };
    default:
      return state;
  }
};

const AddProductModal: React.FC<AddModalProps & { activeTab: string }> = ({
  setIsOpen,
  isOpen,
  onProductAdd,
  onCategoryAdd = () => Promise.resolve(),
  onLocationAdd = () => Promise.resolve(),
  onOriginAdd = () => Promise.resolve(),
  activeTab,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form] = Form.useForm();
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [discountWarning, setDiscountWarning] = useState("");

  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  useEffect(() => {
    fetchCategories();
    fetchOrigins();
    fetchLocations();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        "https://milkapplicationapi.azurewebsites.net/api/Category/GetAllCategorys",
      );
      dispatch({ type: "SET_CATEGORIES", payload: response.data });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      message.error("Failed to load categories");
    }
  };

  const fetchOrigins = async () => {
    try {
      const response = await axios.get<Origin[]>(
        "https://milkapplicationapi.azurewebsites.net/api/Origin/GetAllOrigins",
      );
      dispatch({ type: "SET_ORIGINS", payload: response.data });
    } catch (error) {
      console.error("Failed to fetch origins:", error);
      message.error("Failed to load origins");
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get<Location[]>(
        "https://milkapplicationapi.azurewebsites.net/api/Location/GetAllLocation",
      );
      dispatch({ type: "SET_LOCATIONS", payload: response.data });
    } catch (error) {
      console.error("Failed to fetch locations:", error);
      message.error("Failed to load locations");
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
    dispatch({ type: "SET_CATEGORY_NAME", payload: "" });
    dispatch({ type: "SET_LOCATION_NAME", payload: "" });
    dispatch({ type: "SET_LOCATION_ADDRESS", payload: "" });
    dispatch({ type: "SET_ORIGIN_NAME", payload: "" });
    setDiscountWarning("");
  };

  const handleFileChange = (newFileChange: string | string[]) => {
    if (Array.isArray(newFileChange)) {
      dispatch({
        type: "SET_FORM_VALUES",
        payload: { imagesCarousel: newFileChange },
      });
      form.setFieldsValue({ imagesCarousel: newFileChange });
    } else {
      dispatch({ type: "SET_FORM_VALUES", payload: { image: newFileChange } });
      form.setFieldsValue({ image: newFileChange });
    }
  };

  const handleImagesCarouselChange = (newImages: string[]) => {
    dispatch({ type: "SET_IMAGES_CAROUSEL", payload: newImages });
    form.setFieldsValue({ imagesCarousel: newImages });
  };

  const handleFormChange = (changedValues: Partial<State["formValues"]>) => {
    dispatch({ type: "SET_FORM_VALUES", payload: changedValues });
  };

  const handleAddProduct = async () => {
    try {
      const values = await form.validateFields();

      if (values.discountPercent >= 50 && values.discountPercent <= 80) {
        Modal.confirm({
          title: "Confirm High Discount",
          content: `You want to add product with ${values.discountPercent}% discount?`,
          onOk: () => submitProduct(values),
          onCancel: () => {},
        });
      } else {
        await submitProduct(values);
      }
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
    }
  };

  const submitProduct = async (values: any) => {
    dispatch({ type: "SET_CONFIRM_LOADING", payload: true });

    const imagesCarousel = Array.isArray(values.imagesCarousel)
      ? values.imagesCarousel
      : values.imagesCarousel
        ? [values.imagesCarousel]
        : [];

    const productData = {
      productId: 0,
      productName: values.productName,
      price: values.price,
      discountPrice: values.price * (1 - (values.discountPercent || 0) / 100),
      discountPercent: values.discountPercent || 0,
      productDescription: values.productDescription,
      image: values.image,
      imagesCarousel: imagesCarousel,
      quantity: values.quantity,
      status: 1,
      categoryId: values.categoryId,
      originId: values.originId,
      locationId: values.locationId,
      id: "34f40b90-f47e-446d-b2b7-18bb0c8465c6",
    };

    try {
      const response = await axios.post<AddProduct>(
        "https://milkapplicationapi.azurewebsites.net/api/Product/CreateProducts",
        productData,
      );

      await onProductAdd(response.data);
      message.success("Product created successfully");
      setIsOpen(false);
      form.resetFields();
      setDiscountWarning("");
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: "SET_CONFIRM_LOADING", payload: false });
    }
  };

  const handleAddCategory = async () => {
    try {
      const values = await form.validateFields(["categoryName"]);
      dispatch({ type: "SET_CONFIRM_LOADING", payload: true });
      const response = await axios.post<Category>(
        "https://milkapplicationapi.azurewebsites.net/api/Category/CreateCategorys",
        {
          categoryId: 0,
          categoryName: values.categoryName,
        },
      );
      await onCategoryAdd(response.data);
      message.success("Category created successfully");
      form.resetFields(["categoryName"]);
      fetchCategories();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        message.error(
          `Failed to create category: ${error.response.data.message || error.message}`,
        );
      } else if (error instanceof Error) {
        message.error(`Failed to create category: ${error.message}`);
      } else {
        message.error("Failed to create category");
      }
    } finally {
      dispatch({ type: "SET_CONFIRM_LOADING", payload: false });
    }
  };

  const handleAddLocation = async () => {
    try {
      const values = await form.validateFields([
        "locationName",
        "locationAddress",
      ]);
      dispatch({ type: "SET_CONFIRM_LOADING", payload: true });
      const response = await axios.post<Location>(
        "https://milkapplicationapi.azurewebsites.net/api/Location/CreateLocation",
        {
          locationId: 0,
          locationName: values.locationName,
          address: values.locationAddress,
        },
      );
      await onLocationAdd(response.data);
      message.success("Location created successfully");
      form.resetFields(["locationName", "locationAddress"]);
      fetchLocations();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        message.error(
          `Failed to create location: ${error.response.data.message || error.message}`,
        );
      } else if (error instanceof Error) {
        message.error(`Failed to create location: ${error.message}`);
      } else {
        message.error("Failed to create location");
      }
    } finally {
      dispatch({ type: "SET_CONFIRM_LOADING", payload: false });
    }
  };

  const handleAddOrigin = async () => {
    try {
      const values = await form.validateFields(["originName"]);
      dispatch({ type: "SET_CONFIRM_LOADING", payload: true });
      const response = await axios.post<Origin>(
        "https://milkapplicationapi.azurewebsites.net/api/Origin/CreateOrigins",
        {
          originId: 0,
          originName: values.originName,
        },
      );
      await onOriginAdd(response.data);
      message.success("Origin created successfully");
      form.resetFields(["originName"]);
      fetchOrigins();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        message.error(
          `Failed to create origin: ${error.response.data.message || error.message}`,
        );
      } else if (error instanceof Error) {
        message.error(`Failed to create origin: ${error.message}`);
      } else {
        message.error("Failed to create origin");
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
      onCancel={handleCancel}
      footer={null}
      width={700}
      className="add-product-modal"
    >
      <Divider />
      <Tabs activeKey={currentTab} onChange={setCurrentTab}>
        <TabPane tab="Add Product" key="1">
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
                      message: "Product Name must be at least 5 characters",
                    },
                    {
                      max: 100,
                      message: "Product Name cannot exceed 100 characters",
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
                  rules={[
                    { required: true, message: "Please input quantity" },
                    {
                      type: "number",
                      min: 1,
                      message: "Quantity must be greater than 0",
                    },
                  ]}
                  label="Quantity"
                >
                  <InputNumber
                    className="w-full"
                    prefix={
                      <SquarePlus className="site-form-item-icon mr-2 text-green-500" />
                    }
                    placeholder="Enter quantity"
                    min={1}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="price"
                  rules={[
                    { required: true, message: "Please input price" },
                    {
                      validator: async (_, value) => {
                        if (value === 0) {
                          return Promise.reject("Price can't be 0");
                        }
                        if (value < 1) {
                          return Promise.reject("Price must be at least 1");
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
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
                    placeholder="Enter price"
                    min={0}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="discountPercent"
                  label="Discount Percent"
                  rules={[
                    {
                      validator: async (_, value) => {
                        if (value > 80) {
                          alert("Discount percent cannot exceed 80%");
                          return Promise.reject(
                            "Discount percent cannot exceed 80%",
                          );
                        }
                        if (value >= 50) {
                          setDiscountWarning(
                            "Warning: Discount is 50% or higher!",
                          );
                        } else {
                          setDiscountWarning("");
                        }
                        return Promise.resolve();
                      },
                    },
                  ]}
                >
                  <InputNumber
                    className="w-full"
                    prefix={
                      <Percent className="site-form-item-icon mr-2 text-orange-500" />
                    }
                    placeholder="Enter discount %"
                    min={0}
                    max={80}
                  />
                </Form.Item>
                {discountWarning && (
                  <div style={{ color: "orange" }}>{discountWarning}</div>
                )}
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  name="categoryId"
                  rules={[
                    { required: true, message: "Please select a category" },
                  ]}
                  label="Category"
                >
                  <Select placeholder="Select a category">
                    {state.categories.map((category) => (
                      <Option
                        key={category.categoryId}
                        value={category.categoryId}
                      >
                        {category.categoryName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="originId"
                  rules={[
                    { required: true, message: "Please select an origin" },
                  ]}
                  label="Origin"
                >
                  <Select placeholder="Select an origin">
                    {state.origins.map((origin) => (
                      <Option key={origin.originId} value={origin.originId}>
                        {origin.originName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  name="locationId"
                  rules={[
                    { required: true, message: "Please select a location" },
                  ]}
                  label="Location"
                >
                  <Select placeholder="Select a location">
                    {state.locations.map((location) => (
                      <Option
                        key={location.locationId}
                        value={location.locationId}
                      >
                        {location.locationName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              name="productDescription"
              rules={[
                { required: true, message: "Please input product description" },
                {
                  min: 15,
                  message: "Product description must be at least 15 characters",
                },
                {
                  max: 400,
                  message: "Product description cannot exceed 400 characters",
                },
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
              rules={[
                {
                  required: true,
                  message: "Please select an image for the product",
                },
              ]}
              label="Product Image"
            >
              <UploadImageProduct
                onFileChange={handleFileChange}
                initialImage={state.formValues.image}
              />
            </Form.Item>
            <Form.Item
              name="imagesCarousel"
              label="Product Images Carousel"
              rules={[
                {
                  validator: async (_, value) => {
                    if (!value || value.length < 3) {
                      return Promise.reject(
                        "Please upload at least 3 images for the carousel",
                      );
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <UploadImageProduct
                onFileChange={(urls) => {
                  if (Array.isArray(urls)) {
                    handleImagesCarouselChange(urls);
                  }
                }}
                initialImages={state.formValues.imagesCarousel}
                multiple={true}
                maxCount={5}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={handleAddProduct}
                loading={state.isConfirmLoading}
              >
                Add Product
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Add Category" key="2">
          <Form
            form={form}
            layout="vertical"
            className="p-4"
            onFinish={handleAddCategory}
          >
            <Form.Item
              name="categoryName"
              label="Category Name"
              rules={[
                { required: true, message: "Please input category name" },
                {
                  min: 2,
                  message: "Category name must be at least 2 characters",
                },
                {
                  max: 100,
                  message: "Category name cannot exceed 100 characters",
                },
              ]}
            >
              <Input
                prefix={
                  <Folder className="site-form-item-icon mr-2 text-blue-500" />
                }
                placeholder="Enter category name"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={state.isConfirmLoading}
                onClick={handleAddCategory}
              >
                Add Category
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Add Location" key="3">
          <Form
            form={form}
            layout="vertical"
            className="p-4"
            onFinish={handleAddLocation}
          >
            <Form.Item
              name="locationName"
              label="Location Name"
              rules={[
                { required: true, message: "Please input location name" },
                {
                  min: 2,
                  message: "Location name must be at least 2 characters",
                },
                {
                  max: 100,
                  message: "Location name cannot exceed 100 characters",
                },
              ]}
            >
              <Input
                prefix={
                  <MapPin className="site-form-item-icon mr-2 text-blue-500" />
                }
                placeholder="Enter location name"
              />
            </Form.Item>
            <Form.Item
              name="locationAddress"
              label="Address"
              rules={[
                { required: true, message: "Please input address" },
                { min: 5, message: "Address must be at least 5 characters" },
                { max: 100, message: "Origin name cannot exceed 100 characters" },
              ]}
            >
              <Input
                prefix={
                  <MapPin className="site-form-item-icon mr-2 text-green-500" />
                }
                placeholder="Enter address"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={state.isConfirmLoading}
                onClick={handleAddLocation}
              >
                Add Location
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
        <TabPane tab="Add Origin" key="4">
          <Form
            form={form}
            layout="vertical"
            className="p-4"
            onFinish={handleAddOrigin}
          >
            <Form.Item
              name="originName"
              label="Origin Name"
              rules={[
                { required: true, message: "Please input origin name" },
                {
                  min: 2,
                  message: "Origin name must be at least 2 characters",
                },
                { max: 100, message: "Origin name cannot exceed 100 characters" }
              ]}
            >
              <Input
                prefix={
                  <Globe className="site-form-item-icon mr-2 text-blue-500" />
                }
                placeholder="Enter origin name"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={state.isConfirmLoading}
                onClick={handleAddOrigin}
              >
                Add Origin
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export { AddProductModal };
