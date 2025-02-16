export function GET() {
  return new Response(null, { status: 404 });
  return new Response(
    JSON.stringify({
      id: 1,
      name: "SG1",
    })
  );
}
