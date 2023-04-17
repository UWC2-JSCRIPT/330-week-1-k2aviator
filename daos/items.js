const uuid = require('uuid');

const itemsModel = require('../models/items');

module.exports = {};


module.exports.getAll = () => {
  return itemsModel.items;
}

module.exports.getById = (itemId) => {
  const item = itemsModel.items.find(item => item.id === itemId)
  return item
}

module.exports.deleteById = async (itemId) => {
    const index = itemsModel.items.findIndex(
      item => item.id === itemId
    );
    if (index >= 0) {
      const deleted = itemsModel.items.splice(index,1);
      return deleted[0]
    }
}

module.exports.updateById = async (itemId, newObj) => {
  const index = itemsModel.items.findIndex(item => item.id === itemId)
  
  if (index>= 0) {
    let {id, ...rest} = newObj //destructuring id from items
    // console.log("new object is "," id: ", id, " rest of values " ,rest) // need to take rest have overwrite items
    let fixedIndex = {"id": itemsModel.items[index].id}
    let fixedValuesOverwrite = itemsModel.items[index]
    // console.log("values to overwrite ", fixedValuesOverwrite)
    // console.log("this is the id to preserve ", fixedIndex)
    let newEntry = Object.assign({}, fixedIndex, rest)
    // console.log("new entry to pass through ", newEntry)
    // console.log("items model ", itemsModel.items[index])
    itemsModel.items[index] = newEntry
    // console.log(itemsModel.items)
    // return itemsModel.items
  }

}

module.exports.create = async (item) => {
  const id = uuid.v4();
  const newItem = { ...item, id };
  itemsModel.items.push(newItem);
  return newItem;
}