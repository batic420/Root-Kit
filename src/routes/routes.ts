import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

router.get("/login", (req: Request, res: Response) => {
    res.send("Login");
});

router.post("/create", (req: Request, res: Response) => {
    res.send("Create-Endpoint");
});

router.put("/update", (req: Request, res: Response) => {
    res.send("Update-Endpoint");
});

router.delete("/delete", (req: Request, res: Response) => {
    res.send("Delete-Endpoint");
});

export default router;
