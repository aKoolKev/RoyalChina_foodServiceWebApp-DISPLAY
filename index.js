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
                // display the order details their own line
                const order_liEl = document.createElement('li');
                order_liEl.className = 'order-li-el';
                
                // display order name and [quanity]
                order_liEl.append(document.createTextNode(order[i].name), document.createTextNode(" [" + order[i].quanity + "]\n"));

                // display (order size)
                if (order[i].size){
                    let boldText = document.createElement('strong');
                    boldText.appendChild(document.createTextNode('(' + (order[i].size).toUpperCase() +')'));
                    order_liEl.appendChild(boldText);
                }

                // display any sides if it is a combo/lunch dish
                if ( (order[i].numCR + order[i].numER) > 0){
                    //this is a combo/lunch
                    
                    //....display any Crab Rangoon
                    if (order[i].numCR > 0){
                        order_liEl.appendChild(document.createTextNode(' . . . . . . CR: ' + '(' + order[i].numCR + ')' ) );
// NEED TO DISPLAY CRAB RANGOON IMG ...should be a stand-alone function                  
                    }


                     //....display any Egg Roll
                    if (order[i].numER > 0){
                        order_liEl.appendChild(document.createTextNode(' . . . . . ER: ' + '(' + order[i].numER + ')' ) );
// NEED TO DISPLAY EGG ROLL IMG ...should be a stand-alone function                  
                    }
                }

                // display the item image
                if ( (order[i].name).includes("Fried Rice") && !order[i].name.includes("House Special")){
                    const rice_imgEl = document.createElement('img');
                    const riceType_imgEl = document.createElement('img');
                    
                    const riceObj = imgDB.get(order[i].name);

                    rice_imgEl.src = riceObj.riceImg;
                    rice_imgEl.className = 'database-images';

                    riceType_imgEl.src = riceObj.typeImg;
                    riceType_imgEl.className = 'database-images';
                     
                    order_liEl.append(rice_imgEl, riceType_imgEl);
                    order_ulEl.appendChild(order_liEl);
                } else {
                    const order_imgEl = document.createElement('img');
                    order_imgEl.src = imgDB.get(order[i].name);
                    order_imgEl.className = 'database-images';
                    order_liEl.appendChild(order_imgEl);
                    order_ulEl.appendChild(order_liEl);
                }

               
            }

            //Finish order button -> removes the entire order
            const finishOrder_buttonEl = document.createElement('button');
            finishOrder_buttonEl.innerText = "DONE";
            finishOrder_buttonEl.className = "delete-order-button";
            finishOrder_buttonEl.addEventListener('click', ()=>{removeOrder(orderId)} );

            //Holds the button
            ordersContainer.appendChild(order_ulEl);

            //Add button to the end of order list
            const finishOrder_divEl = document.createElement('div');
            finishOrder_divEl.className = "delete-order-button-container";
            finishOrder_divEl.appendChild(finishOrder_buttonEl);
            ordersContainer.append(finishOrder_divEl, document.createElement('hr'));
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

    //soup images
    imgDB.set('Egg Drop Soup', 'imgURL_DB/eggDropSoup.jpg');
    imgDB.set('Wonton Soup', 'imgURL_DB/wontonSoup.jpg');
    imgDB.set('Wonton Egg Drop Soup','imgURL_DB/wontonEggDropSoup.jpg');
    imgDB.set('Hot & Sour Soup', 'imgURL_DB/hotAndSourSoup.jpg');
    
    //fried rice images
    const PlainFR = {riceImg:'imgURL_DB/friedRice.jpg', typeImg: 'imgURL_DB/onionIcon.jpg'};
    const VFR = {riceImg:'imgURL_DB/friedRice.jpg', typeImg: 'imgURL_DB/vegetableIcon.jpg'};
    const PFR = {riceImg:'imgURL_DB/friedRice.jpg', typeImg: 'imgURL_DB/porkIcon.jpg'};
    const CFR = {riceImg:'imgURL_DB/friedRice.jpg', typeImg: 'imgURL_DB/chickenIcon.jpg'}
    const SFR = {riceImg:'imgURL_DB/friedRice.jpg', typeImg: 'imgURL_DB/shrimpIcon.jpg'};
    const BFR = {riceImg:'imgURL_DB/friedRice.jpg', typeImg: 'imgURL_DB/beefIcon.jpg'};

    imgDB.set('Plain Fried Rice', PlainFR);
    imgDB.set('Vegetable Fried Rice', VFR);
    imgDB.set('Roast Pork Fried Rice', PFR);
    imgDB.set('Chicken Fried Rice', CFR);
    imgDB.set('Shrimp Fried Rice', SFR);
    imgDB.set('Beef Fried Rice', BFR);
    imgDB.set('House Special Fried Rice', 'imgURL_DB/houseSpecialFriedRice.jpg');

}


window.onload = function(){
    loadImgDatabase();
    fetchOrders();  // Initial fetch
}
