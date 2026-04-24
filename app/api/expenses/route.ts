
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// POST /api/expenses
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { amount, category, description, date } = body;

        if (!amount || !category || !date) {
            return NextResponse.json(
                { error: "amount, category and date are required" },
                { status: 400 }
            );
        }

        const expense = await prisma.expense.create({
            data: {
                amount: Number(amount),
                category,
                description,
                date: new Date(date),
            },
        });

        return NextResponse.json(expense);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to create expense" },
            { status: 500 }
        );
    }
}

// GET /api/expenses
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const sort = searchParams.get("sort");

    const expenses = await prisma.expense.findMany({
        where: category ? { category } : {},
        orderBy:
            sort === "date_desc"
                ? { date: "desc" }
                : { created_at: "desc" },
    });

    return NextResponse.json(expenses);
}