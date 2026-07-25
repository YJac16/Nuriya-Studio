import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

const configuredProjectId = projectId || "placeholder";

export default defineConfig({
  name: "nuriya-studio",
  title: "Nuriya Studio",
  projectId: configuredProjectId,
  dataset,
  basePath: "/studio",
  schema: {
    types: schemaTypes,
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
