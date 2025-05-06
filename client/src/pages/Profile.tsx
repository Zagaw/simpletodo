import { z } from "zod";
import { profileUpdateSchema } from "../schema/profileUpdate";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useProfileUpdateMutation } from "../slices/userApi";
import { toast } from "react-toastify";
import { setUserInfo } from "../slices/auths";

type FormInputs = z.infer<typeof profileUpdateSchema>;

function Profile() {

    const userInfo = useSelector((state: RootState) => state.auth.userInfo);
    const [profileUpdate, {isLoading}] = useProfileUpdateMutation();
    const dispatch = useDispatch();

    const {register, handleSubmit, formState: {errors, isSubmitting}} = useForm<FormInputs>({
        resolver: zodResolver(profileUpdateSchema),
        defaultValues: {
            name: userInfo?.name,
            email: userInfo?.email,
            password: "",
        },
    })

    const submit : SubmitHandler<FormInputs> = async (data) => {
        try {
            const res = await profileUpdate(data);
            dispatch(setUserInfo(res.data));
            toast.success("User profile updated.")
        } catch (error : any) {
            toast.error(error?.data.message || error.error);
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-20">
            <h2 className="text-3xl font-bold mb-2">Profile</h2>
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
                <button type="submit" className="text-white bg-black border py-2 px-4" disabled={isSubmitting || isLoading}>Update Profile</button>
            </form>
        </div>
    )
}

export default Profile;