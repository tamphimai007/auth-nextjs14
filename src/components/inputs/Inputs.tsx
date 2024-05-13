//tsrsfc
import * as React from "react";
import { CiCircleAlert } from "react-icons/ci";
import { ImEye, ImEyeBlocked } from "react-icons/im";

interface IInputsProps {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  register: any;
  error: any;
  disable: any;
}

const Inputs: React.FunctionComponent<IInputsProps> = (props) => {
  const [showpassword, setShowpassword] = React.useState(false);
  const { name, label, type, placeholder, register, error, disable } = props;

  return (
    <>
      <div className="mt-3 w-[100%]">
        <label htmlFor={name}>{label}</label>
        <div className="relative">
          <input
            className="w-full border py-2 pr-5 pl-8"
            name={name}
            type={showpassword ? "text" : type}
            placeholder={placeholder}
            {...register(name)}
            style={{ borderColor: `${error ? "#ED4337" : ""}` }}
          />
          {/* Show password */}
          {(name === "password" || name === "ConPassword") && (
            <div
              className="absolute top-3 right-3 cursor-pointer"
              style={{ right: `${error ? "2rem" : ""}` }}
              onClick={() => setShowpassword((prev) => !prev)}
            >
              {showpassword ? <ImEye /> : <ImEyeBlocked />}
            </div>
          )}

          {error && (
            <div className="fill-red-500 absolute right-2 top-2 text-xl">
              <CiCircleAlert fill="red" />
            </div>
          )}
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Inputs;
