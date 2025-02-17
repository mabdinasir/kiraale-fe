type OptionType = { label: string; value: string }

export const proprtyTypes: OptionType[] = [
    { value: 'RESIDENTIAL', label: 'residential' },
    { value: 'COMMERCIAL', label: 'commercial' },
    { value: 'LAND', label: 'land' },
]

export const minPrice = [
    { value: '100', label: '$100' },
    { value: '200', label: '$200' },
    { value: '300', label: '$300' },
    { value: '500', label: '$500' },
    { value: '1000', label: '$1,000' },
    { value: '2000', label: '$2,000' },
    { value: '5000', label: '$5,000' },
    { value: '10000', label: '$10,000' },
    { value: '20000', label: '$20,000' },
    { value: '50000', label: '$50,000' },
    { value: '100000', label: '$100,000' },
    { value: '200000', label: '$200,000' },
    { value: '500000', label: '$500,000' },
    { value: '1000000', label: '$1,000,000' },
]

export const maxPrice = [...minPrice]
