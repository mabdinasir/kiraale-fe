import validator from 'validator'

const validateEmail = (email: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
        if (!email) {
            reject(new Error('Email is required.'))
        } else if (!validator.isEmail(email)) {
            reject(new Error('Invalid email format. Please enter a valid email address.'))
        } else {
            resolve(true)
        }
    })

export default validateEmail
