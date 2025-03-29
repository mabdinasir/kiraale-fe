import React from 'react'
import { FaPrint, FaDownload, FaQrcode } from 'react-icons/fa'
import { format } from 'date-fns'

const PaymentReceipt = () => {
    const receiptData = {
        company: {
            name: 'Kiraale',
            address: '10th Street, Eastleigh, Nairobi',
            city: 'Nairobi',
            zip: '12345',
            phone: '+1 (555) 123-4567',
            email: 'contact@eastleighrealestate.com',
        },
        receipt: {
            number: 'INV-2024-001',
            date: new Date(),
            paymentMethod: 'Mpesa',
            phoneNumber: '+254711234567',
            transactionId: 'TXN789012345',
        },
        customer: {
            name: 'Mohamed Abdinasir',
            address: 'BBS Mall, 2nd Floor, Shop 12',
            city: 'Eastleigh, Nairobi',
            zip: '67890',
            email: 'mabdinasira@gmail.com',
        },
        items: [
            {
                id: 1,
                title: 'Spacious 3-Bedroom Residential Apartment for Rent in Eastleigh, Nairobi',
                quantity: 1,
                price: 2000,
            },
        ],
        discount: 0.5,
        subTotal: 2000,
    }

    const handlePrint = () => {
        window.print()
    }

    const handleDownload = () => {
        // console.log('Downloading PDF...')
    }

    return (
        <div className={'min-h-screen '}>
            <h1 className="text-3xl font-semibold text-center text-green-500">Payment Received!</h1>
            <p className="text-center text-green-600 mb-8">
                Thank you for your payment! Please download your receipt below.
            </p>
            <div>
                <div className={'shadow-lg shadow-green-600/10 rounded-lg p-8'}>
                    <div className="flex justify-between items-center border-b pb-6">
                        <div className="flex items-center space-x-4">
                            <div>
                                <h1 className="text-2xl font-bold">{receiptData.company.name}</h1>
                                <p className="text-sm">{receiptData.company.email}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-bold">Receipt #{receiptData.receipt.number}</p>
                            <p>{format(receiptData.receipt.date, 'PPP')}</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mt-6">
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Billed To:</h2>
                            <div className={'p-4 rounded'}>
                                <p className="font-medium">{receiptData.customer.name}</p>
                                <p>{receiptData.customer.address}</p>
                                <p>
                                    {receiptData.customer.city}, {receiptData.customer.zip}
                                </p>
                                <p>{receiptData.customer.email}</p>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-2">Payment Details:</h2>
                            <div className={'p-4 rounded'}>
                                <p>
                                    Method: <span className="font-bold">{receiptData.receipt.paymentMethod}</span>
                                </p>
                                <p>
                                    Phone Number: <span className="font-bold">{receiptData.receipt.phoneNumber}</span>
                                </p>
                                <p>
                                    Transaction ID:{' '}
                                    <span className="font-bold">{receiptData.receipt.transactionId}</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 overflow-x-auto">
                        <table className="w-full min-w-[600px]">
                            <thead>
                                <tr className={'bg-gray-100'}>
                                    <th className="text-left py-2 px-2 md:p-4">Description</th>
                                    <th className="text-center py-2 px-2 md:p-4">Quantity</th>
                                    <th className="text-right py-2 px-2 md:p-4">Price</th>
                                    <th className="text-right py-2 px-2 md:p-4">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {receiptData.items.map((item) => (
                                    <tr key={item.id} className="border-b">
                                        <td className="py-2 px-2 md:p-4 break-words max-w-[200px]">{item.title}</td>
                                        <td className="text-center py-2 px-2 md:p-4">{item.quantity}</td>
                                        <td className="text-right py-2 px-2 md:p-4">KSH {item.price}</td>
                                        <td className="text-right py-2 px-2 md:p-4">
                                            KSH {item.quantity * item.price}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <div className="w-64">
                            <div className="flex justify-between py-2">
                                <span>Subtotal:</span>
                                <span>KSH {receiptData.subTotal}</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span>Discount:</span>
                                <span>{receiptData.discount * 100}%</span>
                            </div>
                            <div className="flex justify-between py-2 font-bold border-t">
                                <span>Total:</span>
                                <span>KSH {receiptData.subTotal - receiptData.discount * receiptData.subTotal}</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex">
                        <div className="w-full flex space-x-4 justify-evenly items-center">
                            <button
                                onClick={handlePrint}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                            >
                                <FaPrint />
                                <span>Print</span>
                            </button>
                            <button
                                onClick={handleDownload}
                                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-colors"
                            >
                                <FaDownload />
                                <span>Download PDF</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-center">
                        <div className="text-center">
                            <FaQrcode className="w-24 h-24 mx-auto text-green-600" />
                            <p className="mt-2 text-sm">Scan to verify transaction</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentReceipt
