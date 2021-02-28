import chai from "chai";
import request from "supertest";
import api from "../../../../index";  // Express API application 

const expect = chai.expect;
const currentfoodposition = 1 ;
const currentfoodTitle = "Freeze Dried Fully Cooked Scrambled US Eggs Camping Hiking Survival Storage Food";
let token;

describe('Foods endpoint',  function (){
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
    describe("GET /products ", () => {
      describe("when the token is valid", () => {
          it("should check token and return the 10 foods", (done) => {
            request(api)
            .get("/api/foods")
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
      });
      describe("GET /foods/:position", () => {
        describe("when the position is valid", () => {
          it("should return the matching position", () => {
            return request(api)
              .get(`/api/foods/${currentfoodposition}`)
              .set("Accept", "application/json")
              .set("Authorization", token)
              .expect("Content-Type", /json/)
              .expect(200)
              .then((res) => {
                expect(res.body).to.have.property("title", currentfoodTitle);
              });
          });
        });
        describe("when the position is invalid", () => {
          it("should return the NOT found message", () => {
            return request(api)
              .get("/api/foods/9999")
              .set("Accept", "application/json")
              .set("Authorization", token)
              .expect("Content-Type", /json/)
              .expect({
                message: "Unable to find food with position: 9999.",
                status: 404,
              });
          });
        });
      });

    describe("Delete /foods/:position",()=>{
      describe("when the foods exists",()=>{
        it("should return 200 and delete successfully",()=>{
            return request(api)
              .delete(`/api/foods/${currentfoodposition}`)
              .set("Accept", "application/json")
              .set("Authorization", token)
              .expect(200)
              .expect('delete successfully');
          });
          after(() => {
            return request(api)
              .get(`/api/foods/${currentfoodposition}`)
              .set("Authorization", token)
              .expect(404)
              .expect({
                message: `Unable to find food with position: ${currentfoodposition}.`,
                status: 404,
          });
        });
      })
    });
});
