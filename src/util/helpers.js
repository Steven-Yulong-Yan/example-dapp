import BigNumber from 'bignumber.js'
import Web3 from 'web3';
const web3 = new Web3()

export const truncateString = (addr, start=6, end=4) => addr ? `${addr.substring(0, start)}...${addr.substring(addr.length - end)}` : null
export const numberToMaxDb = (value, dp=2) => +parseFloat(value).toFixed( dp )
export const fromWei = (amount=0, unit='ether') => web3.utils.fromWei(amount.toString(), unit)
export const maxApproval = new BigNumber(2).pow(256).minus(1);

export const getAmount = (token) => token.amount / Math.pow(10, token.decimals)

export const round = (n, digits) => Number.parseFloat(n).toFixed(digits)

export const sortBalances = (balances) =>
  balances.sort((a, b) => {
    if (getAmount(a) > getAmount(b))
      return -1
    if (getAmount(a) < getAmount(b))
      return 1
    return 0
  }).slice(0, 5)
