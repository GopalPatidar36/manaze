import Sidebar from "../components/Sidebar";
import { render } from "../testUtils";

describe("Testing with Sidebar data", () => {
  let components;
  beforeEach(async () => {
    components = render(<Sidebar />);
  });

  it("should match dom snapshot:-Sidebar", () => {
    expect(components.asFragment()).toMatchSnapshot();
  });
});
