import { createServer as createFrontendServer } from "./frontend-server.js";
import { createServer as createBackendServer } from "./backend-server.js";

const frontendServer = await createFrontendServer({});
const backendServer = await createBackendServer({});

await frontendServer.listen(5173);
await backendServer.listen(8000);
