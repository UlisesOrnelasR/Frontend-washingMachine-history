import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, Resolver } from "react-hook-form";
import logo from "/images/logo.png";
import Swal from "sweetalert2";
import { useAuthStore } from "../../hooks/useAuthStore";

type FormValues = {
  registerName: string;
  registerLastName: string;
  registerEmail: string;
  registerPassword: string;
  registerPassword2: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.registerEmail && values.registerPassword ? values : {},
    errors: !values.registerName
      ? {
          registerName: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.registerLastName
      ? {
          registerLastName: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.registerEmail
      ? {
          registerEmail: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.registerPassword
      ? {
          registerPassword: {
            type: "required",
            message: "This is required.",
          },
        }
      : !values.registerPassword2
      ? {
          registerPassword2: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

export const RegisterPage = () => {
  const navigate = useNavigate();

  const { startRegister } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit: SubmitHandler<FormValues> = ({
    registerEmail,
    registerName,
    registerLastName,
    registerPassword,
    registerPassword2,
  }) => {
    if (registerPassword !== registerPassword2) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    startRegister({
      name: registerName,
      lastName: registerLastName,
      email: registerEmail,
      password: registerPassword,
    });
  };

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
            Regístrate gratis
          </h3>
          <h1 className="text-6xl text-white font-medium mb-2">
            Crea una cuenta<span className="text-secondary">.</span>
          </h1>
          <span className="text-gray-500 font-medium">
            ¿Ya eres usuario?{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-secondary hover:underline"
            >
              Ingresa
            </a>
          </span>
          <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full lg:w-4/5 mb-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <input
                type="text"
                {...register("registerName", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                autoComplete="off"
                className={`w-full lg:w-4/5 py-3 px-4 rounded-xl outline-none bg-black text-gray-100 group ${
                  errors?.registerName && "outline-red-500"
                }`}
                placeholder="Nombre(s)"
              />
              <input
                type="text"
                {...register("registerLastName", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                autoComplete="off"
                className={`w-full lg:w-4/5 py-3 px-4 rounded-xl outline-none bg-black text-gray-100 group ${
                  errors?.registerLastName && "outline-red-500"
                }`}
                placeholder="Apellidos"
              />
            </div>
            <div className=" mb-4">
              <input
                type="email"
                {...register("registerEmail", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                autoComplete="off"
                className={`w-full lg:w-4/5 py-3 px-4 rounded-xl outline-none bg-black text-gray-100 group ${
                  errors?.registerEmail && "outline-red-500"
                }`}
                placeholder="Correo electrónico"
              />
            </div>
            <div className=" mb-4">
              <input
                type="password"
                {...register("registerPassword", {
                  required: true,
                })}
                autoComplete="off"
                className={`w-full lg:w-4/5 py-3 px-4 rounded-xl outline-none bg-[#343434] text-gray-100 group ${
                  errors?.registerPassword && "outline-red-500"
                }`}
                placeholder="Contraseña"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                {...register("registerPassword2", {
                  required: true,
                })}
                autoComplete="off"
                className={`w-full lg:w-4/5 py-3 px-4 rounded-xl outline-none bg-black text-gray-100 group ${
                  errors?.registerPassword2 && "outline-red-500"
                }`}
                placeholder="Confirma tu contraseña"
              />
            </div>
            {/* <div className="max-w-lg flex justify-center md:justify-end mb-6">
            <a
              href="#"
              className="text-gray-500 font-medium hover:text-gray-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div> */}
            <div className="">
              <button
                type="submit"
                className="bg-secondary text-white w-full lg:w-4/5 py-3 px-4 rounded-xl hover:bg-tertiary transition-colors"
              >
                Crear cuenta
              </button>
            </div>
          </form>
        </div>{" "}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <img src={logo} alt="logo" className="w-44 md:w-60" />
        </div>
      </div>
    </div>
  );
};
