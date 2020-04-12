import React from 'react';
import moment from 'moment';
import axios from 'axios';
import {
  Button,
  DatePicker,
  Form,
  Input,
  notification,
} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;

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
  
  const onFinish = async (values) => {
    const { artist, date, description, height, name, width } = values;
    let art = {
      artist: artist ? artist : 'Hughie Devore',
      date: date ? date.format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
      description: description ? description : 'A beautiful view of snowy peaks in the rocky mountains.',
      height: height ? height : 1000,
      name: name ? name : 'Rocky Mountain Masterpiece',
      width: width ? width : 1250,
    };

    const response = await axios.post('http://localhost:3100/art', art);
    const body = response.data;
    if (response.status !== 201) {
      notification.error({
        message: 'Error, your art could not be added to the manager.',
        description: body.message,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    } else {
      notification.success({
        message: 'Your art was added to the manager!',
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
      name="create-art"
      {...layout}
      style={FormStyle}
      onFinish={onFinish}
      labelAlign="left"
    >
      <FormItem name="name" style={FormInput} label="Name">
        <Input />
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
      <FormItem name="description" style={FormInput} type="textarea" label="Description" >
        <TextArea rows={4} />
      </FormItem>
      <FormItem name="date" style={FormInput} label="Date">
        <DatePicker />
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit">Submit</Button>
      </FormItem>
    </Form>
  );
}

export default CreateArtForm;