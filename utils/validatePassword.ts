import validator from 'validator'

const validatePassword = (password: string): Promise<boolean> =>
    new Promise((resolve, reject) => {
        if (!password) {
            reject(new Error('Password is required.'))
        } else if (!validator.isStrongPassword(password)) {
            reject(
                new Error(
                    'Password must be at least 8 characters long, include at least one lowercase letter, one uppercase letter, one number, and one special character.',
                ),
            )
        } else {
            resolve(true)
        }
    })

export default validatePassword
