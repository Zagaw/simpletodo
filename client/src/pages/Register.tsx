import * as z from "zod";
import { registerSchema } from "../schema/register";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../slices/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FormInputs = z.infer<typeof registerSchema>;

function Register() {

    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<FormInputs>({
        resolver: zodResolver(registerSchema),
    });

    const [Register, {isLoading}] = useRegisterMutation();
    const navigate = useNavigate();

    const submit: SubmitHandler<FormInputs> = async (data) => {
        try {
            await Register(data);
            reset();
            toast.success("Register successful.");
            navigate("/login");
        } catch (error : any) {
            toast.error(error?.data?.message || error.error);
        }
    }

    return(
        <div className="max-w-lg mx-auto mt-20">
            <h2 className="text-3xl font-bold mb-2">Register</h2>
            <form className="flex flex-col space-y-2" onSubmit={handleSubmit(submit)}>
                <div>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="name">Name</label>
                    <input type="text" className="form" {...register("name")}/>
                    {errors.name && (
                        <span className="text-red-600 text-sm font-medium">{errors.name.message}</span>
                    )}
                </div>
                <div>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="email">Email</label>
                    <input type="email" className="form" {...register("email")}/>
                    {errors.email && (
                        <span className="text-red-600 text-sm font-medium">{errors.email.message}</span>
                    )}
                </div>
                <div>
                    <label className="block mb-1 text-sm text-gray-500" htmlFor="password">Password</label>
                    <input type="password" className="form" {...register("password")}/>
                    {errors.password && (
                        <span className="text-red-600 text-sm font-medium">{errors.password.message}</span>
                    )}
                </div>
                <button type="submit" className="text-white bg-black border py-2 px-4" disabled={isSubmitting || isLoading}>Register</button>
            </form>
        </div>
    )
}

export default Register;