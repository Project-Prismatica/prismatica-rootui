
import Bunyan from "bunyan"

import { DefaultLogger } from "./logging";

export const applyStartupSettings = function() {
    DefaultLogger.level(Bunyan.DEBUG);
};
