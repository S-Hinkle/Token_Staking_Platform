// Import the necessary modules
import express from 'express';
import { promises as fs } from 'fs';
import dotenv from "dotenv";
import cors from 'cors';
import fetch from 'node-fetch';
import pkg from 'pg';
const { Pool } = pkg;

// Congif to use env variables
dotenv.config();


