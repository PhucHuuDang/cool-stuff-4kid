import React, { useReducer } from 'react';
import { Modal, Form, Input, Row, Col, InputNumber, message } from 'antd';
import { User, Star, DollarSign, List, PlusCircle } from 'lucide-react';
import axios from 'axios';
import { UploadImageProduct } from './upload-image-product';

export interface AddModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}

interface State {
  isConfirmLoading: boolean;
  formValues: {
    name: string;
    typeOfProduct: string;
    rating: number;
    quantity: number;
    description: string;
    price: number;
    image: string;
  };
}

interface Action {
  type: 'SET_CONFIRM_LOADING' | 'SET_FORM_VALUES';
  payload?: any;
}

const initialState: State = {
  isConfirmLoading: false,
  formValues: {
    name: '',
    typeOfProduct: '',
    rating: 1,
    quantity: 1,
    description: '',
    price: 0,
    image: '',
  },
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_CONFIRM_LOADING':
      return { ...state, isConfirmLoading: action.payload };
    case 'SET_FORM_VALUES':
      return { ...state, formValues: { ...state.formValues, ...action.payload } };
    default:
      return state;
  }
};

const AddProductModal: React.FC<AddModalProps> = ({ setIsOpen, isOpen }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setIsOpen(false);
    form.resetFields();
  };

  const handleFileChange = (newFileChange: string) => {
    dispatch({ type: 'SET_FORM_VALUES', payload: { image: newFileChange } });
  };

  const handleFormChange = (changedValues: { [key: string]: any }) => {
    dispatch({ type: 'SET_FORM_VALUES', payload: changedValues });
  };

  const handleOk = async () => {
    dispatch({ type: 'SET_CONFIRM_LOADING', payload: true });

    try {
      await axios.post('https://milkapplicationapi.azurewebsites.net/api/Product/CreateProducts', {
        productName: state.formValues.name,
        price: state.formValues.price,
        productDescription: state.formValues.description,
        image: state.formValues.image,
        categoryId: 1,
        originId: 1,
      });

      message.success('Product created successfully');
      setIsOpen(false);
      form.resetFields();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        message.error(`Failed to create product: ${error.response.data.message || error.message}`);
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
      visible={isOpen}
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
              name="name"
              rules={[
                { required: true, message: 'Please input name' },
                { min: 5, message: 'Name must be at least 5 characters' },
              ]}
              label="Product Name"
            >
              <Input prefix={<User className="site-form-item-icon mr-1" />} placeholder="Name" autoFocus />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="typeOfProduct"
              rules={[{ required: true, message: 'Please input type of product' }]}
              label="Type Of Product"
            >
              <Input prefix={<PlusCircle className="site-form-item-icon mr-1 rotate-90" />} placeholder="Type Of Product" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="rating"
              rules={[
                { required: true, message: 'Please input rating' },
                { type: 'number', min: 1, max: 5, message: 'Rating must be between 1 and 5' },
              ]}
              label="Rating"
            >
              <InputNumber className="w-full" placeholder="Rating" min={1} max={5} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="quantity"
              rules={[
                { required: true, message: 'Please input quantity' },
                { type: 'number', min: 1, message: 'Quantity must be at least 1' },
              ]}
              label="Quantity"
            >
              <InputNumber className="w-full" placeholder="Quantity" min={1} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="description"
              rules={[{ required: true, message: 'Please input description' }]}
              label="Product Description"
            >
              <Input prefix={<List className="site-form-item-icon mr-1" />} placeholder="Description" />
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
