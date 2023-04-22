import logo from "/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";

type FormValues = {
  loginEmail: string;
  loginPassword: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.loginEmail && values.loginPassword ? values : {},
    errors: !values.loginEmail
      ? {
          loginEmail: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.loginPassword
      ? {
          loginPassword: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit: SubmitHandler<FormValues> = ({ loginEmail, loginPassword }) =>
    console.log(loginEmail, loginPassword);

  return (
    <div className="bg-dark flex flex-col min-h-screen md:p-8">
      <div className="p-8 mb-8">
        <h1 className="text-gray-100 text-3xl font-medium tracking-widest">
          Servicio al cliente
        </h1>
      </div>
      <div className="p-8 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2">
          <h3 className="text-gray-500 uppercase text-sm font-bold mb-2">
            Ingresa a la plataforma
          </h3>
          <h1 className="text-6xl text-white font-medium mb-2">
            Inicia sesión<span className="text-secondary">.</span>
          </h1>
          <span className="text-gray-500 font-medium">
            ¿No eres usuario?
            <a
              onClick={() => navigate("/register")}
              className="text-secondary hover:underline"
            >
              {" "}
              Registrate
            </a>
          </span>
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                type="email"
                {...register("loginEmail", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                autoComplete="off"
                className={`w-full lg:w-4/5 py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group ${
                  errors?.loginEmail && "outline-red-500"
                }`}
                placeholder="Correo electrónico"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                {...register("loginPassword", {
                  required: true,
                })}
                autoComplete="off"
                className={`w-full lg:w-4/5 py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group ${
                  errors?.loginPassword && "outline-red-500"
                }`}
                placeholder="Contraseña"
              />
            </div>
            {/* <div className="justify-center md:justify-end mb-6">
              <a
                href="#"
                className="text-gray-500 font-medium hover:text-gray-300 transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div> */}
            <div className="">
              <button
                className="bg-secondary text-white w-full lg:w-4/5 py-3 px-4 rounded-full hover:bg-tertiary transition-colors"
                type="submit"
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img src={logo} alt="logo" className="w-44 md:w-60" />
        </div>
      </div>
    </div>
  );
};
