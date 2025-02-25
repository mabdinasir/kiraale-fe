import { ApiResponse } from './../apiResponse'
import contactSchema from 'schemas/contact.schema'
import { z } from 'zod'

export type Contact = z.infer<typeof contactSchema>

export interface ContactResponse extends ApiResponse<Contact> {
    success: boolean
    message: string
    data: Contact
}
