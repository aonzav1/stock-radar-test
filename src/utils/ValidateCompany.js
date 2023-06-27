const validateCompanyData = (data) => {
    const requiredFields = ["N_name", 'N_COMPANY_T', 'N_COMPANY_E', 'N_fullname'];
  
    for (const field of requiredFields) {
      if (!(field in data) || !data[field]) {
        throw new Error(`Invalid company data. Missing required field: ${field}`);
      }
    }
};
  
export default validateCompanyData;