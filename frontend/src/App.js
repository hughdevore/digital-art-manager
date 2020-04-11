import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './App.css';
import {
  Button,
  Layout,
  List,
  Skeleton
} from 'antd';
import CreateArtForm from './components/CreateArtForm';
import { DeleteOutlined } from '@ant-design/icons';

const { Content, Header, Sider } = Layout;
const { Item } = List;

class App extends Component {
  state = {
    initLoading: true,
    list: [],
    loading: false,
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

  updateArt = async (e) => {
    console.log('UPDATE ME!!!!');
    console.log(e.target)
  }

  deleteArt = async (e) => {
    console.log('DELETE ME!!!!');
    console.log(e);
  }

  render() {
    const { list } = this.state;
    return (
      <Fragment>
        <Layout>
          <Header>
            <h1 style={{color: 'white'}}>Digital Art Manager</h1>
          </Header>
          <Layout>
            <Content
              style={{
                padding: '3em 5em'
              }}
            >
              <List 
                className="art-manager-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                  <Item
                    actions={[<Button key={item.id} onClick={() => this.updateArt(item.id)}>Edit</Button>, <DeleteOutlined onClick={this.deleteArt} twoToneColor="#eb2f96" />]}
                  >
                    <Skeleton title={false} loading={item.loading} active>
                      <Item.Meta
                        title={item.name}
                        description={item.description}
                      />
                    </Skeleton>
                  </Item>
                )}
              />
            </Content>
            <Sider
              width={350}
              style={{
                padding: '2em',
                backgroundColor: 'rgb(171, 177, 186)',
              }}
            >
              <CreateArtForm />
            </Sider>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}
export default App;