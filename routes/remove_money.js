const express = require('express');
const router = express.Router();
const mongo = require('mongodb');

router.post('/', function(req, res){
    let amountToWidthraw = req.body.amountToAdd;
    let lastRecord = null;

    let mongooseUrl = 'mongodb://127.0.0.1:27017/wallet';
    mongo.connect(mongooseUrl, function(err, db){
        if(err) throw err;
        lastRecord = db.collection('wallet').find({title: 'wallet'}).sort({_id: 1}).limit(1);
        lastRecord.forEach(function(doc, err){
            if(err) throw err;
            console.log(doc);
            let newAmount = doc.amount - amountToWidthraw;
            db.wallet.update({title: 'wallet'},{$set:{'amount': newAmount}});
        });
        
        db.close();
    });

    res.send('cash withdrawn');
});

module.exports = router;