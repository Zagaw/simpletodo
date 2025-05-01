import * as z from "zod";
import { loginSchema } from "../schema/login";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormInputs = z.infer<typeof loginSchema>;

function Login() {

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormInputs>({
        resolver: zodResolver(loginSchema),
    })

    const submit : SubmitHandler<FormInputs> = (data) => {
        console.log(data);
    }

    return (
        <div className="max-w-lg mx-auto mt-20">
            <h2 className="text-3xl font-bold mb-2">Login</h2>
            <form className="flex flex-col space-y-2" onSubmit={handleSubmit(submit)}>
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
                <button type="submit" className="text-white bg-black border py-2 px-4" disabled={isSubmitting}>Login</button>
            </form>
        </div>
    )
}

export default Login;