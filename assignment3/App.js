import './app.css'

export default function App(){
    function addRow() {
        const items=document.querySelector('.items');
        let item=document.createElement('form');
        item.setAttribute('name','itemd');
        items.appendChild(item);
        let itemname=document.createElement('input');
        itemname.setAttribute('type','text');
        itemname.setAttribute('required','true');
        itemname.setAttribute('name','itemn');
        item.appendChild(itemname);
        let itemquantity=document.createElement('input');
        itemquantity.setAttribute('type','text');
        itemquantity.setAttribute('required','true');
        itemquantity.setAttribute('name','quantity');
        item.appendChild(itemquantity);
        let itemprice=document.createElement('input');
        itemprice.setAttribute('type','text');
        itemprice.setAttribute('required','true');
        itemprice.setAttribute('name','price');
        item.appendChild(itemprice);
        let itemtotal=document.createElement('input');
        itemtotal.setAttribute('type','text');
        itemtotal.setAttribute('required','true');
        itemtotal.setAttribute('name','total');
        item.appendChild(itemtotal);
        let rembut = document.createElement('input');
        rembut.setAttribute('type','button');
        rembut.setAttribute('value','Remove');
        rembut.addEventListener('click',removeRow);
        item.appendChild(rembut);
        };

    function removeRow(e) {
        let row=e.target.parentNode;
        row.remove();        
    }

    if (localStorage.getItem('orders')) {
        var saveString=localStorage.getItem('orders');
        var saveObj=JSON.parse(saveString);
    }
    else {
        saveObj = [];
    }

    function saveOrder(){
        let itemarray = [];
        let itemforms =document.itemd;
        console.log(typeof(itemforms));
        console.log(itemforms);
        if (itemforms.name==='itemd') {
            const item = { itemname: itemforms.itemn.value, quantity: itemforms.quantity.value,
                price: itemforms.price.value, total: itemforms.total.value };
            itemarray.push(item);
        }
        else {
            for (const iterator of itemforms) {
                const item = { itemname: iterator.itemn.value, quantity: iterator.quantity.value,
                    price: iterator.price.value, total: iterator.total.value };
                itemarray.push(item);
            }
        }
        let order = document.forms.order;
        saveObj.push({ orderno: order.orderno.value, custname: order.custname.value,
            purchasedate: order.purchasedate.value, total: order.total.value, 
            items: itemarray });
    
    resetOrder();;
    localStorage.setItem('orders', JSON.stringify(saveObj));
    }

    function resetOrder(){
        const forms=document.forms;
        for (const iterator of forms) {
            iterator.reset();
        }
    }

    return (
        <div className="app">
            <h4>Enter Order</h4><hr />
            <form id="order">
                <label >Order No &emsp;&emsp;&ensp;</label>
                <input name="orderno" type="text" required />
                <label >Purchase date </label>
                <input name="purchasedate" type="text" required /> <br/>
                <label >Customer Name</label>
                <input name="custname" type="text" required />
                <label >Total amount</label>
                <input name="total" type="text" required />
            </form>
            <br/><br />
            <h4>Add Items</h4><hr />
            <div style={{textAlign: "right"}}>
                <input type="button" value="Add Other" onClick={addRow} />
            </div>
            <div className="itemh">
            {/* <span>Item Name &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;</span>
            <span>Quantity &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;</span>
            <span>Price per unit &emsp; &emsp; &emsp; &emsp; &emsp;</span>
            <span>Total price</span> */}
                <p>Item name</p>
                <p>Quantity</p>
                <p>Price per Unit</p>
                <p>Total price</p>
            </div>
            <div className="items">
            <form name="itemd" >
                <input name="itemn" required/>
                <input name="quantity" required/>
                <input name="price" required/>
                <input name="total" required/>
            </form>
            </div>
            <br/><br />
            <button onClick={saveOrder}>Save</button>
            <button onClick={resetOrder}>Reset</button>
        </div>
    )
}