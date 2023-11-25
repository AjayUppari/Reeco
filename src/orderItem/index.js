import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {MdDone} from 'react-icons/md'
import {RxCross2} from 'react-icons/rx'
import {AiFillMinusCircle} from 'react-icons/ai'
import {BsFillPlusCircleFill} from 'react-icons/bs'
import './index.css'

const OrderItem = props => {
  const {orderDetails, approveOrder, urgentOrder, missingOrder} = props
  const {
    id,
    quantity,
    status,
    brand,
    imageUrl,
    price,
    productName,
  } = orderDetails
  const onClickApproveOrder = () => {
    approveOrder(id)
  }

  const onClickUrgent = () => {
    urgentOrder(id)
  }

  const onClickMissing = () => {
    missingOrder(id)
  }

  const renderOrderStatus = () => {
    switch (status) {
      case 'NONE':
        return null
      case 'APPROVED':
        return <p className="approved statusItem">Approved</p>
      case 'MISSING':
        return <p className="missing statusItem">Missing</p>
      case 'URGENT_AND_MISSING':
        return <p className="urgent statusItem">Missing-Urgent</p>
      default:
        return null
    }
  }

  const getStatusClassName = () => {
    switch (status) {
      case 'MISSING':
        return 'orange'
      case 'URGENT_AND_MISSING':
        return 'red'
      default:
        return 'none'
    }
  }

  return (
    <tr>
      <td className="productName">
        <img className="avocado" src={imageUrl} alt="avocado" />
        <p>{productName}</p>
      </td>
      <td>{brand}</td>
      <td>{`Rs ${price}`}</td>
      <td>{quantity}</td>
      <td>Rs {`${price}` * `${quantity}`}</td>
      <td className="status">
        {renderOrderStatus(status)}
        <button
          className={`${status}` === 'APPROVED' && 'green'}
          onClick={onClickApproveOrder}
          type="button"
        >
          <MdDone className="statusButton" />
        </button>
        <div>
          <Popup
            trigger={
              <button className={getStatusClassName(status)} type="button">
                <RxCross2 className="statusButton" />
              </button>
            }
            modal
            nested
          >
            {close => (
              <div className="modal">
                <div className="content">
                  <div className="closeContainer">
                    <h1 className="missingHeading">Missing product</h1>
                    <RxCross2 className="modalClose" onClick={() => close()} />
                  </div>
                  <p className="urgentHeading">Is {productName} urgent?</p>
                  <div className="buttonsContainer">
                    <button
                      className="redYes yesOrNo"
                      onClick={onClickUrgent}
                      type="button"
                    >
                      Yes
                    </button>
                    <button
                      className="yesOrNo orangeNo"
                      onClick={onClickMissing}
                      type="button"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Popup>
        </div>
        <div>
          <Popup trigger={<button type="button">Edit</button>} modal nested>
            {close => (
              <div className="modal">
                <div className="content">
                  <div className="closeContainer">
                    <h3>{productName}</h3>
                    <RxCross2 className="modalClose" onClick={() => close()} />
                  </div>
                  <p>{brand}</p>
                  <div className="editContainer">
                    <img
                      className="editAvocado"
                      src={imageUrl}
                      alt={productName}
                    />
                    <div>
                      <div className="editItem">
                        <p className="editItemheading">Price</p>
                        <p className="editItemBorder">Rs {price}</p>
                      </div>
                      <div className="editItem">
                        <p className="editItemheading">Quantity</p>
                        <div className="changeQuantity">
                          <AiFillMinusCircle className="changeNumber minus" />
                          <p className="editItemBorder">{quantity}</p>
                          <BsFillPlusCircleFill className="changeNumber" />
                        </div>
                      </div>
                      <div className="editItem">
                        <p className="editItemheading">Total</p>
                        <p>Rs {`${price}` * `${quantity}`}</p>
                      </div>
                    </div>
                  </div>
                  <div className="reasonsContainer">
                    <h4>
                      Choose reason <span>(optional)</span>
                    </h4>
                    <ul>
                      <li>
                        <button className="reason missingReason" type="button">
                          Missing product
                        </button>
                      </li>
                      <li>
                        <button type="button" className="reason quantityReason">
                          Quantity is not the same
                        </button>
                      </li>
                      <li>
                        <button type="button" className="reason quantityReason">
                          Price is not the same
                        </button>
                      </li>
                      <li>
                        <button type="button" className="reason">
                          Other
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="popupSend">
                    <button
                      onClick={() => close()}
                      className="backButton"
                      type="button"
                    >
                      Cancel
                    </button>
                    <button className="approveOrderButton" type="button">
                      Send
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </td>
    </tr>
  )
}

export default OrderItem
