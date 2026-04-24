
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

        const normalizedDate = new Date(date);

        // 🔥 CHECK DUPLICATE BEFORE INSERT
        const existingExpense = await prisma.expense.findFirst({
            where: {
                amount: Number(amount),
                category,
                description: description || null,
                date: normalizedDate,
            },
        });

        if (existingExpense) {
            return NextResponse.json(
                {
                    message: "Duplicate expense ignored",
                    expense: existingExpense,
                },
                { status: 200 }
            );
        }

        // CREATE NEW
        const expense = await prisma.expense.create({
            data: {
                amount: Number(amount),
                category,
                description,
                date: normalizedDate,
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

    const { searchParams } = new URL(req.url)

    const category = searchParams.get("category")
    const sort = searchParams.get("sort")

    const expenses = await prisma.expense.findMany({
        where: category ? { category } : {},
        orderBy: sort === "date_desc" ? { date: "desc" } : undefined
    })

    return NextResponse.json(expenses)
}