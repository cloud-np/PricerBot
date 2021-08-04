'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();

const doesUserExist = async (discordID, itemID) => {
    try {
        const foundUser = await firestore.collection('items').doc(itemID).collection('users').where('discordID', '==', discordID).get();

        if (foundUser.empty)
            return false;
        // Check if the item is being tracked by the user.
        return await foundUser.docs[0].data();
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getUserSubItems = async (discordID) => {
    try {
        const items = await getAllItems();
        // let subItems = [];
        const subItems = items.docs.map(async item => {
            const foundUser = await doesUserExist(discordID, item.id);
            if (foundUser !== false)
                return item;
        });
        return Promise.all(subItems);
    } catch (error) {
        console.log(error);
        return false;
    }
}

const tryAddingUser = async (user, itemID) => {
    try {
        const foundUser = await doesUserExist(user.id, itemID);

        if (foundUser) {
            return { user: foundUser, isTracked: true }
        } else {
            // You have to wait for the sub-collection to be created then you can add the subcribed user.
            const userSubCol = await firestore.collection('items').doc(itemID).collection('users');
            const addedUser = await userSubCol.add({
                discordID: user.id,
                discriminator: user.discriminator,
                username: user.username
            });
            return { user: addedUser, isTracked: false }
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const tryAddingItem = async (item) => {
    try {
        const itemExistAlready = await doesItemExist(item.name);
        if (itemExistAlready) {
            return { item: itemExistAlready, isTracked: true }
        } else {
            const addedItem = await firestore.collection('items').add(item);
            return { item: addedItem, isTracked: false }
        }
    } catch (error) {
        return false;
    }
}

const doesItemExist = async (name) => {
    try {
        const itemsRef = firestore.collection('items');
        const snapshot = await itemsRef.where('name', '==', name).get();

        if (snapshot.empty)
            return false;

        const foundItem = await snapshot.docs[0];
        return foundItem;
    } catch (error) {
        console.log(error);
        return false;
    }
}

const getAllItems = async () => {
    try {
        const itemsRef = firestore.collection('items');
        const items = await itemsRef.get();
        return items;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// const getItem = async (name) => {
//     try {
//         const itemsRef = await firestore.collection('items');
//         return await itemsRef.where('name', '==', name).get();
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

module.exports = {
    tryAddingItem,
    doesItemExist,
    getAllItems,
    // getItem,
    getUserSubItems,
    tryAddingUser,
    doesUserExist,
    // updateItem,
    // deleteItem
}