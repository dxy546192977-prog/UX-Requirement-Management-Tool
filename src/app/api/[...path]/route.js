import { Readable } from "node:stream";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { buildLegacyRouteContext, getCorsHeaders } = require("../../../../lib/server/legacy-context.cjs");
const registerAiDesignRoutes = require("../../../../routes/ai-design");
const registerConfigRoutes = require("../../../../routes/config");
const registerDataRoutes = require("../../../../routes/data");
const registerYuqueRoutes = require("../../../../routes/yuque");

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const routeCtx = buildLegacyRouteContext();
const handleDataRoute = registerDataRoutes(routeCtx);
const handleConfigRoute = registerConfigRoutes(routeCtx);
const handleYuqueRoute = registerYuqueRoutes(routeCtx);
const handleAiDesignRoute = registerAiDesignRoutes(routeCtx);

function createLegacyResponse(request) {
  let status = 200;
  let body = "";
  const headers = new Headers(getCorsHeaders(request.headers.get("origin")));

  return {
    setHeader(name, value) {
      headers.set(name, String(value));
    },
    writeHead(nextStatus, nextHeaders) {
      status = nextStatus;
      if (nextHeaders) {
        Object.entries(nextHeaders).forEach(([name, value]) => {
          headers.set(name, String(value));
        });
      }
    },
    end(payload) {
      body = payload == null ? "" : payload;
    },
    toResponse() {
      return new Response(body, { status, headers });
    }
  };
}

async function createLegacyRequest(request) {
  const method = request.method.toUpperCase();
  const stream = new Readable({ read() {} });
  stream.method = method;
  stream.url = new URL(request.url).pathname + new URL(request.url).search;
  stream.headers = Object.fromEntries(request.headers.entries());

  if (method === "GET" || method === "HEAD") {
    stream.push(null);
    return stream;
  }

  const body = Buffer.from(await request.arrayBuffer());
  stream.push(body);
  stream.push(null);
  return stream;
}

async function dispatch(request, context) {
  const method = request.method.toUpperCase();
  const corsHeaders = getCorsHeaders(request.headers.get("origin"));
  if (method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const params = await Promise.resolve(context.params);
  const pathParts = Array.isArray(params?.path) ? params.path : [];
  const pathname = `/api/${pathParts.join("/")}`;
  const parsedUrl = new URL(request.url);
  const req = await createLegacyRequest(request);
  const res = createLegacyResponse(request);

  if (await handleDataRoute(pathname, method, req, res)) return res.toResponse();
  if (await handleConfigRoute(pathname, method, req, res)) return res.toResponse();
  if (await handleYuqueRoute(pathname, method, req, res, parsedUrl)) return res.toResponse();
  if (await handleAiDesignRoute(pathname, method, req, res)) return res.toResponse();

  return Response.json({ error: "Not found" }, { status: 404, headers: corsHeaders });
}

export function GET(request, context) {
  return dispatch(request, context);
}

export function POST(request, context) {
  return dispatch(request, context);
}

export function OPTIONS(request, context) {
  return dispatch(request, context);
}
