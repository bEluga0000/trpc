import { publicProcedure, router } from './trpc';

const appRouter = router({
    // createTodo:publicProcedure
    // .input()
});

export type AppRouter = typeof appRouter;