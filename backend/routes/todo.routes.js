import express from "express"

const router=express.Router();

import {getAllTodos,getSingleTodo,createTodo,deleteTodo,updateTodo} from "..//controllers/todo.controller.js"

import protectRoutes from "../middlewares/protectRoutes.js";

router.use(protectRoutes)
router.get("/", getAllTodos )
router.get("/:id",getSingleTodo)
router.post("/", createTodo)
router.delete("/:id", deleteTodo)
router.patch("/:id", updateTodo)

export default router