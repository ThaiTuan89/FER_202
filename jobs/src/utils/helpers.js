export const checkDeadlineStatus = (deadline) => {
    const today = new Date('2025-04-20'); // Giả định ngày hiện tại
    const deadlineDate = new Date(deadline);
    return deadlineDate >= today ? 'Active' : 'Expired';
  };  
  