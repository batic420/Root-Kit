import { Request, Response, Router } from "express";
import { defaultController } from "../controllers/controller";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

router.get("/login", (req: Request, res: Response) => {
    res.send("Login");
});

router.post("/signup", (req: Request, res: Response) => {
    try {
        const user = defaultController.signUp(req, res);
        res.send(200).json(user);
    } catch (err: unknown) {
        console.log(err);
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});

router.put("/update", (req: Request, res: Response) => {
    res.send("Update-Endpoint");
});

router.delete("/delete", (req: Request, res: Response) => {
    res.send("Delete-Endpoint");
});

export default router;
