import React from 'react';
import axios from 'axios';
import {
  Button,
  Form,
  Input,
  notification,
} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

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

  console.log(id);
  console.log(description);
  console.log(name);
  
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
      props.getArtList();
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
      initialValues={{
        id: id,
        name: name,
        description: description,
      }}
    >
      <FormItem name="id" label="Art ID">
        <Input value={id} disabled={true} />
      </FormItem>
      <FormItem name="name" label="Name">
        <Input defaultValue={name} />
      </FormItem>
      <FormItem name="description" type="textarea" label="Description">
        <TextArea defaultValue={description} rows={4} />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">Update</Button>
      </FormItem>
    </Form>
  );
}

export default UpdateArtForm;