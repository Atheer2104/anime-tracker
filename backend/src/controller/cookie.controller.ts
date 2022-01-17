import { Request, Response} from "express";

export const setCookie = async (req: Request, res: Response) => {
    console.info("setCookie");
    
    req.session.jwt = String(1234);

    console.info("cookie has been set");

    res.send("Cookie has been sent");
}

export const getCookie = async (req: Request, res: Response) => {

    res.send(req.session.accessToken);
}