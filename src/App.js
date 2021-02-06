import Header from './components/Header';
import { Web3Provider } from './libs/web3';
import { networkConfig } from './App.Config';
import Home from './pages/Home';
import { Layout } from 'antd';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BASE_URL = 'https://web3api.io/api/v1/'

let config = {
  headers: {"x-api-key": "UAK000000000000000000000000demo0001"}
}

const extractData = (data) => data.data.payload

const getCurrentTokenBalances = (address) => axios.get(`${BASE_URL}addresses/${address}/tokens`, config)

let getAmount = (token) => token.amount / Math.pow(10, token.decimals)

let round = (n, digits) => Number.parseFloat(n).toFixed(digits)

let sortBalances = (balances) =>
  balances.sort((a, b) => {
    if (getAmount(a) > getAmount(b))
      return -1
    if (getAmount(a) < getAmount(b))
      return 1
    return 0
  }).slice(0, 5)

const TokenList = ({ tokens }) => {
  return (
    <>
    {
      /*
      This is just syntactic sugar for React.Fragment which essentially acts as a div
      without the applied styles of a div
      */
    }
    {tokens.map(token =>
      <div className="token" data-address={token.address} data-name={token.name}>
        <div className="name item">
          ${token.name} (${token.symbol})
        </div>
        <div className="value item">
          Amount: ${round(getAmount(token), 2)}
        </div>
      </div>
     )}
    </>
  )
}

const populate = async (address) => {
  const balances = extractData(await getCurrentTokenBalances(address))
  console.log(balances, "Balances")
  return sortBalances(balances.records)
}

const Content = () => {
  const [tokens, setTokens] = useState([]);

  console.log(tokens, "Token list");

  useEffect(() => {
    async function onLoad() {
      const query = window.location.search.replace('?', '')
      console.log(query)
      const address = query === '' ? '0xd1dE80930227C56eE8bB2049e4D36bFf4161163E' : query
      console.log(address)

      const tokens = await populate(address)
      setTokens(tokens);
    }
    onLoad();
  }, []);


  return (
    <Layout style={{minHeight: '100vh'}}>
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Home />
            <TokenList tokens={tokens} />
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
