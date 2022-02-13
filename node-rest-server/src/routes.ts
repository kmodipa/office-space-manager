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
        "/api/offices",
        [requireUser, validateResource(createOfficeSchema)],
        createOfficeHandler
    );

    app.put(
        "/api/offices/:officeId",
        [requireUser, validateResource(updateOfficeSchema)],
        updateOfficeHandler
    );

    app.get(
        "/api/offices/:officeId",
        validateResource(getOfficeSchema),
        getOfficeHandler
    );

    app.get(
        "/api/offices",
        requireUser,
        getOfficesHandler
    );

    app.delete(
        "/api/offices/:officeId",
        [requireUser, validateResource(deleteOfficeSchema)],
        deleteOfficeHandler
    );
}

export default routes