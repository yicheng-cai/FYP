import chai from "chai";
import request from "supertest";
import api from "../../../../index";  // Express API application 

const expect = chai.expect;
const currentproductposition = 1 ;
const currentproductTitle = "SanDisk Ultra New 32GB micro SD SDHC Class10 Flash Memory Card 100MB/s";
let token;

describe('Products endpoint',  function (){
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
          it("should check token and return the 20 products", (done) => {
            request(api)
            .get("/api/products")
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.equal(20);
              done();
            });
          });
        });
        describe("when the token is invalid", () => {
          it("should return 401 and Unauthorized", (done) => {
             request(api)
            .get("/api/products")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res)=>{
              expect(res.status).to.equal(401);
              done();
            });
          });
        });
      });
      describe("GET /products/:position", () => {
        describe("when the position is valid", () => {
          it("should return the matching position", () => {
            return request(api)
              .get(`/api/products/${currentproductposition}`)
              .set("Accept", "application/json")
              .set("Authorization", token)
              .expect("Content-Type", /json/)
              .expect(200)
              .then((res) => {
                expect(res.body).to.have.property("title", currentproductTitle);
              });
          });
        });
        describe("when the position is invalid", () => {
          it("should return the NOT found message", () => {
            return request(api)
              .get("/api/products/9999")
              .set("Accept", "application/json")
              .set("Authorization", token)
              .expect("Content-Type", /json/)
              .expect({
                message: "Unable to find product with position: 9999.",
                status: 404,
              });
          });
        });
      });

    describe("Delete /products/:position",()=>{
      describe("when the products exists",()=>{
        it("should return 200 and delete successfully",()=>{
            return request(api)
              .delete(`/api/products/${currentproductposition}`)
              .set("Accept", "application/json")
              .set("Authorization", token)
              .expect(200)
              .expect('delete successfully');
          });
          after(() => {
            return request(api)
              .get(`/api/products/${currentproductposition}`)
              .set("Authorization", token)
              .expect(404)
              .expect({
                message: `Unable to find product with position: ${currentproductposition}.`,
                status: 404,
          });
        });
      })
    });
});
