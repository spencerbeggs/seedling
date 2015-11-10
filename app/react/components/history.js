import { createHistory, useBasename } from "history";

const history = global.theHistory = useBasename(createHistory)({
	basename: "/react"
});

export default history;
