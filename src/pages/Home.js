import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useAccount } from '../libs/web3'
import { Input, Button} from 'antd'
import ERC20 from '../libs/erc20/erc20';
import Web3 from 'web3';
import axios from "axios";

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

export const populate = async (address) => {
  const balances = extractData(await getCurrentTokenBalances(address))
  console.log(balances, "Balances")
  return sortBalances(balances.records)
}

const Instructions = styled(({
    className
}) => {
    const { fetchPickleBalance } = ERC20.useContract();

    const [address, setAddress] = useState('')
    const [balance, setBalance] = useState('?')

    const handleClick = async (e) => {
        e.preventDefault();
        const balance = await fetchPickleBalance(address);
        // Since we dont store decimals on the block chain we use wei to store our values
        // wei is the smallest unit of ethereum.
        // it just adds a bunch of zeros to whatever value is stored (10^-18)
        // fromWei is just a handy util to convert it back to something we understand
        setBalance(Web3.utils.fromWei(balance))
    }

    const handleChange = (e) => {
        e.preventDefault();
        setAddress(e.target.value);
    }

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
    <>
      <h1>So you're telling me I'm connected to the ethereum blockchain :o</h1>
      <h2>Check ./libs/erc20 to see an example of how to interact with smart contracts</h2>

      <p>
          Try enter <a href="https://etherscan.io/address/0x2252A85e520fE2f29E0be62104D8551B32649C66">0xd1dE80930227C56eE8bB2049e4D36bFf4161163E</a> into the field below and hit submit
      </p>

      <div>
          <Input placeholder="Enter in an ethereum address" value={address} onChange={handleChange}/>
          <Button onClick={handleClick}>Get Pickle Balance</Button>
      </div>
      <p>Balance: {balance}</p>

      <TokenList tokens={tokens} />
    </>
  )
})
``

export default styled(
	({
		className
	}) => {
		const { status } = useAccount()

		return status === 'CONNECTED'
            ? 	<Instructions />
			: <></>
	})
	`
		display: flex;
		align-items: center;
	`
