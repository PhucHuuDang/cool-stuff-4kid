import React, { useReducer } from 'react';
import { Modal, Form, Input, Row, Col, InputNumber, message } from 'antd';
import { User, DollarSign, List, SquarePlus } from 'lucide-react';
import axios from 'axios';
import { UploadImageProduct } from './upload-image-product';
import { State, AddModalProps, ProductManagement, ProductManagementAction } from '@/interface';

const initialState: State = {
  isConfirmLoading: false,
  formValues: {
    productName: '',
    price: 0,
    discountPercent: 0,
    productDescription: '',
    quantity: 0,
    image: '',
  },
};

const reducer = (state: State, action: ProductManagementAction): State => {
  switch (action.type) {
    case 'SET_CONFIRM_LOADING':
      return { ...state, isConfirmLoading: action.payload };
    case 'SET_FORM_VALUES':
      return { ...state, formValues: { ...state.formValues, ...action.payload } };
    default:
      return state;
  }
};

const AddProductModal: React.FC<AddModalProps> = ({ setIsOpen, isOpen, onProductAdd }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  const handleFileChange = (newFileChange: string) => {
    dispatch({ type: 'SET_FORM_VALUES', payload: { image: newFileChange } });
    form.setFieldsValue({ image: newFileChange });
  };

  const handleFormChange = (changedValues: Partial<State['formValues']>) => {
    dispatch({ type: 'SET_FORM_VALUES', payload: changedValues });
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      dispatch({ type: 'SET_CONFIRM_LOADING', payload: true });

      const response = await axios.post<ProductManagement>('https://milkapplicationapi.azurewebsites.net/api/Product/CreateProducts', {
        ...values,
        categoryId: 1,
        originId: 1,
        locationId: 1,
      });

      await onProductAdd(response.data);
      message.success('Product created successfully');
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        message.error(`Failed to create product: ${error.response.data.message || error.message}`);
      } else if (error instanceof Error) {
        message.error(`Failed to create product: ${error.message}`);
      } else {
        message.error('Failed to create product');
      }
    } finally {
      dispatch({ type: 'SET_CONFIRM_LOADING', payload: false });
    }
  };

  return (
    <Modal
      title={<p className="text-lg text-red-600">Add new product</p>}
      open={isOpen}
      confirmLoading={state.isConfirmLoading}
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        initialValues={state.formValues}
        onValuesChange={handleFormChange}
        layout="vertical"
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="productName"
              rules={[
                { required: true, message: 'Please input product name' },
                { min: 5, message: 'Product name must be at least 5 characters' },
              ]}
              label="Product Name"
            >
              <Input prefix={<User className="site-form-item-icon mr-1" />} placeholder="Product Name" autoFocus />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="productDescription"
              rules={[{ required: true, message: 'Please input product description' }]}
              label="Product Description"
            >
              <Input prefix={<List className="site-form-item-icon mr-1" />} placeholder="Product Description" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="quantity"
              rules={[{ required: true, message: 'Please input quantity' }]}
              label="Quantity"
            >
              <InputNumber className="w-full" prefix={<SquarePlus className="site-form-item-icon mr-1" />} placeholder="Quantity" min={0} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="price"
              rules={[{ required: true, message: 'Please input price' }]}
              label="Price"
            >
              <InputNumber className="w-full" prefix={<DollarSign className="site-form-item-icon mr-1" />} placeholder="Price" min={0} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="discountPercent"
              rules={[{ required: true, message: 'Please input discount Percent' }]}
              label="Discount Percent"
            >
              <InputNumber className="w-full" prefix={<List className="site-form-item-icon mr-1" />} placeholder="ex: 10" min={0} max={100} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="image"
              rules={[{ required: true, message: 'Please select image' }]}
              label="Image"
            >
              <UploadImageProduct onFileChange={handleFileChange} initialImage={state.formValues.image} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export { AddProductModal };