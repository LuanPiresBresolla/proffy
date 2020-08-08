import { Response, Request } from "express";
import { db } from "../database/connection";

class ConnectionsController {
  async create(req: Request, res: Response) {
    const { user_id } = req.body;  

    await db('connections').insert({ user_id });

    return res.status(201).send();
  }

  async index(req: Request, res: Response) {
    const connections = await db('connections').count('* as total');

    const { total } = connections[0];

    return res.json({ total });
  }
}

export default ConnectionsController;