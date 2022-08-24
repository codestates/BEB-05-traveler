const dotenv = require("dotenv");
dotenv.config();
const { describe, it } = require("mocha");
const { info } = require("./user.controller");

describe("jwt test", function () {
    it("test", async function () {
        const token =
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjEyMzI3MjksImV4cCI6MTY2MTIzMzMyOX0.pLJ7sD-4Z9TnVrXJiS-SEfqNv_xJaC77DCsPzOM0AU8";

        const res = await info({ headers: { authorization: token } });
    });
});
