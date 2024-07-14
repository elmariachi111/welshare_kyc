// Next14 adapted version of https://github.com/family/connectkit/blob/main/packages/connectkit-next-siwe/src/configureSIWE.tsx
import type { IncomingMessage, ServerResponse } from "http";
import {
  getIronSession,
  IronSession,
  SessionOptions as IronSessionOptions,
} from "iron-session";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

import {
  Chain,
  Transport,
  PublicClient,
  createPublicClient,
  http,
  Hex,
} from "viem";
import * as allChains from "viem/chains";

import { generateSiweNonce, parseSiweMessage } from "viem/siwe";

type NextApiHandler<T = any> = (
  req: NextRequest
) => NextResponse | Promise<NextResponse>;

type RouteHandlerOptions = {
  afterNonce?: (
    req: NextRequest,
    session: NextSIWESession<{}>
  ) => Promise<void>;
  afterVerify?: (
    req: NextRequest,
    session: NextSIWESession<{}>
  ) => Promise<void>;
  afterSession?: (
    req: NextRequest,
    session: NextSIWESession<{}>
  ) => Promise<void>;
  afterLogout?: (req: NextRequest) => Promise<void>;
};

type NextServerSIWEConfig = {
  config?: {
    chains: readonly [Chain, ...Chain[]];
    transports?: Record<number, Transport>;
  };
  session?: Partial<IronSessionOptions>;
  options?: RouteHandlerOptions;
};

type NextSIWESession<TSessionData extends Object = {}> = IronSession<any> &
  TSessionData & {
    nonce?: string;
    address?: string;
    chainId?: number;
  };

type ConfigureServerSIWEResult<TSessionData extends Object = {}> = {
  apiRouteHandler: NextApiHandler;
  getSession: () => Promise<NextSIWESession<TSessionData>>;
};

export const getSession = async <TSessionData extends Object = {}>(
  sessionConfig: IronSessionOptions
) => {
  const session = (await getIronSession(
    cookies(),
    sessionConfig
  )) as NextSIWESession<TSessionData>;

  return session;
};

const envVar = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
};

const logoutRoute = async (
  req: NextRequest,
  sessionConfig: IronSessionOptions,
  afterCallback?: RouteHandlerOptions["afterLogout"]
) => {
  switch (req.method) {
    case "GET":
      const session = await getSession(sessionConfig);
      session.destroy();
      if (afterCallback) {
        await afterCallback(req);
      }
      return new NextResponse(null, { status: 200 });
      break;
    default:
      return new NextResponse(`Method ${req.method} Not Allowed`, {
        status: 405,
        headers: {
          Allow: "GET",
        },
      });
  }
};

const nonceRoute = async (
  req: NextRequest,
  sessionConfig: IronSessionOptions,
  afterCallback?: RouteHandlerOptions["afterNonce"]
) => {
  switch (req.method) {
    case "GET":
      const session = await getSession(sessionConfig);
      if (!session.nonce) {
        session.nonce = generateSiweNonce();
        await session.save();
      }
      if (afterCallback) {
        await afterCallback(req, session);
      }
      return new NextResponse(session.nonce, { status: 200 });
      break;
    default:
      return new NextResponse(`Method ${req.method} Not Allowed`, {
        status: 405,
        headers: {
          Allow: "GET",
        },
      });
  }
};

const sessionRoute = async (
  req: NextRequest,
  sessionConfig: IronSessionOptions,
  afterCallback?: RouteHandlerOptions["afterSession"]
) => {
  switch (req.method) {
    case "GET":
      const session = await getSession(sessionConfig);
      if (afterCallback) {
        await afterCallback(req, session);
      }
      const { address, chainId } = session;
      return NextResponse.json({ address, chainId });
      break;
    default:
      return new NextResponse(`Method ${req.method} Not Allowed`, {
        status: 405,
        headers: {
          Allow: "GET",
        },
      });
  }
};

const verifyRoute = async (
  req: NextRequest,
  sessionConfig: IronSessionOptions,
  config?: NextServerSIWEConfig["config"],
  afterCallback?: RouteHandlerOptions["afterVerify"]
) => {
  switch (req.method) {
    case "POST":
      try {
        const session = await getSession(sessionConfig);

        const { message, signature } = (await req.json()) as {
          message: string;
          signature: Hex;
        };

        const parsed = parseSiweMessage(message);
        if (parsed.nonce !== session.nonce) {
          return new NextResponse(`Invalid nonce.`, {
            status: 422,
          });
        }

        let chain = config?.chains
          ? Object.values(config.chains).find((c) => c.id === parsed.chainId)
          : undefined;
        if (!chain) {
          // Try to find chain from allChains if not found in user-provided chains
          chain = Object.values(allChains).find((c) => c.id === parsed.chainId);
        }
        if (!chain) {
          throw new Error("Chain not found.");
        }

        const publicClient: PublicClient = createPublicClient({
          chain,
          transport: http(),
        });

        const verified = await publicClient.verifySiweMessage({
          message,
          signature,
          nonce: session.nonce,
        });
        if (!verified) {
          return new NextResponse(`Unable to verify signature.`, {
            status: 422,
          });
        }

        session.address = parsed.address;
        session.chainId = parsed.chainId;
        await session.save();
        if (afterCallback) {
          await afterCallback(req, session);
        }
        return new NextResponse(null, {
          status: 200,
        });
      } catch (error) {
        return new NextResponse(String(error), {
          status: 400,
        });
      }
      break;
    default:
      return new NextResponse(`Method ${req.method} Not Allowed`, {
        status: 405,
        headers: {
          Allow: "POST",
        },
      });
  }
};

export const configureServerSideSIWE = <TSessionData extends Object = {}>({
  config,
  session: { cookieName, password, cookieOptions, ...otherSessionOptions } = {},
  options: { afterNonce, afterVerify, afterSession, afterLogout } = {},
}: NextServerSIWEConfig): ConfigureServerSIWEResult<TSessionData> => {
  const sessionConfig: IronSessionOptions = {
    cookieName: cookieName ?? "connectkit-next-siwe",
    password: password ?? envVar("SESSION_SECRET"),
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
      ...(cookieOptions ?? {}),
    },
    ...otherSessionOptions,
  };

  const apiRouteHandler: NextApiHandler = async (req: NextRequest) => {
    const pathSplit = req.nextUrl.pathname.split("/");
    const route = pathSplit[pathSplit.length - 1];

    switch (route) {
      case "nonce":
        return nonceRoute(req, sessionConfig, afterNonce);
      case "verify":
        return verifyRoute(req, sessionConfig, config, afterVerify);
      case "session":
        return sessionRoute(req, sessionConfig, afterSession);
      case "logout":
        return logoutRoute(req, sessionConfig, afterLogout);
      default:
        return new NextResponse(`Not found`, {
          status: 404,
        });
    }
  };

  return {
    apiRouteHandler,
    getSession: async () => await getSession<TSessionData>(sessionConfig),
  };
};
