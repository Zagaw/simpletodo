import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        let DB_CONNECTION_STRING = "";
        if(process.env.NODE_ENV === "development"){
            DB_CONNECTION_STRING = process.env.MONGODB_LOCAL_URL!;
        }

        if(process.env.NODE_ENV === "Production"){
            DB_CONNECTION_STRING = process.env.MONGODB_URL!;
        }

        const dbResponse = await mongoose.connect(DB_CONNECTION_STRING);
        console.log("DB connected successfully.", dbResponse.connection.host);
    } catch (error) {
        console.log("DB connection error : ", error)
        process.exit(1);
    }
}