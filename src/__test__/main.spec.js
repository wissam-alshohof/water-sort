const Main = require('../engine/main');

describe("test Main class", () => { 
    it("should create Main instance", () => {
        const main = new Main();
        expect(main).toBeTruthy();
    });
})