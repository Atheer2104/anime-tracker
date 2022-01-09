import { Request, Response} from "express";

export const setCookie = async (req: Request, res: Response) => {
    req.session.jwt = "1234";

    res.send("Cookie has been sent");
}

export const getCookie = async (req: Request, res: Response) => {

    res.send(req.session.jwt);
}