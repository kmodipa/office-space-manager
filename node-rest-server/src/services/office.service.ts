import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import OfficeModel, {OfficeDocument, OfficeInput} from "../models/office.model";


export async function createOffice(input: OfficeInput) {
    try {
        const result = await OfficeModel.create(input);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function findOffice(
    query: FilterQuery<OfficeDocument>,
    options: QueryOptions = { lean: true }
) {
    try {
        const result = await OfficeModel.findOne(query, {}, options);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function findOffices() {
    return OfficeModel.find({}).lean();
}

export async function findAndUpdateOffice(
    query: FilterQuery<OfficeDocument>,
    update: UpdateQuery<OfficeDocument>,
    options: QueryOptions
) {
    return OfficeModel.findOneAndUpdate(query, update, options);
}

export async function deleteOffice(query: FilterQuery<OfficeDocument>) {
    return OfficeModel.deleteOne(query);
}
