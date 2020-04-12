import React from 'react';
import axios from 'axios';
import {
  Button,
  Form,
  Input,
  notification,
} from 'antd';

const FormItem = Form.Item;

const FormStyle = {
  color: 'white',
  padding: '1em',
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const UpdateArtForm = (props) => {
  const { id, description, name } = props.art;
  const [form] = Form.useForm();
  
  const onFinish = async (values) => {
    console.log(values);
    const { description, name } = values;
    let art = {
      id,
      description: description ? description : 'A beautiful view of snowy peaks in the rocky mountains.',
      name: name ? name : 'Rocky Mountain Masterpiece',
    };

    const response = await axios.put('http://localhost:3100/art', art);
    const body = response.data;
    if (response.status !== 200) {
      notification.error({
        message: 'Error, your art could not be added to the manager.',
        description: body.message,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    } else {
      notification.success({
        message: 'Your art was updated in the manager!',
        description: body.message,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    }
  };

  return (
    <Form
      form={form}
      name="update-art"
      {...layout}
      style={FormStyle}
      onFinish={onFinish}
      labelAlign="left"
    >
      <FormItem name="id" label="Art ID">
        <Input disabled={true} defaultValue={id} />
      </FormItem>
      <FormItem name="name" label="Name">
        <Input defaultValue={name} />
      </FormItem>
      <FormItem name="description" label="Description">
        <Input defaultValue={description} />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">Update</Button>
      </FormItem>
    </Form>
  );
}

export default UpdateArtForm;