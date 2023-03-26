const Item = require("./itemsModel")

exports.createNewItem = async (req, res) => {
  console.log("Creating!!")
  try {
    let item = new Item({
      text: req.body.text,
      complete: req.body.complete,
      user: req.body.user,
      originalUser: req.body.originalUser
    })
    let createdItem = await item.save();
    res.status(200).json({
      msg: "New item created",
      data: createdItem
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
}

exports.deleteItem = async (req, res) => {
  const id = req.params.item_id
  await Item.findByIdAndRemove(id).exec();
  res.sendStatus(200);
}

exports.updateItem = async (req, res) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.item_id, req.body, {
    new: true,
    runValidators: true
  })
  try {
    res.status(200).json({
      status: 'Success',
      data: {
        updatedItem
      }
    })
  } catch(err) {
    console.log(err)
  }
}

exports.markCompleted = async (req, res) => {
  console.log(req.body.complete)
  console.log(req.body.complete != true)
  const updatedItem = await Item.findByIdAndUpdate(req.params.item_id, {$set: {complete: req.body.complete != true}})
  try {
    res.status(200).json({
      status: 'Success',
      data: {
        updatedItem
      }
    })
  } catch (err) {
    console.log(err)
  }
}

exports.getItems = async (req, res) => {
  Item.find({user: req.params.username}, (err,result)=>{
    if(err){
        res.send(err)
    }
    res.send(result)
  });
}

exports.getMatchItems = async (req, res) => {
  Item.find({user: {$ne : req.params.username},originalUser: {$ne : req.params.username}}, (err,result)=>{
    if(err){
        res.send(err)
    }
    res.send(result)
  });
}

