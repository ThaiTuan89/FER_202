const API_URL = 'http://localhost:3001/companies';

export const getCompanies = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to fetch companies');
  return await response.json();
};

export const addCompany = async (company) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(company),
  });
  if (!response.ok) throw new Error('Failed to add company');
};

export const updateCompany = async (company) => {
  const response = await fetch(`${API_URL}/${company.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(company),
  });
  if (!response.ok) throw new Error('Failed to update company');
};

export const deleteCompanyById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete company');
};
