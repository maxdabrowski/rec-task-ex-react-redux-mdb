//declaration action
export const SET_FIRST_NAME = "SET_FIRST_NAME";
export const SET_LAST_NAME = "SET_LAST_NAME";
export const SET_MAIL = "SET_MAIL";
export const SET_DATE = "SET_DATE";
export const SET_INITIAL_STATE ="SET_INITIAL_STATE";
export const SET_TRY_SEND = "SET_TRY_SEND";

//set initial state
const initialState = {
  firstName : '',
  lastName: '',
  mail: '',
  date: '',
  firstNameError: true,
  lastNameError: true,
  mailError:true,
  dateError:true,
  trySend: false,
};

export default (state = initialState, action) => {
  switch(action.type){

    //check validation and set firstName and firstNameError 
    case SET_FIRST_NAME: {
        const setFirstName = action.payload;
        const reg = new RegExp("^[a-zA-Ząćęłńóśżź]+$");
        const error = !reg.test(action.payload);
        return{
          ...state,
          firstName : setFirstName,
          firstNameError: error,
        };

    //check validation and set lastName and lastNameError 
    } case SET_LAST_NAME: {
        const setLastName = action.payload;
        const reg = new RegExp("^[a-zA-Ząćęłńóśżź-]+$");
        const error = !reg.test(action.payload);
        return{
          ...state,
          lastName: setLastName,
          lastNameError: error,
      };

    //check validation and set mail and mailError 
    } case SET_MAIL: {
        const setMail = action.payload;
        const reg = new RegExp("^[0-9a-z_.-]+@[0-9a-z.-]+[a-z]{2,3}$");
        const error = !reg.test(action.payload);
        return{
          ...state,
          mail: setMail,
          mailError: error
        };

    //check validation and set date and dateError 
    } case SET_DATE: {
        const setDate = action.payload;
        let error;
        if(setDate === null){
          error = true
        }else{
          error = false
        }
        return{
          ...state,
          date: setDate,
          dateError: error,
        };

    // set try send to check error on first time
    } case SET_TRY_SEND : {
        return {
          ...state,
          trySend: true
        }
    
    // set initial state after positive addition to DB 
    } case SET_INITIAL_STATE: {
        return{
          ...state,
          firstName : '',
          lastName: '',
          mail: '',
          date: '',
          firstNameError: true,
          lastNameError: true,
          mailError:true,
          dateError:true,
          trySend: false,
      }
    } default:{
      console.warn(`Unknow action ${action.type}`);
      return{...state};
    }
  }
};
    
    
    
    
    