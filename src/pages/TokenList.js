import {getAmount, round} from "../util/helpers";

export const TokenList = (prop) => {
  return (
    <>
      {
        /*
        This is just syntactic sugar for React.Fragment which essentially acts as a div
        without the applied styles of a div
        */
      }
      {prop.tokens.map(token =>
        <div className="token" data-address={token.address} data-name={token.name}>
          <div className="name item">
            ${token.name} - ${token.symbol} - ${token.address}
          </div>
          <div className="value item">
            Amount: ${round(getAmount(token), 2)}
          </div>
        </div>
      )}
    </>
  )
}
