import { Tabs, Tab} from 'react-bootstrap';
import CompanyTable from './CompanyTable';
import { useEffect } from 'react';

const CompanyTabs = ({ state, dispatch }) => {
    const { companies, filteredCompaniesStart, filteredCompaniesEnd, companyNames, activeTab } = state;
  
    useEffect(() => {
      if (activeTab === 'filteredStart') {
        const startfiltered = companies.filter(company => company.start > 1988);
        dispatch({ type: 'SET_START_FILTERED', payload: startfiltered });
      }
  
      if (activeTab === 'filteredEnd') {
        const endfiltered = companies.filter(company => company.end > 2005);
        dispatch({ type: 'SET_END_FILTERED', payload: endfiltered });
      }
  
      if (activeTab === 'names') {
        const names = companies.map(company => `Company name: ${company.name}`);
        dispatch({ type: 'SET_NAMES', payload: names });
      }
    }, [activeTab, companies, dispatch]);
  
    const handleTabSelect = (key) => {
      dispatch({ type: 'SET_TAB', payload: key });
    };
  
    return (
      <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
        <Tab eventKey="all" title="All Companies">
          <h3 className="mb-3">All Companies</h3>
          <CompanyTable companies={companies} dispatch={dispatch} />
        </Tab>
  
        <Tab eventKey="filteredStart" title="Filtered Companies (Start > 1988)">
          {filteredCompaniesStart.length > 0 ? (
            <>
              <h3 className="mb-3">Filtered Companies</h3>
              <CompanyTable companies={filteredCompaniesStart} />
            </>
          ) : (
            <p>No companies with start year greater than 1988.</p>
          )}
        </Tab>
  
        <Tab eventKey="filteredEnd" title="Filtered Companies (End > 2005)">
          {filteredCompaniesEnd.length > 0 ? (
            <>
              <h3 className="mb-3">Filtered Companies</h3>
              <CompanyTable companies={filteredCompaniesEnd} />
            </>
          ) : (
            <p>No companies with end year greater than 2005.</p>
          )}
        </Tab>
  
        <Tab eventKey="names" title="Company Names">
          {companyNames.length > 0 ? (
            <>
              <h3 className="mb-3">Company Names</h3>
              <ol className="list-group list-group-numbered">
                {companyNames.map((name, index) => (
                  <li key={index} className="list-group-item">
                    {name}
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p>No company names to display. Click "Company Names" tab to load.</p>
          )}
        </Tab>
      </Tabs>
    );
  };

export default CompanyTabs;