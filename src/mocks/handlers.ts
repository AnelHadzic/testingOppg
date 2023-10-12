import { rest } from "msw";

export const handlers = [
  rest.post("http://localhost:3000/api/createUser", (req, res, ctx) => {
    console.log("Kjører createUser mock");
    return res(ctx.json({ data: "user created" }));
  }),
];
