# Use hook demo

The [`use` hook](https://react.dev/reference/react/use) is a new hook available in react 19.

It enables powerful patterns, when used with [React Context](https://react.dev/learn/passing-data-deeply-with-context), [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), and [Suspense](https://react.dev/reference/react/Suspense), to allow for components to wait for data, avoiding complex loading states and undefined data while waiting for API responses.

## Getting Started

First, run the development server:

```bash
pnpm i
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

Things to see in this repo:

### Loading user information

In [<cmd>src/app/\_components/user-context.tsx</cmd>](https://github.com/Zach-Jaensch/use-hook-demos/blob/main/src/app/_components/user-context.tsx) we initiate the API call to get user information, but don't await the promise. The promise it assigned the to the value of `UserContext`.

In [<cmd>src/app/\_components/user.tsx</cmd>](https://github.com/Zach-Jaensch/use-hook-demos/blob/main/src/app/_components/user.tsx) we use the `use` hook twice.

1. As a replacement of `useContext`. Although not shown here (but is later in the component) the `use` hook can be used in branching or looping logic. This makes it a special kind of hook as all other hooks must be at the top level.
1. After extracting the promise from `UserContext`, we use the `use` hook again to "suspend" the component to effectively `await` the promise (not quite though, [more on that later](#how-this-all-works)). Beyond this hook call, you can safely assume the promise is resolved.

### Loading team information

In [<cmd>src/app/app/page.tsx</cmd>](https://github.com/Zach-Jaensch/use-hook-demos/blob/main/src/app/app/page.tsx) we initiate the API call to get team information and pass the promise to the `Team` component.

Within the [`Team` component](https://github.com/Zach-Jaensch/use-hook-demos/blob/main/src/app/_components/team.tsx), similar to the User component, we use the `use` hook to suspend the component until the promise is resolved.

## How this all works

The `use` hook does three things. When used together, can enable powerful patterns.

1. Can be used in branching or looping logic
1. Can be used as a replacement for `useContext`
1. Can be used to suspend a component while resolving a promise

You may have noted the `User` and `Team` components are wrapped in `Suspense` and `ErrorBoundary`. This is because when the use hook encounters an unresolved promise, it will suspend the component. This means it will not continue processing the component code, but instead will throw a special error that the closest `Suspense` component will use to then render the fallback. When all the promises in the `Suspense` have resolved, it will re-render the components with the resolved promises. If the promise rejects, it will fallback to the closest error boundary.

> [!WARNING]
> 2 things to be careful of
>
> 1. Because `use` will throw a special error to suspend, you cannot use try/catch how you normally would. See [Dealing with rejected Promises ](https://react.dev/reference/react/use#dealing-with-rejected-promises).
> 1. Your promise <em>must</em> be stable. This means you cannot defined the promised directly in the component needing the result without making it stable (ie using useState, or useRef). Reacts recommendation is to used server components and stream the promise resolution in, however if you are careful, this is achievable on with a client only app.

If you would like to test the error boundary behaviour, uncomment the 404 return in [src/app/api/team/route.ts](https://github.com/Zach-Jaensch/use-hook-demos/blob/main/src/app/api/team/route.ts)
