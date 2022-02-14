import { Request, Response } from "express";
import {
    createOfficeWorker, deleteOfficeWorker,
    findAndUpdateOfficeWorker,
    findOfficeWorker,
    findOfficeWorkers
} from "../services/officeWorker.service";
import {
    CreateOfficeWorkerInput,
    DeleteOfficeWorkerInput,
    ReadOfficeWorkerInput, ReadOfficeWorkersInput,
    UpdateOfficeWorkerInput
} from "../schemas/officeWorker.schema";
import officeWorkerModel, {OfficeWorkerDocument} from "../models/officeWorker.model";


export async function createOfficeWorkerHandler(
    req: Request<{}, {}, CreateOfficeWorkerInput["body"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const body = req.body;

    console.log(userId);
    const officeWorker = await createOfficeWorker({ ...body});

    return res.send(officeWorker);
}

export async function updateOfficeWorkerHandler(
    req: Request<UpdateOfficeWorkerInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const officeWorkerId = req.params.officeWorkerId;
    const update = req.body;

    const officeWorker = await findOfficeWorker({ officeWorkerId: officeWorkerId });

    if (!officeWorker) {
        return res.sendStatus(404);
    }

    const updatedOffice = await findAndUpdateOfficeWorker({ officeWorkerId: officeWorkerId }, update, {
        new: true,
    });

    return res.send(updatedOffice);
}

export async function getOfficeWorkerHandler(
    req: Request<ReadOfficeWorkerInput["params"]>,
    res: Response
) {
    const officeWorkerId = req.params.officeWorkerId;
    const officeWorker = await findOfficeWorker({ officeWorkerId: officeWorkerId });

    if (!officeWorker) {
        return res.sendStatus(404);
    }

    return res.send(officeWorker);
}

export async function getOfficeWorkersHandler(
    req: Request<ReadOfficeWorkersInput["params"]>,
    res: Response
) {
    const officeId = req.params.officeId;

    const officeWorkers = await findOfficeWorkers({ officeId: officeId});

    return res.send(officeWorkers);
}


export async function deleteOfficeWorkerHandler(
    req: Request<DeleteOfficeWorkerInput["params"]>,
    res: Response
) {
    const officeWorkerId = req.params.officeWorkerId;
    console.log(officeWorkerId);
    const officeWorker = await findOfficeWorker({ officeWorkerId: officeWorkerId });
    console.log(officeWorker);
    if (!officeWorker) {
        return res.sendStatus(404);
    }

    const result = await deleteOfficeWorker({ officeWorkerId: officeWorkerId });

    console.log(result);

    // return res.sendStatus(200);
    return res.send(result);
}