import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '../server';

const trpc = createTRPCClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
        }),
    ],
});

const main =async ()=>{
    const todo =await  trpc.createTodo.mutate({ title: "Great todo", description: "Great do to do as it is" })
    const todo1 =await trpc.getTodo.query({ id: "2" })
    console.log(todo,todo1)
}
main()