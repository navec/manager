import { Router } from "express";

export interface IModule {
  get routes(): Router[];
}
