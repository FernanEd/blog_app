import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import Layout from "../components/Layout";
import { SERVER_URL } from "../utils/constants";
import { IUser } from "../utils/interfaces";

interface Props {
  logUser: Function;
}

const Loginpage: React.FunctionComponent<Props> = ({ logUser }) => {
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const submitUser = async (form: IUser) => {
    try {
      let res = await fetch(`${SERVER_URL}/signin`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(form),
      });
      let data = await res.json();

      if (data.auth) {
        logUser(data.user, data.token);
        history.push("/admin");
      } else {
        errors.auth = data.message;
      }
    } catch (e) {
      errors.auth = "Something went wrong";
    }
  };

  return (
    <Layout>
      <div className="p-4 border border-dark-100 my-4 rounded-sm max-w-lg mx-auto">
        <h2 className="text-2xl">Log in</h2>
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(submitUser)}
        >
          <div className="flex flex-col gap-2">
            <label>Your username</label>
            <input
              type="text"
              className="w-full rounded-md shadow-md text-dark-300 bg-gray-200 p-1"
              name="username"
              ref={register({ required: true })}
            />
            {errors.username && (
              <p className="text-danger">Please fill this field</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>Your password</label>
            <input
              type="password"
              className="w-full rounded-md shadow-md text-dark-300 bg-gray-200 p-1"
              name="password"
              ref={register({ required: true })}
            />
            {errors.password && (
              <p className="text-danger">Please fill this field</p>
            )}
          </div>
          {errors.auth && <p className="text-danger">{errors.auth}</p>}
          <button className="btn btn-primary">Sign in</button>
        </form>
      </div>
    </Layout>
  );
};

export default Loginpage;
