import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import moment from 'moment';
import {
  Button,
  Drawer,
  Layout,
  List,
  notification,
  Popconfirm,
} from 'antd';
import CreateArtForm from './components/CreateArtForm';
import UpdateArtForm from './components/UpdateArtForm';
import { DeleteOutlined } from '@ant-design/icons';
import GithubLogo from './GitHub-Mark-Light-64px.png';

const { Content, Footer, Header, Sider } = Layout;
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
    this.getArtList();
  }

  getArtList = async () => {
    const response = await axios.get('http://localhost:3100/art');
    const body = response.data;
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    this.setState({ 
      list: body,
    });
  }

  deleteArt = async (id) => {
    console.log(id);
    const response = await axios.delete(`http://localhost:3100/art/${id}`);
    const body = response.data;
    if (response.status !== 200) {
      notification.error({
        message: 'Error, your art could not be deleted.',
        description: body.message,
      });
    } else {
      notification.success({
        message: 'Your art was deleted from sthe manager!',
        description: body.message,
      });
      this.getArtList();
    }
  }

  showDrawer = () => {
    this.setState({visible: true});
  };

  handleClose = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { list, updateArt } = this.state;
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Header className="art-manager-header">
          <h1>DIGITAL ART MANAGER</h1>
        </Header>
        <Layout>
          <Content
            className="art-manager-list-container"
          >
            <List 
              className="art-manager-list"
              itemLayout="vertical"
              dataSource={list}
              size="large"
              split={true}
              renderItem={item => {                
                return (
                  <Item
                    key={item.id}
                    extra={[
                      <Button size="small" onClick={() =>{
                        this.setState({
                          updateArt: {
                            id: item.id,
                            description: item.description,
                            name: item.name,
                          }
                        });
                        this.showDrawer();
                      }}>Edit</Button>,
                      <Popconfirm
                        placement="topRight"
                        title="Are you sure you want to delete this?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {this.deleteArt(item.id)}}
                      >
                        <DeleteOutlined 
                          style={{paddingLeft: '2em'}}
                          twoToneColor="black"
                        />
                      </Popconfirm>
                    ]}
                    actions={[
                      <span><strong>Artist: </strong>{item.artist}</span>,
                      <span><strong>Height: </strong>{item.width}</span>,
                      <span><strong>Width: </strong>{item.width}</span>,
                    ]}
                  >
                    <Item.Meta
                      key={`item-${item.id}`}
                      title={item.name}
                      description={moment(item.date).format("ll")}
                    />
                    {item.description}
                  </Item>
                );
              }}
            />
            <Drawer
              title={`Update ${updateArt.name}`}
              visible={this.state.visible}
              onClose={this.handleClose}
              destroyOnClose={true}
              closable={true}
              footer={null}
              width={500}
            >
              <UpdateArtForm art={updateArt} getArtList={this.getArtList} />
            </Drawer>
          </Content>
          <Sider
            width={500}
            style={{
              padding: '2em',
              backgroundColor: 'rgb(171, 177, 186)',
            }}
          >
            <h2 className="update-art-form-header">UPLOAD NEW ART</h2>
            <CreateArtForm getArtList={this.getArtList} />
          </Sider>
        </Layout>
        <Footer className="app-footer">
          <a href="https://github.com/hughdevore/digital-art-manager">
            <img src={GithubLogo} className="github-logo" alt="GitHub Logo with link to repository"/>
          </a>
        </Footer>
      </Layout>
    );
  }
}
export default App;