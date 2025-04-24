export const getNextId = (companies) => {
    const numericIds = companies
      .map(c => parseInt(c.id))
      .filter(id => !isNaN(id));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    return (maxId + 1).toString();
  };