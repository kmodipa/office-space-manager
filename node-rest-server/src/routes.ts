import {Express, Request, Response} from 'express';
import validateResource from "./middleware/validateResource";
import {createUserHandler} from "./controllers/user.controller";
import {createUserSchema} from "./schemas/user.schema";
import {createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler} from "./controllers/session.crotroller";
import {createSessionSchema} from "./schemas/session.schema";
import requireUser from "./middleware/requireUser";
import {
    createOfficeSchema,
    deleteOfficeSchema,
    getOfficeSchema,
    updateOfficeSchema
} from "./schemas/Office.schema";
import {
    createOfficeHandler,
    deleteOfficeHandler,
    getOfficeHandler, getOfficesHandler,
    updateOfficeHandler
} from "./controllers/office.controller";
import {
    createOfficeWorkerSchema,
    deleteOfficeWorkerSchema,
    getOfficeWorkerSchema,
    updateOfficeWorkerSchema
} from "./schemas/officeWorker.schema";
import {
    createOfficeWorkerHandler,
    deleteOfficeWorkerHandler,
    getOfficeWorkerHandler,
    getOfficeWorkersHandler, updateOfficeWorkerHandler
} from "./controllers/officeWorker.controller";

function routes(app: Express) {
    app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

    app.post("/api/users", validateResource(createUserSchema), createUserHandler);

    /* Session EndPoints
    * */
    app.post("/api/sessions", validateResource(createSessionSchema), createUserSessionHandler);

    app.get("/api/sessions", requireUser, getUserSessionsHandler);

    app.delete("/api/sessions", requireUser, deleteSessionHandler);


    /* Office EndPoints
    * */
    app.post(
        "/api/office",
        [requireUser, validateResource(createOfficeSchema)],
        createOfficeHandler
    );

    app.put(
        "/api/office/:officeId",
        [requireUser, validateResource(updateOfficeSchema)],
        updateOfficeHandler
    );

    app.get(
        "/api/office/:officeId",
        validateResource(getOfficeSchema),
        getOfficeHandler
    );

    app.get(
        "/api/offices",
        requireUser,
        getOfficesHandler
    );

    app.delete(
        "/api/office/:officeId",
        [requireUser, validateResource(deleteOfficeSchema)],
        deleteOfficeHandler
    );


    /* OfficeWorker EndPoints
    * */
    app.post(
        "/api/officeWorkers",
        [requireUser, validateResource(createOfficeWorkerSchema)],
        createOfficeWorkerHandler
    );

    app.put(
        "/api/officeWorker/:officeWorkerId",
        [requireUser, validateResource(updateOfficeWorkerSchema)],
        updateOfficeWorkerHandler
    );

    app.get(
        "/api/officeWorker/:officeWorkerId",
        validateResource(getOfficeWorkerSchema),
        getOfficeWorkerHandler
    );

    app.get(
        "/api/officeWorkers/:officeId",
        requireUser,
        getOfficeWorkersHandler
    );

    app.delete(
        "/api/officeWorker/:officeWorkerId/:officeId",
        [requireUser, validateResource(deleteOfficeWorkerSchema)],
        deleteOfficeWorkerHandler
    );
}

export default routes