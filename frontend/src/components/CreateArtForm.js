import React from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
} from 'antd';

const FormItem = Form.Item;

const FormInput = {
  color: 'white',
}

const FormStyle = {
  color: 'white',
  padding: '1em',
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const CreateArtForm = (props) => {
  const [form] = Form.useForm();
  
  const onFinish = values => {
    console.log("Received values of form: ", values);
    // @TODO: Send API request and update Art List.
  };

  return (
    <Form
      form={form}
      name="create-art"
      {...layout}
      style={FormStyle}
      onFinish={onFinish}
    >
      <FormItem name="name" style={FormInput} label="Name">
        <Input />
      </FormItem>
      <FormItem name="date" style={FormInput} label="Date">
        <DatePicker />
      </FormItem>
      <FormItem name="artist" style={FormInput} label="Artist">
        <Input />
      </FormItem>
      <FormItem name="width" style={FormInput} label="Width">
        <Input />
      </FormItem>
      <FormItem name="height" style={FormInput} label="Height">
        <Input />
      </FormItem>
      <FormItem name="description" style={FormInput} label="Description">
        <Input />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">Submit</Button>
      </FormItem>
    </Form>
  );
}

export default CreateArtForm;