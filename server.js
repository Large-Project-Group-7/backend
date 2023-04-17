import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import User from './model/User.js'
import Book from './model/Book.js'
import Review from './model/Review.js'
const app = express()

const username = "admin2"
const password = "123"

//.env file for this??
mongoose.connect("mongodb+srv://admin2:123@mflix.gg4irlm.mongodb.net/book_review_test?retryWrites=true&w=majority")

//https://www.bacancytechnology.com/blog/file-upload-using-multer-with-nodejs-and-express


var jsonParser = bodyParser.json()
app.post("/api/getuser", jsonParser, (req,res) =>{
    const promise = mongoGetOneUser(req.body.id);
    promise.then(
        function(doc) {
            console.log("Req: " + JSON.stringify(req.body));
            console.log("Result: " + doc)
            res.json(doc)
        }
    )
})


app.post("/api/getalluser", jsonParser, (req,res) =>{
    const promise = User.find({});
    promise.then(
        function(doc) {
            console.log("Req: " + JSON.stringify(req.body));
            console.log("Result: " + doc)
            res.json(doc)
        }
    )
})

app.post("/api/getmanyuser", jsonParser, (req,res) =>{
    const promise = mongoGetManyUser(req.body.firstname, req.body.lastname);
    promise.then(
        function(doc) {
            console.log("Req: " + JSON.stringify(req.body));
            console.log("Result: " + doc)
            res.json(doc)
        }
    )
})

app.delete("/api/deleteuser", jsonParser, (req,res) =>{
    const promise = deleteUser(req.body.id);
    promise.then(function(doc){

        console.log("UserID: " + JSON.stringify(req.body));
        console.log("Del: " + doc);
        res.json(doc);
    })
})

app.post("/api/getbook", jsonParser, (req,res) =>{
    const promise = mongoGetOneBook(req.body.id);
    promise.then(
        function(doc) {
            console.log("Req: " + JSON.stringify(req.body));
            console.log("Result: " + doc)
            res.json(doc)
        }
    )
})

app.listen(5000, () => {console.log("Server Started on port 5000")})

//https://www.youtube.com/watch?v=pfxd7L1kzio

