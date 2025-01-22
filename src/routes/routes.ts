import { Request, Response, Router } from "express";
import { defaultController } from "../controllers/controller";
import { authToken } from "../middlewares/auth";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const httpProblem = require('httpproblem');

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

router.post("/login", async (req: Request, res: Response) => {
    try {
        const token = await defaultController.genToken(req.body.email, req.body.password);
        res.status(200).json(token);
    } catch (err) {
        if (err instanceof httpProblem.Document) {
            res.status(err.status).json({
              type: err.type,
              title: err.title,
              status: err.status
            });
        } else if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    };
});

router.post("/signup", async (req: Request, res: Response) => {
    try {
        const user = await defaultController.signUp(req.body.email, req.body.password);
        res.status(200).json(user);
    } catch (err) {
        if (err instanceof httpProblem.Document) {
            res.status(err.status).json({
              type: err.type,
              title: err.title,
              status: err.status
            });
        } else if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});

router.put("/update", authToken, (req: Request, res: Response) => {
    try {
        res.send("Update-Endpoint");
    } catch (err) {
        if (err instanceof httpProblem.Document) {
            res.status(err.status).json({
              type: err.type,
              title: err.title,
              status: err.status
            });
        } else if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});

router.delete("/delete", (req: Request, res: Response) => {
    res.send("Delete-Endpoint");
});

export default router;
