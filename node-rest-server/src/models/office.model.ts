import mongoose, {Schema} from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface OfficeInput {
    user: UserDocument["_id"];
    name: string;
    hexcolor: string;
    email: string;
    capacity: number;
    phone: string;
    address: string;
}

export interface OfficeDocument extends OfficeInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const OfficeSchema = new mongoose.Schema(
    {
        officeId: {
            type: String,
            required: true,
            unique: true,
            default: () => `office_${nanoid()}`,
        },
        userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String, required: true },
        hexcolor: { type: String, required: true },
        email: { type: String, required: true },
        capacity: { type: Number, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const OfficeModel = mongoose.model<OfficeDocument>("Office", OfficeSchema);

export default OfficeModel;