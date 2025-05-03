import * as z from "zod";
import { loginSchema } from "../schema/login";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../slices/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../slices/auths";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import { useEffect } from "react";


type FormInputs = z.infer<typeof loginSchema>;

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm<FormInputs>({
        resolver: zodResolver(loginSchema),
    });

    const [Login, { isLoading }] = useLoginMutation();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo );

    const submit : SubmitHandler<FormInputs> = async (data) => {
        try {
            const res = await Login(data).unwrap();
            dispatch(setUserInfo(res));  
            reset();
            navigate("/");
        } catch (err : any) {
            toast.error(err?.data?.message || err.error);
        }
    }

    useEffect(() => {
        if(userInfo){
            navigate("/");
        }
    },[navigate, userInfo]);

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
                <button type="submit" className="text-white bg-black border py-2 px-4" disabled={isSubmitting || isLoading}>Login</button>
            </form>
        </div>
    )
}

export default Login;