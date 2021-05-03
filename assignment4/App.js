import './app.css'

import { useState } from 'react';

export default function App() {
    const [orderIndex,setOrderIndex] =useState(0);
    
    const orders = JSON.parse(localStorage.getItem('orders'));

    function updateOrder(newOrderno) {
        setOrderIndex(orders.findIndex(element => element.orderno===newOrderno));        
    }

    function OrderRow(props) {
        return (
            <tr onClick={() => updateOrder(props.orderno)}>
                <td>{props.orderno}</td>
                <td>{props.custname}</td>
                <td>{props.purchasedate}</td>
                <td>{props.total}</td>
            </tr>
        );        
    };

    const ordertable = orders.map(order =>
            <OrderRow 
                orderno={order.orderno}
                custname={order.custname}
                purchasedate={order.purchasedate}
                total={order.total}
                key={order.orderno}
            />
        );

    function ItemRow(props) {
        return (
            <tr>
                <td>{props.itemname}</td>
                <td>{props.quantity}</td>
                <td>{props.price}</td>
                <td>{props.total}</td>
                <td>{props.orderno}</td>
            </tr>
        )
        
    }

    const itemTable = orders[orderIndex].items.map( item =>
        < ItemRow
            itemname={item.itemname}
            quantity={item.quantity}
            price={item.price}
            total={item.total}
            orderno={orders[orderIndex].orderno}
            key={item.name}
        />        
    )


    return (
        <div className="app">
            <section className="ordertable">
                <table>
                    <thead>
                        <tr>
                            <th>Order No</th>
                            <th>Customer</th>
                            <th>Purchase Date</th>
                            <th>Total</th>
                        </tr>   
                    </thead>
                    <tbody>
                        {ordertable}
                    </tbody>
                </table>
            </section>
            <section className="itemtable">
                <table>
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Order No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemTable}
                    </tbody>
                </table>
            </section>
        </div>
    )
}