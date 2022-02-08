import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt-nodejs";


const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/hotel";
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
mongoose.Promise = Promise;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlenght: 2,
    maxlenght: 20,
    required: true
  },
  adress: {
    type: String,
    minlenght: 2,
    maxlenght: 20,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },

  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString("hex")
  },

  error: Boolean,

  coins: {
    type: Number,
    default: 1000
  }
});

const User = mongoose.model("User", userSchema);

// Defines the port the app will run on. Defaults to 8080, but can be
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization");

  try {
    const user = await User.findOne({ accessToken });
    if (user) {
      next();
    } else {
      res.status(401).json({ response: "Please, log in", success: false });
    }
  } catch (error) {
    res.status(400).json({ response: "error", success: false });
  }
};

// Start defining your routes here
app.get("/", (req, res) => {
  res.send("Welcome to this API");
});

app.post("/signup", async (req, res) => {
  const { username, password, name,adress, phone } = req.body;
  try {
    const salt = bcrypt.genSaltSync();

    if (password.length < 5) {
      throw "Password need to be 5 characters or longer";
    } else {
      const newUser = await new User({
        username,
        name,
        password: bcrypt.hashSync(password, salt),
        adress,
        phone
      }).save();

      res.status(201).json({
        response: {
          id: newUser._id,
          username: newUser.username,
          name: newUser.name,
          accessToken: newUser.accessToken,
          coins: newUser.coins,
          adress:newUser.adress,
          phone: newUser.phone,
        },
        success: true
      });
    }
  } catch (error) {
    res.status(400).json({
      response: {
        error
      },
      success: false
    });
  }
});

app.get("/secrets", authenticateUser);
app.get("/secrets", (req, res) => {
  res.send();
});

app.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        response: {
          id: user._id,
          username: user.username,
          name:user.name,
          accessToken: user.accessToken,
          coins: user.coins,
          adress:user.adress,
          phone: user.phone,
        },
        success: true
      });
    } else {
      res.status(404).json({
        message: "Username or password doesn't match",
        success: false
      });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

app.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const user = await User.findByIdAndUpdate(id, updates, options).save();
   
    if (user) {
      res.status(200).json({
        response: {
      
          name: user.name,
          coins: user.coins,
          adress:user.adress,
          phone: user.phone,
        },
        success: true
      });

    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});



/* Reservations */
const shortid = require("shortid");
const reservationSchema = new mongoose.Schema({
  hotelName: String,
  checkIn: String,
  checkOut: String,
  roomName: String,
  individuals: Number,
  priceOfRoom: Number,
  totalPrice: Number,
  user: String,
  reservationId: {
    type: String,
    default: shortid.generate
  }
});

const AllUsermessages = mongoose.model("AllUsermessages", reservationSchema);




app.post("/reservation", async (req, res) => {
  const {
    hotelName,
    checkIn,
    checkOut,
    roomName,
    individuals,
    priceOfRoom,
    totalPrice,
    user
  } = req.body;

  const messages = new AllUsermessages({
    hotelName,
    checkIn,
    checkOut,
    roomName,
    individuals,
    priceOfRoom,
    totalPrice,
    user
  }).save();

  try {
    const response = await messages;
    if (response) {
      res.status(201).json({
        response,
        success: true
      });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});


/* ALL RESERVATIONs DONE BY USER */

app.get("/reservation", async (req, res) => {
  const { username } = req.header("user");
  try {
    const response = await AllUsermessages.find(username);
    res.status(201).json({
      response,
      success: true
    });
  } catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});

/* FIND A RESERVATION  */

app.get("/find/:reservationId", async (req, res) => {
  const reservationId = req.params.reservationId
  try {
    const response = await AllUsermessages.findOne({reservationId : reservationId});
    if(response){ 

res.status(201).json({
  response,
  success: true

})} 

else {
  res.status(401).json({ response: "Please, log in", success: false });
}
 }
    
  
  catch (error) {
    res.status(400).json({ response: error, success: false });
  }
});



 /* DELETE A RESERVATION */

 app.delete("/reservation/:id", async (req, res) => { 
  const id = req.params.id

try {
  const response = await AllUsermessages.findByIdAndDelete(id)
  res.status(200).json({
    response: {response} })

} catch (error) {
  console.log(error.message)
}

})











// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
