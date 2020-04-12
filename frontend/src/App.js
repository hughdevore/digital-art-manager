import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './App.css';
import {
  Button,
  Layout,
  List,
  Modal,
} from 'antd';
import CreateArtForm from './components/CreateArtForm';
import UpdateArtForm from './components/UpdateArtForm';
import { DeleteOutlined } from '@ant-design/icons';

const { Content, Header, Sider } = Layout;
const { Item } = List;

class App extends Component {
  state = {
    initLoading: true,
    list: [],
    loading: false,
    visible: false,
    updateArt: {
      id: null,
      description: null,
      name: null,
    }
  };

  componentDidMount() {
    this.getArtList()
      .then(response => {
        this.setState({ 
          list: response,
        });
      });
  }

  getArtList = async () => {
    const response = await axios.get('http://localhost:3100/art');
    const body = response.data;
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  }

  deleteArt = async (e) => {
    console.log('DELETE ME!!!!');
    console.log(e);
  }

  showModal = (item) => {
    console.log(item);
    this.setState({
      visible: true,
      updateArt: {
        id: item.id,
        description: item.description,
        name: item.name,
      }
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  render() {
    const { list } = this.state;
    return (
      <Fragment>
        <Layout style={{minHeight: '100vh'}}>
          <Header>
            <h1 style={{color: 'white'}}>Digital Art Manager</h1>
          </Header>
          <Layout>
            <Content
              style={{
                padding: '3em'
              }}
            >
              <List 
                className="art-manager-list"
                itemLayout="vertical"
                dataSource={list}
                size="large"
                renderItem={item => (
                  <Item
                    extra={[
                      <Button size="small" key={item.id} onClick={() => this.showModal(item)}>Edit</Button>,
                      <DeleteOutlined style={{paddingLeft: '2em'}} onClick={this.deleteArt} twoToneColor="black" />
                    ]}
                    actions={[
                      <span><strong>Artist: </strong>{item.artist}</span>,
                      <span><strong>Height: </strong>{item.width}</span>,
                      <span><strong>Width: </strong>{item.width}</span>,
                    ]}
                  >
                    <Item.Meta
                      title={item.name}
                      description={item.description}
                    />
                  </Item>
                )}
              />
              <Modal
                title="Update this Art"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
                mask={false}
              >
                <UpdateArtForm art={this.state.updateArt} />
              </Modal>
            </Content>
            <Sider
              width={350}
              style={{
                padding: '2em',
                backgroundColor: 'rgb(171, 177, 186)',
              }}
            >
              <h1 style={{fontSize: '1.5em'}}>Add New Art to the Manager</h1>
              <CreateArtForm />
            </Sider>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}
export default App;