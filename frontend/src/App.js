import React, { Component } from 'react';
import axios from 'axios';
import { Button, Layout, List, Skeleton } from 'antd';
import './App.css';

const { Content, Header } = Layout;

class App extends Component {
  state = {
    initLoading: true,
    data: [],
    list: [],
    loading: false,
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(response => {
        console.log('WOWEE');
        console.log(response);
        this.setState({ 
          data: response,
          list: response,
        });
      });
  }

  // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await axios.get('http://localhost:3100/art');
    const body = response.data;

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    const { initLoading, loading, list } = this.state;
    return (
      <div className="App">
        <Layout>
          <Header>
            <h1>Digital Art Manager</h1>
          </Header>
          <Content>
            <List 
              className="art-manager-list"
              itemLayout="horizontal"
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[<a key={"edit-"+item.id}>Edit</a>, <a key={"delete-"+item.id}>Delete</a>]}
                >
                  <Skeleton title={false} loading={item.loading} active>
                    <List.Item.Meta
                      title={<a href="https://ant.design">{item.name}</a>}
                      description={item.description}
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
      </div>
    );
  }
}
export default App;