import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StepData {
    isValid: boolean
    propertyId?: string
    imageUrls?: string[]
    isPaymentSuccess?: boolean
}

interface StepValidationState {
    currentStep: number
    steps: Record<number, StepData> & {
        1: { isValid: boolean; propertyId: string }
        2: { isValid: boolean; imageUrls: string[] }
        3: { isValid: boolean; isPaymentSuccess?: boolean }
        4: { isValid: boolean }
    }
}

const initialState: StepValidationState = {
    currentStep: 1,
    steps: {
        1: { isValid: false, propertyId: '' },
        2: { isValid: false, imageUrls: [] },
        3: { isValid: false },
        4: { isValid: false },
    },
}

const stepValidationSlice = createSlice({
    name: 'stepValidation',
    initialState,
    reducers: {
        goToNextStep(state) {
            if (state.currentStep < 4 && state.steps[state.currentStep].isValid) {
                state.currentStep += 1
            }
        },
        goToPrevStep(state) {
            if (state.currentStep > 1) {
                state.currentStep -= 1
            }
        },
        updateStep<K extends keyof StepValidationState['steps']>(
            state: { steps: StepValidationState['steps'] },
            action: PayloadAction<{ step: K; isValid: boolean; data?: Partial<StepValidationState['steps'][K]> }>,
        ) {
            const { step, isValid, data } = action.payload
            if (state.steps[step]) {
                state.steps[step] = { ...state.steps[step], isValid, ...data }
            }
        },
        resetSteps(state) {
            state.currentStep = 1
            state.steps = initialState.steps
        },
    },
})

export const { goToNextStep, goToPrevStep, updateStep, resetSteps } = stepValidationSlice.actions
export default stepValidationSlice.reducer
