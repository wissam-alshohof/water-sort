const State = require("./state");

class Main {
    createComponent() {
        document.getElementById('root').innerText = "Hello World!"
    }
    
}
console.log("create ui")
new Main().createComponent();
module.exports = Main;