import React, { useState } from 'react';
import { Button, Form, Input, InputNumber } from 'antd';
import "./contact.css";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const ContactForm = () => {
  const [formData, setFormData] = useState(null);

  const onFinish = (values) => {
    setFormData(values);
    console.log(values);
  };

  return (
    <div className="containerr">
      <div className="form-container">
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <h1>Form Contact Info User</h1>
          <div className="input-container">
            <Form.Item
              name={['user', 'name']}
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Fullname" />
            </Form.Item>
            <Form.Item
              name={['user', 'email']}
              label="Email"
              rules={[
                {
                  type: 'email',
                  required: true,
                },
              ]}
              colon={false}
            >
              <Input placeholder="@gmail.com" />
            </Form.Item>
            <Form.Item
              name={['user', 'age']}
              label="Age"
              rules={[
                {
                  type: 'number',
                  min: 0,
                  max: 99,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name={['user', 'website']}
              label="Website"
              rules={[
                {
                  required: true,
                },
              ]}
              colon={false}
            >
              <Input placeholder="https://mywebsite.com" />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="Introduction">
              <Input.TextArea />
            </Form.Item>
          </div>
          <div className="button-container">
            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
              }}
            >
              <Button className="submit-button" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="data-container">
        {formData && (
          <div>
            <h1>Submitted Data:</h1>
            <div className="data-item">
              <label>Name:</label>
              <p>{formData.user.name}</p>
            </div>
            <div className="data-item">
              <label>Email:</label>
              <p>{formData.user.email}</p>
            </div>
            <div className="data-item">
              <label>Age:</label>
              <p>{formData.user.age}</p>
            </div>
            <div className="data-item">
              <label>Website:</label>
              <p>{formData.user.website}</p>
            </div>
            <div className="data-item">
              <label>Introduction:</label>
              <p>{formData.user.introduction}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactForm;