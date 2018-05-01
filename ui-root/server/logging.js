
import Bunyan from "bunyan"
import BFormat from "bunyan-format"

export const DefaultLogger = Bunyan.createLogger({
    name: "prismatica-rootui.server",
    stream: new BFormat({outputMode: "long", levelInString: true}),
});
