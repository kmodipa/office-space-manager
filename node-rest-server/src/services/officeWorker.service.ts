import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import OfficeWorkerModel, {OfficeWorkerDocument, OfficeWorkerInput} from "../models/officeWorker.model";


export async function createOfficeWorker(input: OfficeWorkerInput) {
    try {
        const result = await OfficeWorkerModel.create(input);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function findOfficeWorker(
    query: FilterQuery<OfficeWorkerDocument>,
    options: QueryOptions = { lean: true }
) {
    try {
        const result = await OfficeWorkerModel.findOne(query, {}, options);
        return result;
    } catch (e) {
        throw e;
    }
}

export async function findOfficeWorkers(query: FilterQuery<OfficeWorkerDocument>) {
    return OfficeWorkerModel.find(query).lean();
}

export async function findOffices(query: FilterQuery<OfficeWorkerDocument>) {
    return OfficeWorkerModel.find(query).lean();
}

export async function findAndUpdateOfficeWorker(
    query: FilterQuery<OfficeWorkerDocument>,
    update: UpdateQuery<OfficeWorkerDocument>,
    options: QueryOptions
) {
    return OfficeWorkerModel.findOneAndUpdate(query, update, options);
}

export async function deleteOfficeWorker(query: FilterQuery<OfficeWorkerDocument>) {
    return OfficeWorkerModel.deleteOne(query);
}
