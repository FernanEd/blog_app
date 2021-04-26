import { useForm } from "react-hook-form";
import Layout from "../components/Layout";

interface Props {}

const Loginpage: React.FunctionComponent<Props> = ({}) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Layout>
      <div className="p-4 border border-dark-100 my-4 rounded-sm max-w-lg mx-auto">
        <h2 className="text-2xl">Log in</h2>
        <form
          action=""
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((form) => console.log(form))}
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
          <button className="btn btn-primary">Sign in</button>
        </form>
      </div>
    </Layout>
  );
};

export default Loginpage;
