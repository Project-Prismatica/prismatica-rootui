
import { createLogger, stdSerializers } from "browser-bunyan"
import { ConsoleFormattedStream } from "@browser-bunyan/console-formatted-stream"

export const DefaultLogger = createLogger({
    name: "prismatica-rootui.browser",
    serializers: stdSerializers,
    stream: new ConsoleFormattedStream()
});
