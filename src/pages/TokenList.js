import {getAmount, round} from "../util/helpers";
import "./TokenList.css";

export const TokenList = (prop) => {
  return (
    <>
      <div className="tokens">
        {
          prop.tokens.map(token =>
            <div className="token" data-address={token.address} data-name={token.name}>
              <div className="name item">
                ${token.name}
              </div>
              <div className="value item">
                Amount: ${round(getAmount(token), 2)}
              </div>
              <div className="address item">
                ${token.address}
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}
