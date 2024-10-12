//3
import express from 'express';
import { fetchAssist, fetchPlayer, GetAllPlayerGoal, getAttacker, getCoach, getDefender, getGoalkeepers, getMidfielder } from '../controller/playerController.js';
const route = express.Router();

// route.post("/create", create);
route.get("/getGoalkeepers", getGoalkeepers);
route.get("/getDefenders", getDefender);
route.get("/getMidfielders", getMidfielder);
route.get("/getAttackers", getAttacker);
route.get("/getCoach", getCoach);
route.get("/getPlayers", fetchPlayer); //Get Player Short By Gaols
route.get("/getAssists", fetchAssist); //Get Player Short By Assists
route.get("/getAllPlayers", GetAllPlayerGoal);
// route.put("/update/:id", update);
// route.delete("/delete/:id", deleteUser);
// route.get("/:id",getUserID);

export default route;