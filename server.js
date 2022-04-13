const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


const unicornSchema = new mongoose.Schema({
    name: String,
    weight: Number,
    dob: Date,
    loves: [String],
    gender: String
});

const unicornModel = mongoose.model("unicorns", unicornSchema);

app.listen(process.env.PORT || 5000, err => {
    if (err) console.log(err);
})

app.use(express.static(`public`));

app.use(bodyparser.urlencoded({
    extended: true
}));

app.post("/findUnicornByName", (req, res) => {
    console.log("request has been received");
    // res.send("Request received");

    unicornModel.find({
        name: req.body.unicornName
    }, (err, unicorns) => {
        if (err) {
            console.log("Error occurred");
        } else {
            console.log("On time, on course, and on target.");
            console.log(unicorns);
        }
        res.send(JSON.stringify(unicorns));
    });
})

app.post("/findUnicornByWeight", (req, res) => {
    console.log("request has been received");
    // res.send("Request received");

    unicornModel.find({
        weight: {
            $gt: req.body.unicornWeightLower,
            $lt: req.body.unicornWeightUpper
        }
    }, (err, unicorns) => {
        if (err) {
            console.log("Error occurred");
        } else {
            console.log("On time, on course, and on target.");
            console.log(unicorns);
        }
        res.send(JSON.stringify(unicorns));
    });
})

app.post("/findUnicornByFood", (req, res) => {
    console.log("request has been received");
    // res.send("Request received");

    appleIsChecked = req.body.appleIsChecked;
    carrotIsChecked = req.body.carrotIsChecked;
    someList = [];
    if (appleIsChecked == 'checked') {
        someList.push({loves: 'apple'});
    }
    if (carrotIsChecked == 'checked') {
        someList.push({loves: 'carrot'});
    }

    console.log(someList);

    unicornModel.find({
        $and: someList
    }, (err, unicorns) => {
        if (err) {
            console.log("Error occurred");
        } else {
            console.log("On time, on course, and on target.");
            console.log(unicorns);
        }
        res.send(JSON.stringify(unicorns));
    });
})

mongoose.connect("mongodb+srv://nng32:aJBf0sIKFZ3PhxBZ@1537-a3.jimqj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology:  true
});
