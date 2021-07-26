const schedule = require('node-schedule');
const crawler = require('../crawler');
const firebase = require('../db');
const firestore = firebase.firestore();

// Every day at 00:00
// 0 0 * * *
// Every min.
// * * * * *
const job = schedule.scheduleJob('* * * * *', async function(){
    console.log('Updating items...');
    const items = await firestore.collection('items');
    const itemsData = await items.get();

    if (itemsData.empty)
        return;

    itemsData.forEach(async doc => {
        const updatedItem = await crawler.parseItem(doc.data().url);
        const oldPrice = doc.data().price;
        if (oldPrice < updatedItem.price){
            
        }
        await doc.ref.update(updatedItem);
    });
    console.log('Updated all successfully items!!');
});