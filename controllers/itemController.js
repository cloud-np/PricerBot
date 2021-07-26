'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();


const addItem = async (data) => {
    try {
        await firestore.collection('items').doc().set(data);
        // res.send('Record saved successfuly');
        return true;
    } catch (error) {
        // res.status(400).send(error.message);
        return false;
    }
}

const doesItemExist = async (name) => {
    try{
        const itemsRef = await firestore.collection('items');
        const foundItem = await itemsRef.where('name', '==', name).get();

        return foundItem;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getAllItems = async () => {
    try{
        const items = await firestore.collection('items');
        const data = await items.get();
        return data;
    } catch (error) {
        return false;
    }
}

// const getAllItems = async (req, res, next) => {
//     try {
//         const items = await firestore.collection('items');
//         const data = await items.get();
//         const itemsArray = [];
//         if(data.empty) {
//             res.status(404).send('No Item record found');
//         }else {
//             data.forEach(doc => {
//                 const item = new Item(
//                     doc.id,
//                     doc.data().firstName,
//                     doc.data().lastName,
//                     doc.data().fatherName,
//                     doc.data().class,
//                     doc.data().age,
//                     doc.data().phoneNumber,
//                     doc.data().subject,
//                     doc.data().year,
//                     doc.data().semester,
//                     doc.data().status
//                 );
//                 itemsArray.push(item);
//             });
//             res.send(itemsArray);
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const getItem = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const item = await firestore.collection('items').doc(id);
//         const data = await item.get();
//         if(!data.exists) {
//             res.status(404).send('Item with the given ID not found');
//         }else {
//             res.send(data.data());
//         }
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const updateItem = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const data = req.body;
//         const item =  await firestore.collection('items').doc(id);
//         await item.update(data);
//         res.send('Item record updated successfuly');        
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const deleteItem = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         await firestore.collection('Items').doc(id).delete();
//         res.send('Record deleted successfuly');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

module.exports = {
    addItem,
    doesItemExist,
    getAllItems
    // getItem,
    // updateItem,
    // deleteItem
}