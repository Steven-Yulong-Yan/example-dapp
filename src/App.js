import Header from './components/Header';
import { Web3Provider } from './libs/web3';
import { networkConfig } from './App.Config';
import Home from './pages/Home';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import React from 'react';

const Content = () => {
  return (
    <Layout style={{minHeight: '100vh'}}>
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </Layout>
  )
}

function App() {
  return (
    <div className="App">
      <Web3Provider
        networkConfig={networkConfig}
      >
        <Content />
      </Web3Provider>
    </div>
  );
}

export default App;
