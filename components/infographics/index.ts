export { PythonFlowInfographic }   from "./python-flow";
export { RustOwnershipInfographic } from "./rust-ownership";
export { GoRoutinesInfographic }    from "./go-concurrency";
export { SysAdminFlowInfographic }  from "./sysadmin-flow";
export { LuaScriptingInfographic }  from "./lua-scripting";

import type { TrackSlug } from "@/lib/constants";

/** Map track slug → which infographic component to show */
export const TRACK_INFOGRAPHIC: Record<TrackSlug, string> = {
  python:   "PythonFlowInfographic",
  sysadmin: "SysAdminFlowInfographic",
  rust:     "RustOwnershipInfographic",
  lua:      "LuaScriptingInfographic",
  go:       "GoRoutinesInfographic",
};
