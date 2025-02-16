export function GET() {
  return new Response(
    JSON.stringify({
      id: 1,
      name: "Jack O'Neill",
      phrase: "two L's",
    })
  );
}
