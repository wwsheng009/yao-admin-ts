// import { Studio } from "yao-node-client";

// Studio("model.Create");
import dotenv from "dotenv";
dotenv.config();
import { Create, CreateFromModelFiles } from "@/app/studio/model";

Create();
// CreateFromModelFiles();
