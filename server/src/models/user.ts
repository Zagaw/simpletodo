import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    matchPassword(enteredPassword : string) : Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required : true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.matchPassword = async function(enteredPassword : string) {
    return bcrypt.compare(enteredPassword, this.password);
}

export const User = mongoose.model<IUser>("User", userSchema);