import { createSlice } from '@reduxjs/toolkit';
import { FromData } from './types';

const initialState:FromData= { 
    first_name:"",
    last_name:"",
    email:"",
    phone:"",
    specialties:[] as string[],
    npiNumber:"",
    yearsExperience:"",
    credentials:[] as string[],
    insurance:[] as string[],
    canSeePatientsInde:"",
    malpractiveInsurance:"",
    payPerAppointmentModel:"",
    ehr_emr_system:"",
    practiceState:[] as string[],
};

const formSlice = createSlice({
    name: 'fromData',
    initialState,
    reducers: {
    updateCanSeePatient:(state , action)=>{
        state.canSeePatientsInde = action.payload
    },
    updateMalPracticeIns:(state , action)=>{
        state.malpractiveInsurance = action.payload
    },
    updatePayPerAppointmentModel:(state , action)=>{
        state.payPerAppointmentModel = action.payload
    },
    updateEhrEmrSystem:(state ,action)=>{
        state.ehr_emr_system = action.payload
    },
    updatePracticeState:(state ,action)=>{
        state.practiceState = action.payload
    },
    addStage1: (state , action) => {
        // console.log(action.payload);
        Object.assign(state, action.payload)
    },
    addStage2:  (state , action) => {
        state.specialties = action.payload
    },
    updateNpiNumber: (state , action)=>{
        state.npiNumber = action.payload
    },
    updateYearsExp:(state , action)=>{
        state.yearsExperience = action.payload
    },
    updateCreds:(state, action)=>{
        state.credentials = action.payload
    },
    addStage6: (state , action)=>{
        state.npiNumber = action.payload.npiNumber
        state.yearsExperience = action.payload.yearsExperience
        state.credentials = action.payload.credentials
    },
    addInsurance: (state ,action)=>{
        state.insurance = action.payload
    },
    },
});

export const { addStage1, addStage2 ,addStage6,addInsurance , updateCreds , updateNpiNumber , updateYearsExp , updateCanSeePatient , updateMalPracticeIns , updatePayPerAppointmentModel , updateEhrEmrSystem , updatePracticeState} = formSlice.actions;
export default formSlice.reducer;