import { Request, Response } from "express";
import {
    CreateOfficeInput,
    UpdateOfficeInput
} from "../schemas/Office.schema";
import {
    createOffice,
    deleteOffice,
    findAndUpdateOffice,
    findOffice, findOffices,
} from "../services/office.service";
import {findSessions} from "../services/session.service";

export async function createOfficeHandler(
    req: Request<{}, {}, CreateOfficeInput["body"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const body = req.body;

    const product = await createOffice({ ...body, userid: userId });

    return res.send(product);
}

export async function updateOfficeHandler(
    req: Request<UpdateOfficeInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;

    const officeId = req.params.officeId;
    const update = req.body;

    const office = await findOffice({ officeId: officeId });

    if (!office) {
        return res.sendStatus(404);
    }

    if (String(office.userid) !== userId) {
        return res.sendStatus(403);
    }

    const updatedOffice = await findAndUpdateOffice({ officeId: officeId }, update, {
        new: true,
    });

    return res.send(updatedOffice);
}

export async function getOfficeHandler(
    req: Request<UpdateOfficeInput["params"]>,
    res: Response
) {
    const officeId = req.params.officeId;
    const office = await findOffice({ productId: officeId });

    if (!office) {
        return res.sendStatus(404);
    }

    return res.send(office);
}

export async function getOfficesHandler(
    req: Request,
    res: Response
) {
    const userId = res.locals.user._id;

    const offices = await findOffices({ user: userId});

    return res.send(offices);
}


export async function deleteOfficeHandler(
    req: Request<UpdateOfficeInput["params"]>,
    res: Response
) {
    const userId = res.locals.user._id;
    const officeId = req.params.officeId;

    const office = await findOffice({ officeId: officeId });

    if (!office) {
        return res.sendStatus(404);
    }

    if (String(office.userid) !== userId) {
        return res.sendStatus(403);
    }

    await deleteOffice({ officeId: officeId });

    return res.sendStatus(200);
}