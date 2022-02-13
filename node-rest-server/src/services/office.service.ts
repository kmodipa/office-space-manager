import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import OfficeModel, {OfficeDocument, OfficeInput} from "../models/office.model";
import {createOfficeSchema} from "../schemas/Office.schema";
import SessionModel, {SessionDocument} from "../models/session.model";


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

export async function findOffices(query: FilterQuery<OfficeDocument>) {
    return OfficeModel.find(query).lean();
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
