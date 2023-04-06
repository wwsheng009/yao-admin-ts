// import { Studio } from "yao-node-client";

// import dotenv from "dotenv";
// dotenv.config();

// create dsls from data model dsl files
import { CreateMenuFromFile, CreateFromFile } from "@/app/studio/model/cmd";

CreateFromFile();
// CreateMenuFromFile();

import { LoadModelFromFile } from "@/app/studio/ddic/loader";

// load model data to database
//yao studio run ddic.loader.LoadModelFromFile
// LoadModelFromFile();

// create ts type from models
// import { CreateModelTypes } from "@/app/studio/model/ts";
// CreateModelTypes();

// import { CreateList } from "@/app/studio/model/cmd";
// CreateList("ddic.model.relation");
