import { publicProcedure, router } from './trpc';
import {z} from "zod";
import { createHTTPServer } from '@trpc/server/adapters/standalone';

const createTodoInputSchema = z.object({
    title : z.string(),
    description : z.string()
})
const signUpSchema = z.object({
    email:z.string().email(),
    password:z.string()
})
const appRouter = router({
    createTodo:publicProcedure
    .input(createTodoInputSchema)
    .mutation(async (opts)=>{
        const title = opts.input.title
        const desc = opts.input.description
        // db operation is going to be done here
        return {id:"1"}
    }),
    getTodo:publicProcedure
    .input(z.object({id:z.string()}))
    .query(async (opts)=>{
        const id = opts.input.id
        // db operation
        console.log(opts.ctx.userId)
        return {id:"1",title:"good",description:"Nicely done"}
    }),
    signUp:publicProcedure
        .input(signUpSchema)
        .mutation(async (opts)=>{
            // db stuff and generate token
            return {token:"exxxxhghghththdhdksjgkjkt"}
        })
});

export type AppRouter = typeof appRouter;
const server = createHTTPServer({
    router: appRouter,
    createContext(opts){
        let authHeader = opts.req.headers["Authorization"]
        console.log(authHeader)
        return {userId:"123"}
    }
});

server.listen(3000);