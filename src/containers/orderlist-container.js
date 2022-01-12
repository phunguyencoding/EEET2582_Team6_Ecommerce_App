import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listAdminOrderHistory } from '../actions/adminActions/adminActions';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export const OrderListContainer = (props) => {
  const {
    pageNumber = 1,
  } = useParams();
  const orderAdminHistoryList = useSelector((state) => state.orderAdminHistoryList);
  const { loading, error, orders } = orderAdminHistoryList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listAdminOrderHistory(
      {
        pageNumber: pageNumber - 1,
      }
    ));
  }, [dispatch, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    return `/orderlist/pageNumber/${filterPage}`;
  };

  return (
    <div>
      <h1>Order History</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
        <table className="table">    
          <thead>
            <tr>
              <th>ID</th>
              <th>CUSTOMER NAME</th>
              <th>NAME X QUANTITY</th>
              <th>SHIPPING ADDRESS</th>
              <th>TOTAL</th>
              <th>DATE CREATED</th>
            </tr>
          </thead>
          <tbody>
            {orders.data ? orders.data.content.map((order) =>{
              let timestamp = parseInt(order.id.substring(0, 13))

               return (
                <tr key={order.id}>
                <td>{order.id.substring(0, 13)}</td>
                <td>{order.userid}</td>
                <td>{JSON.parse(order.product_list).map((product) => (
                    <div>
                        {product.name} &nbsp; x &nbsp; {product.quantity}
                    </div>
                ))}</td>
                <td>{order.shipping_address}</td>
                <td>{order.total.toFixed(2)}</td>
                <td>{new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ')}</td>
        
              </tr>
            )}) : <p>No Order is found!</p> }
          </tbody>
        </table>
        </>
      )}
      {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
            {orders.data.content.length === 0 && (
                <MessageBox>No Order Found</MessageBox>
              )}
            <div className="row center pagination">
                {[...Array(orders.data.total_page).keys()].map((x) => (
                  <Link
                    className={x === orders.data.current_page ? 'active' : ''}
                    key={ x }
                    to={getFilterUrl({ page: x +1 })}
                  >
                    {x + 1}
                  </Link>
                ))}
              </div>
              </>
          )}
    </div>
  );
}