function convertToBase64(file)
{
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
    
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

async function getUser(userID)
{
    const filter = {_id : new mongoose.Types.ObjectId(userID)};
    return User.findOne(filter);
}


async function deleteUser(id2)
{
    const filter2 = { _id : new mongoose.Types.ObjectId(id2)};
    return User.deleteOne(filter2);
}

async function mongoGetUsers()
{
    return User.find({});
}

async function mongoGetManyUser(firstname, lastname)
{
    const filter = {"firstname": { $regex: '.*' + firstname + '.*' }, "lastname":{$regex: '.*' + lastname + '.*'}};
    return User.find(filter);
}

async function mongoGetOneBook(id)
{
   //await mongoose.connect("mongodb+srv://admin2:123@mflix.gg4irlm.mongodb.net/book_review_test?retryWrites=true&w=majority")
    const filter = { _id : new mongoose.Types.ObjectId(id)};
    return Book.findOne(filter);
}

//doMongo();
async function doMongo()
{
    await mongoose.connect("mongodb+srv://admin2:123@mflix.gg4irlm.mongodb.net/book_review_test?retryWrites=true&w=majority")
    const newUser = new User({
        _id: new mongoose.Types.ObjectId(),
        firstname: "apple",
        lastname: "bannna",
        email: "pear",
        username: "orangeapplePie",
        password: "godhelpme"
    });

    const newBook = new Book({
        title: "Test"
    });

    var conn = mongoose.connection;
    console.log("Test: " + conn.collection.name);

    await newUser.save();
    await newBook.save();
    const filter = { _id : new mongoose.Types.ObjectId("6431f5917117c0c47ed136c5")};
    const update = { email: "ricardo.gordonsanchez@gmail.com" };
    
    await User.findOneAndUpdate(filter,update, {upsert:true});
}




















function requireFields(jsonBody, arrowFunction, ...fields) {
    const missingFields = {errors:[]};

    if(jsonBody == null)
    {
        missingFields["errors"].push("Json body cannot be null");
        return missingFields;
    }

    for(const field of fields)
    {
        if(!Object.hasOwn(jsonBody,field))
        {
            missingFields["errors"].push("JsonBody is missing: " + field);
        }
    }

    if(arrowFunction != null)
    {
        console.log("Got Here did you?");
        arrowFunction(jsonBody,missingFields.errors);
    }
    //specialLambda();
    //specialLambda(jsonBody,missingFields);

    return missingFields;
  }
  
  
 // myFunction(myArrowFunction);


app.post("/api/getbookreviews", jsonParser, (req,res) =>{

    const missingFields = requireFields(req.body, (jsonBody,errorArray) => {
        if(Object.keys(jsonBody).length > 3)
        {
            errorArray.push("Body for getboookreviews can only contain bookid, page, and perpage");
        }
      },"bookid","page","perpage");

    if(missingFields.errors.length > 0)
    {
        res.status(400);
        res.json(missingFields);
    }
    else
    {
        const promise = getBookReviews(req.body.bookid, req.body.page, req.body.perpage);
        promise.then(
            function(doc) {
                console.log("Req: " + JSON.stringify(req.body));
                console.log("Result: " + doc)

                if(doc.length == 0)
                {
                    res.status(404);
                }
                res.json(doc)
            }
        )
    }
})

async function getBookReviews(bookID, page, perpage)
{
    page -=1;
    page = (page < 0) ? 0 : page;
    perpage = (perpage < 0) ? 0 : perpage;
    //OH GOD DAMN IT. The main problem here is that I'm going to end up having to get the user anyways, so may as well make a function for that. 
    const aggregation = [
        {
          '$match': {
            ['reviews.'+bookID]: {
              '$exists': true
            }
          }
        }, {
          '$addFields': {
            'reviews': {
              '$objectToArray': '$reviews'
            }
          }
        }, {
          '$unwind': {
            'path': '$reviews'
          }
        }, {
          '$match': {
            'reviews.k': bookID
          }
        }, {
          '$addFields': {
            'reviews': '$reviews.v'
          }
        }
        , {
            '$project': {
              'firstname': 0, 
              'lastname': 0, 
              'email': 0, 
              'password': 0, 
              'datejoined': 0, 
              'reviews._id': 0
            }
        },{
            '$skip': page *perpage
        }, {
            '$limit': perpage
        }
      ];

    return await User.aggregate(aggregation);
    //return User.find(filter);//.find(filter).sort({datecreated:-1});
}


//https://www.youtube.com/watch?v=w3vs4a03y3I

app.put("/api/upsertbook", jsonParser, (req,res) =>{

    const missingFields = requireFields(req.body, (jsonBody,errorArray) => {
        if(Object.keys(jsonBody).length === 0)
        {
            errorArray.push("Upsertbook requires a non-empty json body");
        }
        
      });

    if(missingFields.errors.length > 0)
    {
        res.status(400);
        res.json(missingFields);
    }
    else
    {
        const promise = upsertBook(req.body);
        promise.then(
            function(doc) {
                console.log("Req: " + JSON.stringify(req.body));
                console.log("Result: " + doc)
                res.json(doc)
            }
        )
    }
})

async function upsertBook(jsonBody)
{
    //https://stackoverflow.com/questions/60867154/mongoose-mongodb-performing-an-update-on-the-path-id-would-modify-the-immut
    const newBook = {
        author: jsonBody.author,
        isbn: jsonBody.isbn,
        title: jsonBody.title,
        publisher: jsonBody.publisher,
        year_published: jsonBody.year_published,
        page_count: jsonBody.page_count,
        summary: jsonBody.summary,
        review_count: jsonBody.review_count,
        total_score: jsonBody.total_score,
        book_image: jsonBody.book_image
    };

    const filter = {_id: (jsonBody.id != undefined) ? new mongoose.Types.ObjectId(jsonBody.id) : new mongoose.Types.ObjectId()};
    return await Book.findOneAndUpdate(filter,newBook,{upsert:true, new: true});
}

app.put("/api/upsertreview", jsonParser, (req,res) =>{

    const missingFields = requireFields(req.body, null, "userid", "bookid","reviewscore","summary");

    if(missingFields.errors.length > 0)
    {
        res.status(400);
        res.json(missingFields);
    }
    else
    {
        const promise = upsertReview(req.body);
        promise.then(
            function(doc) {
                console.log("Req: " + JSON.stringify(req.body));
                console.log("Result: " + doc)
                res.json(doc)
            }
        )
    }
})

async function upsertReview(body)
{
    const bookID = new mongoose.Types.ObjectId(body.bookid);
    const userID = new mongoose.Types.ObjectId(body.userid);

    const reviewInfo = new Review({
        bookid: bookID,
        reviewscore: body.reviewscore,
        summary: body.summary
    });

    const reviews = {};
    reviews[bookID] = reviewInfo;
    console.log(JSON.stringify({$set:{reviews}}));

    //Each book uses it's id as a "key", and the review is the value.
    //This approach makes it each to update the one review that needs to be updated with the needed fields. 
    return User.updateOne({_id:userID},{$set:{["reviews."+bookID]:reviewInfo}})

    //return {"Response":"Scuffed"};
    //Get the review that matches the userid and bookid if it exists
    //Not a search for id since I need to safeguard against one user creating multiple reviews for the same book. 
    //const filter = {userid : userID, bookid: bookID};
    //return await Review.findOneAndUpdate(filter, reviewInfo, {upsert:true, new: true});//Review.updateOne(reviewInfo,{upsert:true});
}


app.put("/api/upsertuser",jsonParser, (req,res) =>{
    console.log(req.body);
    res.status(201);
    const promise =  upsertUser(req.body);
    promise.then((response)=>{

        if(response == null)
        {
            res.status(201);
            res.json({update:false});
        }
        else
        {
            res.json({update:true});
        }
    })
    //res.json(req.body);
})

async function upsertUser(jsonBody)
{
    const userInfo = {
        firstname: jsonBody.firstname,
        lastname: jsonBody.lastname,
        email: jsonBody.email,
        username: jsonBody.username,
        password: jsonBody.password,
        img: jsonBody.img
    };

    const filter = {_id: (jsonBody.id != undefined) ? new mongoose.Types.ObjectId(jsonBody.id) : new mongoose.Types.ObjectId()};
    console.log("Did I get here?");
    return await User.findOneAndUpdate(filter,userInfo,{upsert:true});
   // return reviewInfo.save();
}