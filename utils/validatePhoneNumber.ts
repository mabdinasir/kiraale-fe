export const validateSomaliNumber = (phone: string): boolean => {
    const somaliRegex = /^(?:\+?252|0)(61|62|63|65|66|67|68|69|90|91)\d{7}$/
    const sanitizedPhone = phone.replace(/\s+/g, '')
    return somaliRegex.test(sanitizedPhone)
}

export const validateKenyanNumber = (phone: string): boolean => {
    const kenyanRegex = /^(?:\+?254|0)(7[0-9])\d{7}$/
    const sanitizedPhone = phone.replace(/\s+/g, '')
    return kenyanRegex.test(sanitizedPhone)
}
