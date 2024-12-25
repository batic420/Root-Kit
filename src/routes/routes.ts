import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

router.get("/login", (req: Request, res: Response) => {
    res.send("Login");
});

export default router;
