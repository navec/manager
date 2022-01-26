import { Router } from "express";

export type IRoute = { path: string; type: string; callback: Router };
