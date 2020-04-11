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
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                  <Item
                    actions={[
                      <Button size="small" key={item.id} onClick={() => this.updateArt(item.id)}>Edit</Button>,
                      <DeleteOutlined style={{paddingLeft: '2em'}} onClick={this.deleteArt} twoToneColor="black" />
                    ]}
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