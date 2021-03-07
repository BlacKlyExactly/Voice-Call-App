import Chat from "../components/Chat";

describe("Chat component", () => {
    it("renders", () => {
        const { getByTestId } = render(<Chat />)
        expect(getByTestId("chat")).toBeInTheDocument();
    })S
})