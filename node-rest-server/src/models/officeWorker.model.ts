import mongoose, {Schema} from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789", 10);

export interface OfficeWorkerInput {
    officeId: string;
    firstName: string;
    lastName: string;
    avatarUrl: string;
}

export interface OfficeWorkerDocument extends OfficeWorkerInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const OfficeWorkerSchema = new mongoose.Schema(
    {
        officeWorkerId: {
            type: String,
            required: true,
            unique: true,
            default: () => `officeWorker_${nanoid()}`,
        },
        officeId: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        avatarUrl: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

const OfficeWorkerModel = mongoose.model<OfficeWorkerDocument>("OfficeWorker", OfficeWorkerSchema);

export default OfficeWorkerModel;