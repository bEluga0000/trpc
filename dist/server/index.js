"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const trpc_1 = require("./trpc");
const zod_1 = require("zod");
const standalone_1 = require("@trpc/server/adapters/standalone");
const createTodoInputSchema = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string()
});
const signUpSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
const appRouter = (0, trpc_1.router)({
    createTodo: trpc_1.publicProcedure
        .input(createTodoInputSchema)
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const title = opts.input.title;
        const desc = opts.input.description;
        // db operation is going to be done here
        return { id: "1" };
    })),
    getTodo: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.string() }))
        .query((opts) => __awaiter(void 0, void 0, void 0, function* () {
        const id = opts.input.id;
        // db operation
        console.log(opts.ctx.userId);
        return { id: "1", title: "good", description: "Nicely done" };
    })),
    signUp: trpc_1.publicProcedure
        .input(signUpSchema)
        .mutation((opts) => __awaiter(void 0, void 0, void 0, function* () {
        // db stuff and generate token
        return { token: "exxxxhghghththdhdksjgkjkt" };
    }))
});
const server = (0, standalone_1.createHTTPServer)({
    router: appRouter,
    createContext(opts) {
        let authHeader = opts.req.headers["Authorization"];
        console.log(authHeader);
        return { userId: "123" };
    }
});
server.listen(3000);
