import { NextRequest, NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongo'
import Budget from '@/lib/models/Budget'

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase() 
    const data = await req.json()

    const res = await Budget.create({
        category: data.category,
        amount: data.amount,
        month: data.month,
        description: data.description || '',
    })

    return NextResponse.json({ success: true, data: {id: res._id} }, { status: 201 })
  } catch (error) {
    console.error('Error creating transaction:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const budgets = await Budget.find({}).sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: budgets }, { status: 200 })
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connectToDatabase()
    const { id } = await req.json()

    const res = await Budget.findByIdAndDelete(id)

    if (!res) {
      return NextResponse.json({ success: false, message: 'Budget not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error deleting transaction:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase()
    const data = await req.json()

    const res = await Budget.findByIdAndUpdate(data.id, {
      category: data.category,
      amount: data.amount,
      month: data.month,
      description: data.description || '',
    }, { new: true })   
    if (!res) {
      return NextResponse.json({ success: false, message: 'Budget not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, data: res }, { status: 200 })
  } catch (error) {
    console.error('Error updating transaction:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}