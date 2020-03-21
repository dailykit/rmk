import { Input, Button } from "../components";
import { validator } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "EMAIL":
      return {
        ...state,
        email: {
          value: action.payload,
          error: null
        }
      };
    case "PASSWORD":
      return {
        ...state,
        password: {
          value: action.payload,
          error: null
        }
      };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    email: {
      value: "",
      error: null
    },
    password: {
      value: "",
      error: null
    }
  });

  const nextStage = e => {
    e.preventDefault();
    console.log("yes");
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-black"></div>
      <div className="flex-1 relative p-8">
        <div className="h-2 bg-blue absolute inset-x-0 top-0"></div>
        <div className="text-right mb-8">
          Already have an account? <span className="text-blue">LOGIN</span>
        </div>
        <h1 className="text-gray text-4xl font-bold mb-16">Sign Up</h1>
        {/* Stage 1 */}
        <div className="w-3/4">
          <form onSubmit={nextStage}>
            <div className="mb-4">
              <Input
                type="email"
                placeholder="email"
                value={state.email.value}
                onChange={e =>
                  dispatch({ type: "EMAIL", payload: e.target.value })
                }
                required
                validate={true}
              />
              <Input
                type="password"
                placeholder="password"
                value={state.password.value}
                onChange={e =>
                  dispatch({ type: "PASSWORD", payload: e.target.value })
                }
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters."
                required
                validate={true}
              />
            </div>
            <Button>Get Started</Button>
          </form>
        </div>
        {/* Stage 2 */}
      </div>
    </div>
  );
};

export default Home;
