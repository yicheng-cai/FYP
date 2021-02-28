import chai from "chai";
import request from "supertest";
import api from "../../../../index";  // Express API application 

const expect = chai.expect;
const currentclothesposition = 2 ;
const currentclothesTitle = "Small - Large Pet Dog Adidog Winter Clothes Sweater Hoodie Shirt Jacket Jumpsuit";
let token;

describe('Clothes endpoint',  function (){
    this.timeout(5000)
    before((done)=>{
        setTimeout(()=>{
           done();
        },4500)
    })
    before( (done)=>{
      request(api)
      .post("/api/users")
      .send({
        "username":"user1",
        "password":"user1"
      })
      .end((err,res)=>{
        token = res.body.token;
        console.log(token);
        done()
      });
    });
    describe("GET /clothess ", () => {
      describe("when the token is valid", () => {
          it("should check token and return the 10 clothes", (done) => {
            request(api)
            .get("/api/clothes")
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.equal(10);
              done();
            });
          });
        });
        describe("when the token is invalid", () => {
          it("should return 401 and Unauthorized", (done) => {
             request(api)
            .get("/api/clothes")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res)=>{
              expect(res.status).to.equal(401);
              done();
            });
          });
        });
      });
      describe("GET /clothes/:position", () => {
        describe("when the position is valid", () => {
          it("should return the matching position", () => {
            return request(api)
              .get(`/api/clothes/${currentclothesposition}`)
              .set("Accept", "application/json")
              .set("Authorization", token)
              .expect("Content-Type", /json/)
              .expect(200)
              .then((res) => {
                expect(res.body).to.have.property("title", currentclothesTitle);
              });
          });
        });
        describe("when the position is invalid", () => {
          it("should return the NOT found message", () => {
            return request(api)
              .get("/api/clothes/9999")
              .set("Accept", "application/json")
              .set("Authorization", token)
              .expect("Content-Type", /json/)
              .expect({
                message: "Unable to find clothes with position: 9999.",
                status: 404,
              });
          });
        });
      });

    describe("Delete /clothes/:position",()=>{
      describe("when the clothes exists",()=>{
        it("should return 200 and delete successfully",()=>{
            return request(api)
              .delete(`/api/clothes/${currentclothesposition}`)
              .set("Accept", "application/json")
              .set("Authorization", token)
              .expect(200)
              .expect('delete successfully');
          });
          after(() => {
            return request(api)
              .get(`/api/clothes/${currentclothesposition}`)
              .set("Authorization", token)
              .expect(404)
              .expect({
                message: `Unable to find clothes with position: ${currentclothesposition}.`,
                status: 404,
          });
        });
      })
    });
});
