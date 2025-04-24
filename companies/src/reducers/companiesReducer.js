export const initialState = {
    companies: [],
    filteredCompaniesStart: [],
    filteredCompaniesEnd: [],
    companyNames: [],
    loading: true,
    error: null,
    showModal: false,
    deleteId: null,
    editCompany: null,
    showForm: false,
    newCompany: {
        name: '',
        category: '',
        start: '',
        end: ''
    },
    activeTab: 'all'
};

export function companiesReducer(state, action) {
    switch (action.type) {
        case 'SET_COMPANIES':
            return { ...state, companies: action.payload, loading: false };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'CLEAR_ERROR':
            return { ...state, error: null };
        case 'SET_FORM_VISIBLE':
            return { ...state, showForm: action.payload };
        case 'SET_EDIT_COMPANY':
            return { ...state, editCompany: action.payload };
        case 'UPDATE_NEW_COMPANY':
            return { ...state, newCompany: { ...state.newCompany, ...action.payload } };
        case 'RESET_NEW_COMPANY':
            return { ...state, newCompany: initialState.newCompany };
        case 'SET_TAB':
            return { ...state, activeTab: action.payload };
        case 'SET_START_FILTERED':
            return { ...state, filteredCompaniesStart: action.payload };
        case 'SET_END_FILTERED':
            return { ...state, filteredCompaniesEnd: action.payload }
        case 'SET_NAMES':
            return { ...state, companyNames: action.payload };
        case 'SHOW_DELETE_MODAL':
            return { ...state, showModal: true, deleteId: action.payload };
        case 'HIDE_DELETE_MODAL':
            return { ...state, showModal: false, deleteId: null };
        default:
            return state;
    }
}