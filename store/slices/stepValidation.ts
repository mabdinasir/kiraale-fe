import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StepValidationState {
    currentStep: number
    isValidStep: { [key: number]: boolean }
    propertyId: string
    imageUrls: string[]
}

const initialState: StepValidationState = {
    currentStep: 1,
    isValidStep: {
        1: false,
        2: false,
        3: false,
        4: false,
    },
    propertyId: '',
    imageUrls: [],
}

const stepValidationSlice = createSlice({
    name: 'stepValidation',
    initialState,
    reducers: {
        goToNextStep(state) {
            if (state.currentStep < 4 && state.isValidStep[state.currentStep]) {
                state.currentStep += 1
            }
        },
        goToPrevStep(state) {
            if (state.currentStep > 1) {
                state.currentStep -= 1
            }
        },
        setStepValidity(state, action: PayloadAction<{ step: number; isValid: boolean }>) {
            const { step, isValid } = action.payload
            if (step >= 1 && step <= 4) {
                state.isValidStep[step] = isValid
            }
        },
        setPropertyId(state, action: PayloadAction<string>) {
            state.propertyId = action.payload
        },
        setImageUrls(state, action: PayloadAction<string[]>) {
            state.imageUrls = action.payload
        },
        resetSteps(state) {
            state.currentStep = 1
            state.isValidStep = initialState.isValidStep
            state.propertyId = ''
            state.imageUrls = []
        },
    },
})

export const { goToNextStep, goToPrevStep, setStepValidity, setPropertyId, setImageUrls, resetSteps } =
    stepValidationSlice.actions
export default stepValidationSlice.reducer
