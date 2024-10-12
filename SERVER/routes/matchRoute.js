import express from 'express';
import {getMatchHistories} from '../controller/matchController.js';

const matchRoute = express.Router();

matchRoute.get("/getMatchHistories", getMatchHistories);

export default matchRoute;