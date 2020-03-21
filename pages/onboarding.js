import { Input, Button } from "../components";
import { validator } from "../utils";

const reducer = (state, action) => {
  switch (action.type) {
    case "EMAIL":
      return {
        ...state,
        email: {
          value: action.payload,
          error: validator("EMAIL", action.payload)
        }
      };
    case "PASSWORD":
      return {
        ...state,
        password: {
          value: action.payload,
          error: validator("PASSWORD", action.payload)
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
          <div className="mb-4">
            <Input
              type="text"
              placeholder="email"
              value={state.email.value}
              error={state.email.error}
              onChange={e =>
                dispatch({ type: "EMAIL", payload: e.target.value })
              }
            />
            <Input
              type="password"
              placeholder="password"
              value={state.password.value}
              error={state.password.error}
              onChange={e =>
                dispatch({ type: "PASSWORD", payload: e.target.value })
              }
            />
          </div>
          <Button>Get Started</Button>
        </div>
        {/* Stage 2 */}
      </div>
    </div>
  );
};

export default Home;
