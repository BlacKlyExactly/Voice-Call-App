import App from "../App";
import ReactDOM from "react-dom";

describe("App component", () => {
    it("renders", () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    })
})