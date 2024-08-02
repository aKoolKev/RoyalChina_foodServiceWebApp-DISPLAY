//GLOBAl
const ordersContainer = document.getElementById('orders-container');
const imgDB = new Map();

function fetchOrders() {
    //Path structure: ORDER -> uniqueID -> order[ orderObj ]
    database.ref('ORDERS').on('value', (snapshot) => {
        const orders = snapshot.val();
        ordersContainer.innerHTML = '';  // Clear previous orders
        ordersContainer.appendChild(document.createElement('hr'));

        for (let orderId in orders) {
            const order_ulEl = document.createElement('ul');
            order_ulEl.className = "order-ul-el";
            const order = orders[orderId].order; //an order array holding all the orders

            // iterate through order array
            for (let i=0; i<order.length;i++){
                //Diplay the order name, quanity, and size on their own line
                const order_liEl = document.createElement('li');
                order_liEl.className = 'order-li-el';
                order_liEl.append(document.createTextNode(order[i].name), document.createTextNode(" [" + order[i].quanity + "]\n"));
                if (order[i].size){
                    order_liEl.appendChild(document.createTextNode('(' + (order[i].size).toUpperCase() +')'));
                }


                // display the item image
                const order_imgEl = document.createElement('img');
                order_imgEl.src = imgDB.get(order[i].name);
                order_imgEl.className = 'database-images';
                order_liEl.append(order_imgEl);

                order_ulEl.appendChild(order_liEl);
            }

            //Finish order button -> removes the entire order
            const finishOrder_buttonEl = document.createElement('button');
            finishOrder_buttonEl.innerText = "DONE";
            finishOrder_buttonEl.className = "delete-order-button";
            finishOrder_buttonEl.addEventListener('click', ()=>{removeOrder(orderId)} );

            //Holds the button
            const finishOrder_liEl = document.createElement('li');

            //Add button to the end of the order list
            order_ulEl.appendChild(finishOrder_liEl.appendChild(finishOrder_buttonEl));
            
            ordersContainer.appendChild(order_ulEl);
            ordersContainer.appendChild(document.createElement('hr'));
            // orderDiv.textContent = order.join(', ');
        }
    });
}

//Removes an 'order' from database
//Path structure: ORDER -> uniqueID -> order[]
function removeOrder(orderId){
    //get reference to the specific item
    const orderRef = database.ref('ORDERS/'+orderId);
    orderRef.remove()
        .then(()=>{
            console.log("Order successfully deleted");
        })
        .catch( (error)=>{
            console.log('Error deleting item', error);
        });
}



//initialize the database (map) holding the item's image url
function loadImgDatabase(){
    // (itemName: imgURl)
    // appetizer images
    imgDB.set('Spring Roll', 'imgURL_DB/springRoll.jpg');
    imgDB.set('Roast Pork Egg Roll', 'imgURL_DB/eggRoll.jpg');
    imgDB.set('Chicken Teriyaki', 'imgURL_DB/chickenTeriyaki.jpg');
    imgDB.set('Fried Dumpling', 'imgURL_DB/friedDumpling.jpg');
    imgDB.set('Steam Dumpling', 'imgURL_DB/steamedDumpling.jpg');
    imgDB.set('Steam Dumpling', 'imgURL_DB/steamedDumpling.jpg');
    imgDB.set('Steam Dumpling', 'imgURL_DB/steamedDumpling.jpg');
    imgDB.set('Crab Rangoon (x5)', 'imgURL_DB/crabRangoon.jpg');
    imgDB.set('Crab Rangoon (x10)', 'imgURL_DB/crabRangoon.jpg');
    imgDB.set('Boneless Spare Ribs', 'imgURL_DB/bonelessSpareRibs.jpg');
    imgDB.set('Chicken Nuggets', 'imgURL_DB/chickenNuggets.jpg');
    imgDB.set('Sugar Biscuit', 'imgURL_DB/sugarBiscuit.jpg');
    imgDB.set('Fried Wonton', 'imgURL_DB/friedWonton.jpg');
    imgDB.set('Fried Baby Shrimp', 'imgURL_DB/friedBabyShrimp.jpg');
    imgDB.set('Mozarella Cheese Sticks', 'imgURL_DB/mozarellaCheeseSticks.jpg');
    imgDB.set('Crab Stick', 'imgURL_DB/crabStick.jpg');
}


window.onload = function(){
    loadImgDatabase();
    fetchOrders();  // Initial fetch
}
