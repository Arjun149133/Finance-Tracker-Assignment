import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongo'
import Transaction from '@/lib/models/Transaction'

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase() // 💡 Connect before doing anything
    const data = await req.json()

    const res = await Transaction.create({
      title: data.title,
      amount: data.amount,
      month: data.month,
      description: data.description || '',
      type: data.type,
      category: data.category,
    })

    return NextResponse.json({ success: true, data: res }, { status: 201 })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
