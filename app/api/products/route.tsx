import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(request: NextRequest) {
  return NextResponse.json([
    {
      id: 1,
      name: "product1",
      price: 2341,
    },
    {
      id: 2,
      name: "product2",
      price: 341,
    },
  ]);
}

export async function POST(request: NextRequest) {
  const product = await request.json();
  const validation = schema.safeParse(product);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  return NextResponse.json(
    {
      id: Math.ceil(Math.random() * 100),
      name: product.name,
      price: product.price,
    },
    { status: 201 }
  );
}
