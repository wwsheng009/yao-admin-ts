// import { Studio } from "yao-node-client";

// import dotenv from "dotenv";
// dotenv.config();

// create dsls from data model dsl files
import { CreateFromFile, CreateFromDB } from "@/app/studio/model/cmd";

// CreateFromDB();
CreateFromFile();
// CreateMenuFromFile();

import { LoadModelFromFile } from "@/app/studio/ddic/loader";

import { GenerateModelFile } from "@/app/studio/ddic/generator";

import { CreateMenuFromModels } from "@/app/studio/model/model";
// CreateMenuFromModels();
// GenerateModelFile(14);

// load model data to database
//yao studio run ddic.loader.LoadModelFromFile
// LoadModelFromFile();

// create ts type from models
// import { CreateModelTypes } from "@/app/studio/model/ts";
// CreateModelTypes();

// import { CreateList } from "@/app/studio/model/cmd";
// CreateList("ddic.model.relation");

import { onChange } from "@/app/scripts/ddic/xgen/element";

// onChange({ key: "type", value: "string" });
