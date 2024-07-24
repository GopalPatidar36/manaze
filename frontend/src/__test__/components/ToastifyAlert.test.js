import ToastifyAlert from "../../components/ToastifyAlert";
import { render } from "../../testUtils";

describe("Testing with ToastifyAlert data", () => {
  let components;
  beforeEach(async () => {
    components = render(<ToastifyAlert />);
  });

  it("should match dom snapshot:-ToastifyAlert", () => {
    expect(components.asFragment()).toMatchSnapshot();
  });
});
