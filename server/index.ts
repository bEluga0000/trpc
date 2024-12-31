import { publicProcedure, router } from './trpc';
import {z} from "zod";
import { createHTTPServer } from '@trpc/server/adapters/standalone';
const createTodoInputSchema = z.object({
    title : z.string(),
    description : z.string()
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
        return {id:"1",title:"good",description:"Nicely done"}
    }),
    // signUp:publicProcedure
    // .input()
});

export type AppRouter = typeof appRouter;
const server = createHTTPServer({
    router: appRouter,
});

server.listen(3000);