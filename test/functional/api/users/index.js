import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";

const expect = chai.expect;

let db;
let api;

const users = [
    {
      username: "user1",
      password: "test1",
    }
]

describe("Users endpoint", () => {
  before(() => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
  });

  after(async () => {
    try {
      await db.dropDatabase();
    } catch (error) {
      console.log(error);
    }
  });
  beforeEach(async () => {
    try {
      api = require("../../../../index");
      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /users ", () => {
    it("should return the 1 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          let result = res.body.map((user) => user.username);
          done();
        });
    });
  });

  describe("POST / ", () => {
    it("should return a 200 status and the confirmation message", () => {
      return request(api)
        .post("/api/users?action=register")
        .send({
          username: "user3",
          password: "test3",
        })
        .expect(201)
        .expect({ code: 201, msg: 'Successful created new user.' });
    });
    after(() => {
      return request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1","user2", "user3"]);
        });
    });
  });
});
//  describe("POST /users?action=register  failed conditons", () => {
//   it("should return a 401 statue message to reject register", () => {
//     return request(api)
//       .post("/api/users?action=register")
//       .send({
//         username: "user4",
//         password: "12",
//       })
//       .expect(401)
//       .expect({ code: 401, msg: 'Bad password format.' });
//    });
//    it("should return a success:false statue message to reject register when entered nothing",() => {
//     return request(api)
//     .post("/api/users?action=register")
//     .expect({ success: false, msg: 'Please pass username and password.' });
//   });
// });
  // // describe("POST /users?action=register  failed conditons", () => {
  // //   it("should return a 401 statue message to reject register", () => {
  // //     return request(api)
  // //       .post("/api/users?action=register")
  // //       .send({
  // //         username: "user4",
  // //         password: "12",
  // //       })
  // //       .expect(401)
  // //       .expect({ code: 401, msg: 'Bad password format.' });
  // //    });
  // //    it("should return a success:false statue message to reject register when entered nothing",() => {
  // //     return request(api)
  // //     .post("/api/users?action=register")
  // //     .expect({ success: false, msg: 'Please pass username and password.' });
  // //   });
  // // });
 // describe("POST / Movie favourites ", function() {
 //   it("should return a 201 status, favourites and user message, and we can find it in favourite", (done) =>{
 //       request(api)
 //       .post("/api/users/user1/favourites")
 //       .send({
 //         id: movieId
 //       })
 //       .expect(201)
 //       .end((err,res)=> {
 //         expect(res.body).to.be.a("Object");
 //        done();
 //       })
 //       it("should mean that we can find it in favourite", (done) =>{
 //         request(api)
 //        .get("api/users/user1/favourites")
 //         .set("Accept", "application/json")
  //        .expect("Content-Type", /json/)
   //       .expect(200)
     //     .end((err,res)=> {
     //       expect(res.body).to.be.a("array");
      //      let result = res.body.map((favourite) => favourite.id);
      //      expect(result).to.have.members([577922]);
     //       done();
       //   });
     //   });
//    });
//  });




describe("POST /api/users?action=authenticate  failed conditons", () => {
  it("should return a 401 statue message to reject log in", () => {
    return request(api)
      .post("/api/users?action=authenticate")
      .send({
        username: "user4",
        password: "12",
      })
      .expect(401)
      .expect({ code: 401, msg: 'Authentication failed. User not found.' });
   });    
});